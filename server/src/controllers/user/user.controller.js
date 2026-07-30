import UserService from "../../services/user/user.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll();

      return res.status(200).json(
        ApiResponse.success(
          "Users retrieved successfully.",
          users
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await UserService.getById(
        req.params.id
      );

      return res.status(200).json(
        ApiResponse.success(
          "User retrieved successfully.",
          user
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async deactivate(req, res, next) {
    try {
      const response =
        await UserService.deactivate(req.params.id);

      return res.status(200).json(
        ApiResponse.success(response.message)
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();