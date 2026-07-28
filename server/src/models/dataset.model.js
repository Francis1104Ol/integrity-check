import mongoose from "mongoose";
import DATASET_STATUS from "../constants/datasetStatus.js";

const validationIssueSchema = new mongoose.Schema(
  {
    row: Number,
    field: String,
    type: String,
    message: String,
  },
  {
    _id: false,
  }
);

const datasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    storedFileName: {
      type: String,
      required: true,
    },

    filePath: {
      type: String,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
      min: 0,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(DATASET_STATUS),
      default: DATASET_STATUS.UPLOADED,
    },

    totalRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    duplicateRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    processingTime: {
      type: Number,
      default: 0,
      min: 0,
    },

    report: {
      summary: {
        status: {
          type: String,
          default: "PENDING",
        },

        message: {
          type: String,
          default: "",
        },
      },

      statistics: {
        totalRecords: {
          type: Number,
          default: 0,
        },

        validRecords: {
          type: Number,
          default: 0,
        },

        invalidRecords: {
          type: Number,
          default: 0,
        },

        duplicateRecords: {
          type: Number,
          default: 0,
        },

        warningCount: {
          type: Number,
          default: 0,
        },
      },

      errors: {
        type: [validationIssueSchema],
        default: [],
      },

      warnings: {
        type: [validationIssueSchema],
        default: [],
      },
    },

    validatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;