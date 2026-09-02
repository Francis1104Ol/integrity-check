import DatasetRepository from "../../repositories/dataset.repository.js";
import ExcelService from "../excel/excel.service.js";
import ApiError from "../../utils/ApiError.js";
import ValidationService from "../validation/validation.service.js";
import HeaderMappingService from "../mapping/header-mapping.service.js";
import DATASET_STATUS from "../../constants/datasetStatus.js";
import ExportService from "../export/export.service.js";
import path from "path";

class DatasetService {
  async upload(uploadData) {
    const {
      name,
      description,
      uploadedBy,
      file,
    } = uploadData;

    if (!file) {
      throw new ApiError(
        400,
        "Dataset upload failed. No Excel file was provided."
      );
    }

    const dataset = await DatasetRepository.create({
      name,
      description,
      uploadedBy,

      originalFileName: file.originalname,
      storedFileName: file.filename,
      filePath: file.path,
      mimeType: file.mimetype,
      fileSize: file.size,

      status: DATASET_STATUS.UPLOADED,
    });

    dataset.status = DATASET_STATUS.PROCESSING;

    await dataset.save();

    const startedAt = Date.now();

    try {
      const records = ExcelService.read(file.path);

      const normalizedRecords =
        HeaderMappingService.normalize(records);

      const report =
        ValidationService.validate(normalizedRecords);

      const processingTime =
        Date.now() - startedAt;

      dataset.totalRecords =
        report.summary.totalRecords;

      dataset.duplicateRecords =
        report.statistics.duplicateRecords;

      dataset.processingTime =
        processingTime;

      dataset.report = report;

      dataset.validatedAt = new Date();

      dataset.status =
        DATASET_STATUS.COMPLETED;

      await dataset.save();

      return {
        dataset,
        report,
      };
    } catch (error) {
      dataset.status =
        DATASET_STATUS.FAILED;

      await dataset.save();

      throw error;
    }
  }

  async create(datasetData) {
    return DatasetRepository.create(datasetData);
  }

  /**
   * Get all datasets belonging to a user
   */
  async getAll(query, userId) {
    const page = Math.max(
      Number(query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number(query.limit) || 10,
        1
      ),
      100
    );

    return DatasetRepository.findAll({
      userId,
      page,
      limit,
      search: query.search || "",
      status: query.status,
      sort: query.sort || "createdAt",
    });
  }

  /**
   * Get a dataset belonging to a user
   */
  async getById(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return dataset;
  }

  /**
   * Delete a user's dataset
   */
  async delete(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    await DatasetRepository.delete(
      id,
      userId
    );

    return {
      message: "Dataset deleted successfully.",
    };
  }

  /**
   * Get validation report belonging to a user
   */
  async getReport(id, userId) {
    const dataset =
      await DatasetRepository.findReportById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return dataset;
  }

  /**
   * Export PDF for a user's dataset
   */
  async exportPdf(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generatePdf(dataset);
  }

  /**
   * Export CSV for a user's dataset
   */
  async exportCsv(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generateCsv(dataset);
  }

  /**
   * Export Excel for a user's dataset
   */
  async exportExcel(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generateExcel(dataset);
  }

  /**
   * Get summary belonging to a user
   */
  async getSummary(id, userId) {
    const dataset =
      await DatasetRepository.findSummaryById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return {
      datasetName: dataset.name,
      validatedAt: dataset.validatedAt,
      ...dataset.report.summary,
    };
  }

  /**
   * Download original file belonging to a user
   */
  async downloadFile(id, userId) {
    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return {
      path: path.resolve(dataset.filePath),
      originalFileName:
        dataset.originalFileName,
    };
  }

  /**
   * Get a row from a user's dataset
   */
  async getRow(id, rowNumber, userId) {
    if (
      !Number.isInteger(rowNumber) ||
      rowNumber < 2
    ) {
      throw new ApiError(
        400,
        "Invalid row number."
      );
    }

    const dataset =
      await DatasetRepository.findById(
        id,
        userId
      );

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExcelService.getRow(
      dataset.filePath,
      rowNumber
    );
  }
}

export default new DatasetService();