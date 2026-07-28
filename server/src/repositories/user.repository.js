import User from "../models/user.model.js";

class UserRepository {
  async create(userData) {
    return User.create(userData);
  }

  async findByEmail(email) {
    return User.findOne({ email }).select("+password");
  }

  async findById(id) {
    return User.findById(id);
  }

  async updateLastLogin(id) {
    return User.findByIdAndUpdate(
      id,
      {
        lastLogin: new Date(),
      },
      {
        returnDocument: "after",
      }
    );
  }

  async deactivate(id) {
    return User.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        returnDocument: "after",
      }
    );
  }

  async existsByEmail(email) {
    return Boolean(await User.exists({ email }));
  }
}

export default new UserRepository();