import mongoose from "mongoose";
import DATASET_STATUS from "../constants/datasetStatus.js";

const validationIssueSchema = new mongoose.Schema(
  {
    row: {
      type: Number,
      required: true,
    },

    field: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      default: "ERROR",
    },

    message: {
      type: String,
      required: true,
    },
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

    totalRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    validRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    invalidRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    warningRecords: {
      type: Number,
      default: 0,
      min: 0,
    },

    healthScore: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },
  },

  statistics: {
    totalErrors: {
      type: Number,
      default: 0,
    },

    totalWarnings: {
      type: Number,
      default: 0,
    },

    requiredFields: {
      type: Number,
      default: 0,
    },

    duplicateRecords: {
      type: Number,
      default: 0,
    },

    invalidFormats: {
      type: Number,
      default: 0,
    },

    duplicateNin: {
      type: Number,
      default: 0,
    },

    duplicatePhone: {
      type: Number,
      default: 0,
    },

    duplicateCoordinates: {
      type: Number,
      default: 0,
    },

    invalidNin: {
      type: Number,
      default: 0,
    },

    invalidPhone: {
      type: Number,
      default: 0,
    },

    invalidCoordinates: {
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