import mongoose from "mongoose";
import DATASET_STATUS from "../constants/datasetStatus.js";

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
    },

    duplicateRecords: {
      type: Number,
      default: 0,
    },

    processingTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Dataset = mongoose.model("Dataset", datasetSchema);

export default Dataset;