import { Router } from "express";
import DatasetController from "../controllers/dataset/dataset.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
const router = Router();

// Protect all dataset routes
router.use(authMiddleware);

router.post("/", DatasetController.create);

router.get("/", DatasetController.getAll);

router.get("/:id", DatasetController.getById);

router.delete("/:id", DatasetController.delete);
router.post(
  "/upload",
  upload.single("file"),
  DatasetController.upload
);
export default router;