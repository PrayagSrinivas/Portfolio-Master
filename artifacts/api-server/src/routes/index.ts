import { Router } from "express";
import healthRouter from "./health.js";
import analyticsRouter from "./analytics.js";

const router = Router();

router.use(healthRouter);
router.use(analyticsRouter);

export default router;
