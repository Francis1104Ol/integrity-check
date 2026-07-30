import { describe, it, expect, beforeEach } from "@jest/globals";
import request from "supertest";

import app from "../../src/app.js";
import User from "../../src/models/user.model.js";

describe("Authentication API", () => {
  let userData;

  beforeEach(async () => {
    // Clean users before every test
    await User.deleteMany({});

    // Fresh user for every test
    userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Password123",
    };
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Registration successful."
      );

      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data).toHaveProperty("token");

      const user = await User.findOne({
        email: userData.email,
      }).select("+password");

      expect(user).not.toBeNull();
      expect(user.password).not.toBe(userData.password);
    });

    it("should not register a duplicate email", async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Email already exists."
      );
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send(userData);
    });

    it("should login successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: userData.email,
          password: userData.password,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.user.email).toBe(
        userData.email
      );
    });

    it("should reject invalid password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: userData.email,
          password: "WrongPassword",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password."
      );
    });

    it("should reject unknown email", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "unknown@example.com",
          password: "Password123",
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid email or password."
      );
    });
  });

  describe("GET /api/v1/auth/profile", () => {
    let token;

    beforeEach(async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: userData.email,
          password: userData.password,
        });

      expect(response.status).toBe(200);

      token = response.body.data.token;
    });

    it("should return the authenticated user's profile", async () => {
      const response = await request(app)
        .get("/api/v1/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(
        userData.email
      );
    });

    it("should reject requests without a token", async () => {
      const response = await request(app)
        .get("/api/v1/auth/profile");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Authentication required."
      );
    });
  });

  describe("POST /api/v1/auth/logout", () => {
    let token;

    beforeEach(async () => {
      await request(app)
        .post("/api/v1/auth/register")
        .send(userData);

      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: userData.email,
          password: userData.password,
        });

      expect(response.status).toBe(200);

      token = response.body.data.token;
    });

    it("should logout successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/logout")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Logout successful."
      );
    });
  });
});