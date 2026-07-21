import UserRepository from "../../repositories/user.repository.js";
import { generateToken } from "../../utils/jwt.js";
import ApiError from "../../utils/ApiError.js";
import ROLES from "../../constants/roles.js";

class AuthService {
  async register(credentials) {
    const { firstName, lastName, email, password } = credentials;

    // Check if email already exists
    const emailExists = await UserRepository.existsByEmail(email);

    if (emailExists) {
      throw new ApiError(409, "Email already exists.");
    }

    // Create the user
    const user = await UserRepository.create({
      firstName,
      lastName,
      email,
      password,
      role: ROLES.VALIDATION_OFFICER,
    });

    // Generate JWT
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  }
  /** Login an existing user */
  async login({ email, password}){
    const user = await userRepository.findByEmail(email);
        // check if user exists
    if (!user){
        throw new ApiError(401, "Invalid email or password.");

    }

    //verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid){
        throw new ApiError(401, "Invalid email or password.");
    }

    //check if account is active
    if (!user.isActive){
        throw new ApiError(
            403, 
            "Your account has been deactivated. Please Contact the administrator."
        );
    }
    //Update Last Login
    await UserRepository.updateLastLogin(user._id);
    //Generate JWT
    const token = generateToken({
        id: user._id,
        role: user.role,
    });
    // Returning Plain data
    return{
        user,
        token,
    };
  }


}


export default new AuthService();