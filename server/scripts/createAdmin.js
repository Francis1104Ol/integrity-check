import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../src/config/database.js";
import User from "../src/models/user.model.js";
import ROLES from "../src/constants/roles.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@integritycheck.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    await User.create({
      firstName: "System",
      lastName: "Administrator",
      email: "admin@integritycheck.com",
      password: "Admin@12345",
      role: ROLES.ADMIN,
    });

    console.log("Admin created successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();