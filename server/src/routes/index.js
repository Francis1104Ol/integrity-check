import { Router } from "express";

import authRoutes from "./auth.routes.js";
import datasetRoutes from "./dataset.routes.js";
import dashboardRoutes from "./dashboard.routes.js";

const router = Router();

/**
 * API Routes
 */
router.use("/auth", authRoutes);

router.use("/datasets", datasetRoutes);

router.use("/dashboard", dashboardRoutes);

export default router;