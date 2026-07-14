import { Router } from "express";
import { db, articleViewsTable, articleClapsTable } from "@workspace/db";
import { desc, sql, eq } from "drizzle-orm";

const router = Router();

// Track a new article view
router.post("/articles/:slug/view", async (req: any, res: any) => {
  try {
    const { slug } = req.params;
    const { deviceType, os, userAgent } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    await db.insert(articleViewsTable).values({
      slug,
      deviceType: deviceType || "desktop",
      os: os || "Unknown",
      userAgent: userAgent || null,
    });

    return res.status(201).json({ success: true });
  } catch (err: any) {
    console.error("Error logging article view:", err);
    return res.status(500).json({ error: err.message || "Failed to log view" });
  }
});

// Get views count for a specific article
router.get("/articles/:slug/views", async (req: any, res: any) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(articleViewsTable)
      .where(eq(articleViewsTable.slug, slug));

    const count = Number(result[0]?.count || 0);
    return res.json({ count });
  } catch (err: any) {
    console.error("Error fetching article views:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch views" });
  }
});

// Increment claps count for a specific article
router.post("/articles/:slug/clap", async (req: any, res: any) => {
  try {
    const { slug } = req.params;
    const { count } = req.body;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const incrementAmount = Number(count || 1);

    // Upsert clap count into database
    await db
      .insert(articleClapsTable)
      .values({
        slug,
        count: incrementAmount,
      })
      .onConflictDoUpdate({
        target: articleClapsTable.slug,
        set: {
          count: sql`${articleClapsTable.count} + ${incrementAmount}`,
          updatedAt: sql`now()`,
        },
      });

    // Fetch new total claps
    const result = await db
      .select({ count: articleClapsTable.count })
      .from(articleClapsTable)
      .where(eq(articleClapsTable.slug, slug));

    const totalClaps = result[0]?.count || 0;
    return res.json({ success: true, totalClaps });
  } catch (err: any) {
    console.error("Error incrementing article claps:", err);
    return res.status(500).json({ error: err.message || "Failed to increment claps" });
  }
});

// Get total claps for a specific article
router.get("/articles/:slug/claps", async (req: any, res: any) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const result = await db
      .select({ count: articleClapsTable.count })
      .from(articleClapsTable)
      .where(eq(articleClapsTable.slug, slug));

    const count = result[0]?.count || 0;
    return res.json({ count });
  } catch (err: any) {
    console.error("Error fetching article claps:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch claps" });
  }
});

// Get aggregated stats for the dashboard
router.get("/analytics/stats", async (req: any, res: any) => {
  try {
    // 1. Total views
    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(articleViewsTable);
    const totalViews = Number(totalResult[0]?.count || 0);

    // 2. Views per article slug
    const articleViewsStats = await db
      .select({
        slug: articleViewsTable.slug,
        views: sql<number>`count(*)`
      })
      .from(articleViewsTable)
      .groupBy(articleViewsTable.slug)
      .orderBy(desc(sql`count(*)`));

    // 3. Claps per article slug
    const articleClapsStats = await db
      .select({
        slug: articleClapsTable.slug,
        claps: articleClapsTable.count
      })
      .from(articleClapsTable);

    // Map claps map
    const clapsMap = new Map<string, number>();
    articleClapsStats.forEach((c) => {
      clapsMap.set(c.slug, c.claps);
    });

    // Combine views and claps stats
    const combinedArticles = articleViewsStats.map((item) => ({
      slug: item.slug,
      views: Number(item.views),
      claps: clapsMap.get(item.slug) || 0,
    }));

    // Add any clapped articles that might not have views tracked yet
    articleClapsStats.forEach((c) => {
      const exists = combinedArticles.some((a) => a.slug === c.slug);
      if (!exists) {
        combinedArticles.push({
          slug: c.slug,
          views: 0,
          claps: c.claps,
        });
      }
    });

    // Sort by views desc
    combinedArticles.sort((a, b) => b.views - a.views);

    // 4. Device breakdown
    const deviceStats = await db
      .select({
        deviceType: articleViewsTable.deviceType,
        count: sql<number>`count(*)`
      })
      .from(articleViewsTable)
      .groupBy(articleViewsTable.deviceType);

    // 5. OS breakdown
    const osStats = await db
      .select({
        os: articleViewsTable.os,
        count: sql<number>`count(*)`
      })
      .from(articleViewsTable)
      .groupBy(articleViewsTable.os);

    return res.json({
      totalViews,
      articles: combinedArticles,
      devices: deviceStats.map(d => ({ deviceType: d.deviceType, count: Number(d.count) })),
      os: osStats.map(o => ({ os: o.os, count: Number(o.count) })),
    });
  } catch (err: any) {
    console.error("Error fetching analytics stats:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch stats" });
  }
});

export default router;
