import { Router } from "express";
import { analytics } from "@workspace/db";

const router = Router();

// Helper to get device ID from request headers or fallbacks
function getDeviceId(req: any): string {
  const headerId = req.headers["x-device-id"] || req.header("x-device-id");
  if (headerId) return headerId.toString();
  
  const queryId = req.query.deviceId;
  if (queryId) return queryId.toString();
  
  const bodyId = req.body.deviceId;
  if (bodyId) return bodyId.toString();
  
  return "anonymous";
}

// Track a new article view
router.post("/articles/:slug/view", async (req: any, res: any) => {
  try {
    const { slug } = req.params;
    const { deviceType, os } = req.body;
    const deviceId = getDeviceId(req);

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    await analytics.trackView(
      slug,
      deviceType || "desktop",
      os || "Unknown",
      deviceId
    );

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

    const count = await analytics.getViewCount(slug);
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
    const deviceId = getDeviceId(req);

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const incrementAmount = Number(count || 1);
    const result = await analytics.trackClap(slug, deviceId, incrementAmount);

    return res.json({
      success: true,
      totalClaps: result.totalClaps,
      userClaps: result.userClaps
    });
  } catch (err: any) {
    console.error("Error incrementing article claps:", err);
    return res.status(500).json({ error: err.message || "Failed to increment claps" });
  }
});

// Get total claps for a specific article
router.get("/articles/:slug/claps", async (req: any, res: any) => {
  try {
    const { slug } = req.params;
    const deviceId = getDeviceId(req);

    if (!slug) {
      return res.status(400).json({ error: "Slug is required" });
    }

    const result = await analytics.getClapCounts(slug, deviceId);
    return res.json({
      count: result.totalClaps,
      userClaps: result.userClaps
    });
  } catch (err: any) {
    console.error("Error fetching article claps:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch claps" });
  }
});

// Get aggregated stats for the dashboard
router.get("/analytics/stats", async (req: any, res: any) => {
  try {
    const stats = await analytics.getStats();
    return res.json(stats);
  } catch (err: any) {
    console.error("Error fetching analytics stats:", err);
    return res.status(500).json({ error: err.message || "Failed to fetch stats" });
  }
});

export default router;
