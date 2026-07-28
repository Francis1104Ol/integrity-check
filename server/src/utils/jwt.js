import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate a JWT for an authenticated user.
 * @param {Object} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: env.jwtExpiresIn,
    issuer: "IntegrityCheck",
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