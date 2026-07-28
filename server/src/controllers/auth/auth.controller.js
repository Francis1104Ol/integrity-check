import AuthService from "../../services/auth/auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthController {
  /**
   * Register a new user
   */
  async register(req, res, next) {
    try {
      const response = await AuthService.register(req.body);

      return res.status(201).json(
        ApiResponse.success(
          "Registration successful.",
          response
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Login an existing user
   */
  async login(req, res, next) {
    try {
      const response = await AuthService.login(req.body);

      return res.status(200).json(
        ApiResponse.success(
          "Login successful.",
          response
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get authenticated user's profile
   */
  async profile(req, res, next) {
    try {
      return res.status(200).json(
        ApiResponse.success(
          "Profile retrieved successfully.",
          req.user
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Logout user
   */
  async logout(req, res, next) {
    try {
      return res.status(200).json(
        ApiResponse.success(
          "Logout successful."
        )
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();