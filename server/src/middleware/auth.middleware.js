import UserRepository from "../repositories/user.repository.js";
import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new ApiError(401, "Authentication required.")
      );
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await UserRepository.findById(decoded.id);

    if (!user || !user.isActive) {
      return next(
        new ApiError(
          401,
          "User no longer exists or has been deactivated."
        )
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new ApiError(
        401,
        "Invalid or expired token."
      )
    );
  }
};

export default authMiddleware;