import DatasetRepository from "../../repositories/dataset.repository.js";
import ExcelService from "../excel/excel.service.js";
import ApiError from "../../utils/ApiError.js";
import ValidationService from "../validation/validation.service.js";
import HeaderMappingService from "../mapping/header-mapping.service.js";
import DATASET_STATUS from "../../constants/datasetStatus.js";
import ExportService from "../export/export.service.js";
class DatasetService {
  async upload(uploadData) {
  const { name, description, uploadedBy, file } = uploadData;

  // Validate upload
  if (!file) {
    throw new ApiError(
      400,
      "Dataset upload failed. No Excel file was provided."
    );
  }

  // Create dataset record
  const dataset = await DatasetRepository.create({
    name,
    description,
    uploadedBy,

    originalFileName: file.originalname,
    storedFileName: file.filename,
    filePath: file.path,
    mimeType: file.mimetype,
    fileSize: file.size,
  });

  // Start processing timer
  const startedAt = Date.now();

  // Read Excel file
  const records = ExcelService.read(file.path);

  // Normalize headers
  const normalizedRecords =
    HeaderMappingService.normalize(records);

  // Validate normalized records
  const report =
    ValidationService.validate(normalizedRecords);

  // Calculate processing time
  const processingTime = Date.now() - startedAt;

  // Update dataset statistics
  dataset.totalRecords =
    report.statistics.totalRecords;

  dataset.duplicateRecords =
    report.statistics.duplicateRecords;

  dataset.processingTime = processingTime;

  dataset.report = report;

  dataset.validatedAt = new Date();

  dataset.status = DATASET_STATUS.VALIDATED;

  // Save updates
  await dataset.save();
dataset.validatedAt = new Date();
  return {
    dataset,
    report,
  };
}

  async create(datasetData) {
    return await DatasetRepository.create(datasetData);
  }

async getAll(query) {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    100
  );

  return await DatasetRepository.findAll({
    page,
    limit,
    search: query.search || "",
    status: query.status,
    sort: query.sort || "createdAt",
  });
}

  async getById(id) {
    const dataset = await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(404, "Dataset not found.");
    }

    return dataset;
  }

  async delete(id) {
    const dataset = await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(404, "Dataset not found.");
    }

    await DatasetRepository.delete(id);

    return {
      message: "Dataset deleted successfully.",
    };
  }

  async getReport(id) {
  const dataset = await DatasetRepository.findReportById(id);

  if (!dataset) {
    throw new ApiError(404, "Dataset not found.");
  }

  return dataset;
};
async getReport(id) {
  const dataset =
    await DatasetRepository.findReportById(id);

  if (!dataset) {
    throw new ApiError(404, "Dataset not found.");
  }

  return dataset;
}
async exportPdf(id) {
  const dataset = await DatasetRepository.findById(id);

  if (!dataset) {
    throw new ApiError(
      404,
      "Dataset not found."
    );
  }

  return await ExportService.generatePdf(dataset);
}
}

export default new DatasetService();