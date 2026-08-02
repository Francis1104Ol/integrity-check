import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "IntegrityCheck API",
      version: "1.0.0",
      description:
        "IntegrityCheck is an enterprise dataset validation platform that enables organizations to upload Excel or CSV datasets, validate records, detect duplicates, generate validation reports, export reports as PDF, and monitor analytics through a centralized dashboard.",

      contact: {
        name: "Taiwo Francis",
        email: "your-email@example.com",
      },

      license: {
        name: "MIT",
      },
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description:
          "User authentication and authorization endpoints",
      },
      {
        name: "Datasets",
        description:
          "Dataset upload, validation, reporting, and export",
      },
      {
        name: "Dashboard",
        description:
          "Dashboard statistics and analytics",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      responses: {
        BadRequest: {
          description: "Bad Request",
        },

        Unauthorized: {
          description: "Unauthorized",
        },

        NotFound: {
          description: "Resource not found",
        },

        InternalServerError: {
          description: "Internal server error",
        },
      },

      schemas: {
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },

            message: {
              type: "string",
              example:
                "Operation completed successfully.",
            },

            data: {
              type: "object",
            },
          },
        },

        RegisterRequest: {
          type: "object",

          required: [
            "firstName",
            "lastName",
            "email",
            "password",
          ],

          properties: {
            firstName: {
              type: "string",
              example: "John",
            },

            lastName: {
              type: "string",
              example: "Doe",
            },

            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password123!",
            },
          },
        },

        LoginRequest: {
          type: "object",

          required: [
            "email",
            "password",
          ],

          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password123!",
            },
          },
        },

        User: {
          type: "object",

          properties: {
            _id: {
              type: "string",
              example:
                "6887c4d8f45d32b1b6e11f1a",
            },

            firstName: {
              type: "string",
              example: "John",
            },

            lastName: {
              type: "string",
              example: "Doe",
            },

            email: {
              type: "string",
              example: "john@example.com",
            },

            role: {
              type: "string",
              example: "validation_officer",
            },
          },
        },

        DashboardStats: {
          type: "object",

          properties: {
            totalDatasets: {
              type: "integer",
              example: 25,
            },

            totalRecords: {
              type: "integer",
              example: 15000,
            },

            duplicateRecords: {
              type: "integer",
              example: 420,
            },

            averageProcessingTime: {
              type: "number",
              example: 5.72,
            },

            passedValidations: {
              type: "integer",
              example: 18,
            },

            failedValidations: {
              type: "integer",
              example: 7,
            },

            pendingValidations: {
              type: "integer",
              example: 0,
            },
          },
        },

        ValidationError: {
          type: "object",

          properties: {
            row: {
              type: "integer",
              example: 5,
            },

            field: {
              type: "string",
              example: "nin",
            },

            value: {
              type: "string",
              example: "123456",
            },

            type: {
              type: "string",
              example: "INVALID_FORMAT",
            },

            severity: {
              type: "string",
              example: "ERROR",
            },

            message: {
              type: "string",
              example:
                "NIN must contain exactly 11 digits.",
            },
          },
        },

        ValidationSummary: {
          type: "object",

          properties: {
            status: {
              type: "string",
              example: "FAILED",
            },

            message: {
              type: "string",
              example:
                "Validation completed with errors.",
            },

            totalRecords: {
              type: "integer",
              example: 1000,
            },

            validRecords: {
              type: "integer",
              example: 960,
            },

            invalidRecords: {
              type: "integer",
              example: 40,
            },

            warningRecords: {
              type: "integer",
              example: 8,
            },

            healthScore: {
              type: "integer",
              example: 96,
            },
          },
        },

        ValidationStatistics: {
          type: "object",

          properties: {
            totalErrors: {
              type: "integer",
              example: 40,
            },

            totalWarnings: {
              type: "integer",
              example: 8,
            },

            requiredFields: {
              type: "integer",
              example: 5,
            },

            duplicateRecords: {
              type: "integer",
              example: 15,
            },

            invalidFormats: {
              type: "integer",
              example: 20,
            },

            duplicateNin: {
              type: "integer",
              example: 7,
            },

            duplicatePhone: {
              type: "integer",
              example: 5,
            },

            duplicateCoordinates: {
              type: "integer",
              example: 3,
            },

            invalidNin: {
              type: "integer",
              example: 9,
            },

            invalidPhone: {
              type: "integer",
              example: 6,
            },

            invalidCoordinates: {
              type: "integer",
              example: 5,
            },
          },
        },

        ValidationReport: {
          type: "object",

          properties: {
            summary: {
              $ref: "#/components/schemas/ValidationSummary",
            },

            statistics: {
              $ref: "#/components/schemas/ValidationStatistics",
            },

            errors: {
              type: "array",

              items: {
                $ref:
                  "#/components/schemas/ValidationError",
              },
            },

            warnings: {
              type: "array",

              items: {
                $ref:
                  "#/components/schemas/ValidationError",
              },
            },
          },
        },

        Dataset: {
          type: "object",

          properties: {
            _id: {
              type: "string",
            },

            name: {
              type: "string",
              example: "Farm Dataset",
            },

            description: {
              type: "string",
              example:
                "Farmer registration records",
            },

            status: {
              type: "string",
              example: "COMPLETED",
            },

            totalRecords: {
              type: "integer",
              example: 1000,
            },

            duplicateRecords: {
              type: "integer",
              example: 25,
            },

            processingTime: {
              type: "number",
              example: 4.25,
            },

            uploadedBy: {
              $ref: "#/components/schemas/User",
            },

            report: {
              $ref:
                "#/components/schemas/ValidationReport",
            },

            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.js",
    "./src/controllers/**/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;