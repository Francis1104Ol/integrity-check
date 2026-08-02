import request from "supertest";
import path from "path";
import app from "../../src/app.js";

describe("Dataset API", () => {
  let token;

  const fixture = path.resolve(
    "tests/fixtures/sample-dataset.xlsx"
  );

  async function createDataset() {
    const response = await request(app)
      .post("/api/v1/datasets/upload")
      .set("Authorization", `Bearer ${token}`)
      .field("name", "Farm Dataset")
      .field("description", "Integration Test Dataset")
      .attach("file", fixture);

    expect(response.status).toBe(201);

    return response.body.data.dataset._id;
  }

  beforeAll(async () => {
    await request(app)
      .post("/api/v1/auth/register")
      .send({
        firstName: "Dataset",
        lastName: "Tester",
        email: "dataset@example.com",
        password: "Password123!",
      });

    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "dataset@example.com",
        password: "Password123!",
      });

    token = loginResponse.body.data.token;
  });

  describe("POST /api/v1/datasets/upload", () => {
    it("should upload and validate a dataset", async () => {
      const response = await request(app)
        .post("/api/v1/datasets/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Farm Dataset")
        .field("description", "Integration Test Dataset")
        .attach("file", fixture);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.dataset).toBeDefined();
      expect(response.body.data.report).toBeDefined();
    });

    it("should reject upload without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/datasets/upload")
        .field("name", "Unauthorized")

      expect(response.status).toBe(401);
    });

    it("should reject upload without a file", async () => {
      const response = await request(app)
        .post("/api/v1/datasets/upload")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Missing File");

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/v1/datasets", () => {
    it("should return all datasets", async () => {
      await createDataset();

      const response = await request(app)
        .get("/api/v1/datasets")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("GET /api/v1/datasets/:id", () => {
    it("should return a dataset by id", async () => {
      const datasetId = await createDataset();

      const response = await request(app)
        .get(`/api/v1/datasets/${datasetId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should return 404 for a non-existing dataset", async () => {
      const response = await request(app)
        .get("/api/v1/datasets/507f191e810c19729de860ea")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /api/v1/datasets/:id/report", () => {
    it("should return the validation report", async () => {
      const datasetId = await createDataset();

      const response = await request(app)
        .get(`/api/v1/datasets/${datasetId}/report`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("GET /api/v1/datasets/:id/export/pdf", () => {
    it("should export the validation report as PDF", async () => {
      const datasetId = await createDataset();

      const response = await request(app)
        .get(`/api/v1/datasets/${datasetId}/export/pdf`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"])
        .toContain("application/pdf");
    });
  });

  describe("DELETE /api/v1/datasets/:id", () => {
    it("should delete a dataset", async () => {
      const datasetId = await createDataset();

      const response = await request(app)
        .delete(`/api/v1/datasets/${datasetId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should return 404 after deletion", async () => {
      const datasetId = await createDataset();

      await request(app)
        .delete(`/api/v1/datasets/${datasetId}`)
        .set("Authorization", `Bearer ${token}`);

      const response = await request(app)
        .get(`/api/v1/datasets/${datasetId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });
});