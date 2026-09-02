import { Router } from "express";
import DashboardController from "../controllers/dashboard/dashboard.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
/**
 * @swagger
 * tags:
 *  name: Dashboard
 *  description: Dashboard analytics
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Retrieve dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
    "/stats", DashboardController.getStats
);

export default router;