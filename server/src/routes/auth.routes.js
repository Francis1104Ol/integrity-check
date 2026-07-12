import { Router } from "express";
import AuthController from "../controllers/auth/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.get(
  "/profile",
  authMiddleware,
  AuthController.profile
);

router.post(
  "/logout",
  authMiddleware,
  AuthController.logout
);

export default router;