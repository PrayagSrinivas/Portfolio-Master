import { kv } from "@vercel/kv";

const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Cast kv to any to bypass compilation type resolution issues of its parent class in Vercel's typescript environment
const client: any = kv;

// Memory fallback store for local development when Vercel KV environment variables are not set
const memoryStore = {
  views: {} as Record<string, number>, // slug -> count
  viewedDevices: {} as Record<string, Set<string>>, // slug -> Set of deviceId
  clapsByDevice: {} as Record<string, Record<string, number>>, // slug -> { deviceId -> count }
  globalViews: 0,
  devices: {} as Record<string, number>,
  os: {} as Record<string, number>,
  slugs: new Set<string>(),
  globalClaps: {} as Record<string, number>, // slug -> count
};

export const analytics = {
  async trackView(slug: string, deviceType: string, os: string, deviceId: string) {
    if (isKvConfigured) {
      try {
        // 1. Raw views
        await client.incr(`article:${slug}:views`);
        await client.incr("analytics:total_views");
        
        // 2. Unique views (add to set of viewed devices)
        if (deviceId) {
          await client.sadd(`article:${slug}:viewed_devices`, deviceId);
        }
        
        // 3. Metadata for aggregates
        await client.sadd("article:slugs", slug);
        await client.hincrby("analytics:devices", deviceType, 1);
        await client.hincrby("analytics:os", os, 1);
      } catch (err) {
        console.error("Vercel KV Error tracking view:", err);
      }
    } else {
      memoryStore.views[slug] = (memoryStore.views[slug] || 0) + 1;
      memoryStore.globalViews++;
      memoryStore.slugs.add(slug);
      memoryStore.devices[deviceType] = (memoryStore.devices[deviceType] || 0) + 1;
      memoryStore.os[os] = (memoryStore.os[os] || 0) + 1;
      if (deviceId) {
        if (!memoryStore.viewedDevices[slug]) {
          memoryStore.viewedDevices[slug] = new Set();
        }
        memoryStore.viewedDevices[slug].add(deviceId);
      }
    }
  },

  async getViewCount(slug: string): Promise<number> {
    if (isKvConfigured) {
      try {
        return (await client.get(`article:${slug}:views`)) || 0;
      } catch (err) {
        console.error("Vercel KV Error fetching views:", err);
        return 0;
      }
    } else {
      return memoryStore.views[slug] || 0;
    }
  },

  async trackClap(slug: string, deviceId: string, incrementAmount: number): Promise<{ userClaps: number; totalClaps: number }> {
    if (isKvConfigured) {
      try {
        const currentClaps = Number(await client.hget(`article:${slug}:claps_by_device`, deviceId) || 0);
        const clapsToAdd = Math.min(incrementAmount, 50 - currentClaps);
        
        if (clapsToAdd > 0) {
          await client.hincrby(`article:${slug}:claps_by_device`, deviceId, clapsToAdd);
          await client.hincrby("article:claps", slug, clapsToAdd);
        }
        
        const newUserClaps = currentClaps + clapsToAdd;
        const totalClaps = Number(await client.hget("article:claps", slug) || 0);
        
        return { userClaps: newUserClaps, totalClaps };
      } catch (err) {
        console.error("Vercel KV Error tracking clap:", err);
        return { userClaps: 0, totalClaps: 0 };
      }
    } else {
      if (!memoryStore.clapsByDevice[slug]) {
        memoryStore.clapsByDevice[slug] = {};
      }
      const currentClaps = memoryStore.clapsByDevice[slug][deviceId] || 0;
      const clapsToAdd = Math.min(incrementAmount, 50 - currentClaps);
      
      memoryStore.clapsByDevice[slug][deviceId] = currentClaps + clapsToAdd;
      memoryStore.globalClaps[slug] = (memoryStore.globalClaps[slug] || 0) + clapsToAdd;
      
      return {
        userClaps: memoryStore.clapsByDevice[slug][deviceId],
        totalClaps: memoryStore.globalClaps[slug],
      };
    }
  },

  async getClapCounts(slug: string, deviceId?: string): Promise<{ userClaps: number; totalClaps: number }> {
    if (isKvConfigured) {
      try {
        const totalClaps = Number(await client.hget("article:claps", slug) || 0);
        let userClaps = 0;
        if (deviceId) {
          userClaps = Number(await client.hget(`article:${slug}:claps_by_device`, deviceId) || 0);
        }
        return { userClaps, totalClaps };
      } catch (err) {
        console.error("Vercel KV Error fetching claps:", err);
        return { userClaps: 0, totalClaps: 0 };
      }
    } else {
      const totalClaps = memoryStore.globalClaps[slug] || 0;
      const userClaps = deviceId && memoryStore.clapsByDevice[slug] ? (memoryStore.clapsByDevice[slug][deviceId] || 0) : 0;
      return { userClaps, totalClaps };
    }
  },

  async getStats(): Promise<{
    totalViews: number;
    articles: Array<{ slug: string; views: number; claps: number }>;
    devices: Array<{ deviceType: string; count: number }>;
    os: Array<{ os: string; count: number }>;
  }> {
    if (isKvConfigured) {
      try {
        const totalViews = Number(await client.get("analytics:total_views") || 0);
        const slugs = (await client.smembers("article:slugs") as string[]) || [];
        
        const articles = await Promise.all(
          slugs.map(async (slug) => {
            const views = Number(await client.get(`article:${slug}:views`) || 0);
            const claps = Number(await client.hget("article:claps", slug) || 0);
            return { slug, views, claps };
          })
        );
        
        const devicesObj = (await client.hgetall("analytics:devices")) || {};
        const osObj = (await client.hgetall("analytics:os")) || {};
        
        const devices = Object.entries(devicesObj).map(([deviceType, count]) => ({
          deviceType,
          count: Number(count),
        }));
        
        const os = Object.entries(osObj).map(([os, count]) => ({
          os,
          count: Number(count),
        }));
        
        return { totalViews, articles, devices, os };
      } catch (err) {
        console.error("Vercel KV Error fetching stats:", err);
        return { totalViews: 0, articles: [], devices: [], os: [] };
      }
    } else {
      const articles = Array.from(memoryStore.slugs).map((slug) => ({
        slug,
        views: memoryStore.views[slug] || 0,
        claps: memoryStore.globalClaps[slug] || 0,
      }));
      
      const devices = Object.entries(memoryStore.devices).map(([deviceType, count]) => ({
        deviceType,
        count,
      }));
      
      const os = Object.entries(memoryStore.os).map(([os, count]) => ({
        os,
        count,
      }));
      
      return {
        totalViews: memoryStore.globalViews,
        articles,
        devices,
        os,
      };
    }
  }
};
