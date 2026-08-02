import { Router } from "express";
import UserController from "../controllers/user/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import ROLES from "../constants/roles.js";

const router = Router();

router.use(authMiddleware);
router.use(authorize(ROLES.ADMIN));

router.get("/", UserController.getAll);

router.get("/:id", UserController.getById);

router.patch(
  "/:id/deactivate",
  UserController.deactivate
);

export default router;