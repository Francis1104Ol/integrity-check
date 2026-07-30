
import path from "path";

import request from "supertest";
import app from "../../src/app.js";

describe("Dashboard API", () => {
  let token;

  beforeAll(async () => {
    // Register user
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Dashboard",
        lastName: "Tester",
        email: "dashboard@example.com",
        password: "Password123!",
      });

    // Login
    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "dashboard@example.com",
        password: "Password123!",
      });

    token = loginResponse.body.data.token;
  });

  describe("GET /api/v1/dashboard/stats", () => {
    it("should return dashboard statistics", async () => {
      const response = await request(app)
        .get("/api/v1/dashboard/stats")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Overview
      expect(response.body.data).toHaveProperty("overview");

      expect(response.body.data.overview).toHaveProperty(
        "totalDatasets"
      );

      expect(response.body.data.overview).toHaveProperty(
        "totalRecords"
      );

      expect(response.body.data.overview).toHaveProperty(
        "duplicateRecords"
      );

      expect(response.body.data.overview).toHaveProperty(
        "averageProcessingTime"
      );

      // Validation
      expect(response.body.data).toHaveProperty(
        "validation"
      );

      expect(response.body.data.validation).toHaveProperty(
        "passed"
      );

      expect(response.body.data.validation).toHaveProperty(
        "failed"
      );

      expect(response.body.data.validation).toHaveProperty(
        "pending"
      );

      expect(response.body.data.validation).toHaveProperty(
        "successRate"
      );

      // Upload statistics
      expect(response.body.data).toHaveProperty(
        "uploads"
      );

      expect(response.body.data.uploads).toHaveProperty(
        "today"
      );

      expect(response.body.data.uploads).toHaveProperty(
        "thisWeek"
      );

      expect(response.body.data.uploads).toHaveProperty(
        "thisMonth"
      );

      // Recent datasets
      expect(response.body.data).toHaveProperty(
        "recentDatasets"
      );

      expect(
        Array.isArray(response.body.data.recentDatasets)
      ).toBe(true);
    });

    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .get("/api/v1/dashboard/stats");

      expect(response.status).toBe(401);
    });
  });
});