import { Router } from "express";
import DatasetController from "../controllers/dataset/dataset.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// Protect all dataset routes
router.use(authMiddleware);

// Upload
router.post(
  "/upload",
  upload.single("file"),
  DatasetController.upload
);

// CRUD
router.post("/", DatasetController.create);

router.get("/", DatasetController.getAll);

// Report (must come before /:id)
router.get("/:id/report", DatasetController.getReport);

// Dataset by ID
router.get("/:id", DatasetController.getById);

router.delete("/:id", DatasetController.delete);

export default router;