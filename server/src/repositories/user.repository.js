import User from "../models/user.model.js";

class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  async findById(id) {
    return await User.findById(id);
  }

  async updateLastLogin(id) {
    return await User.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    );
  }

  async deactivate(id) {
    return await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
  }

  async existsByEmail(email) {
    return await User.exists({ email });
  }
}

export default new UserRepository();