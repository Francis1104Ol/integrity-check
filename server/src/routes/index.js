import { Router } from "express";
import authRoutes from "./auth.routes.js";
import datasetRoutes from "./dataset.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/datasets", datasetRoutes);

export default router;