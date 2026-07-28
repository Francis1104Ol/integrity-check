import { Router } from "express";
import DatasetController from "../controllers/dataset/dataset.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Datasets
 *   description: Dataset upload, validation and management
 */

/**
 * @swagger
 * /datasets/upload:
 *   post:
 *     summary: Upload and validate a dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 example: July Farmers Dataset
 *               description:
 *                 type: string
 *                 example: NIN validation dataset for July
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Dataset uploaded successfully
 *       400:
 *         description: Invalid file
 */
router.post(
  "/upload",
  upload.single("file"),
  DatasetController.upload
);

/**
 * @swagger
 * /datasets:
 *   post:
 *     summary: Create dataset metadata
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Dataset created successfully
 */
router.post("/", DatasetController.create);

/**
 * @swagger
 * /datasets:
 *   get:
 *     summary: Get all datasets
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: July
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: UPLOADED
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: createdAt
 *     responses:
 *       200:
 *         description: List of datasets
 */
router.get("/", DatasetController.getAll);

/**
 * @swagger
 * /datasets/{id}/report:
 *   get:
 *     summary: Get validation report
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Validation report retrieved successfully
 *       404:
 *         description: Dataset not found
 */
router.get("/:id/report", DatasetController.getReport);

/**
 * @swagger
 * /datasets/{id}:
 *   get:
 *     summary: Get dataset by ID
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dataset retrieved successfully
 *       404:
 *         description: Dataset not found
 */
router.get("/:id", DatasetController.getById);

/**
 * @swagger
 * /datasets/{id}:
 *   delete:
 *     summary: Delete dataset
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dataset deleted successfully
 *       404:
 *         description: Dataset not found
 */
router.delete("/:id", DatasetController.delete);

/**
 * @swagger
 * /datasets/{id}/export/pdf:
 *   get:
 *     summary: Export validation report as PDF
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF generated successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Dataset not found
 */
router.get(
  "/:id/export/pdf",
  DatasetController.exportPdf
);

export default router;