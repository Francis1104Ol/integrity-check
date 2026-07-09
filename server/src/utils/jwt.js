import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate a JWT for an authenticated user.
 * @param {Object} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });
};

/**
 * Verify and decode a JWT.
 * @param {string} token
 * @returns {Object}
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};