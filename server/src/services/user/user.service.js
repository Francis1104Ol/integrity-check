import UserRepository from "../../repositories/user.repository.js";
import ApiError from "../../utils/ApiError.js";

class UserService {
  /**
   * Get all users
   */
  async getAll() {
    return await UserRepository.findAll();
  }

  /**
   * Get user by ID
   */
  async getById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  }

  /**
   * Deactivate user
   */
  async deactivate(id) {
    const user = await UserRepository.deactivate(id);

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return {
      message: "User deactivated successfully.",
    };
  }
}

export default new UserService();