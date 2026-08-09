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

    const dataset =
      await DatasetRepository.create({
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

    dataset.status =
      DATASET_STATUS.PROCESSING;

    await dataset.save();

    const startedAt = Date.now();

    try {
      const records =
        ExcelService.read(file.path);

      const normalizedRecords =
        HeaderMappingService.normalize(records);

      const report =
        ValidationService.validate(
          normalizedRecords
        );

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
    return DatasetRepository.create(
      datasetData
    );
  }

  async getAll(query) {
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
      page,
      limit,
      search: query.search || "",
      status: query.status,
      sort: query.sort || "createdAt",
    });
  }

  async getById(id) {
    const dataset =
      await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return dataset;
  }

  async delete(id) {
    const dataset =
      await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    await DatasetRepository.delete(id);

    return {
      message: "Dataset deleted successfully.",
    };
  }

  async getReport(id) {
    const dataset =
      await DatasetRepository.findReportById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return dataset;
  }

  async exportPdf(id) {
    const dataset =
      await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generatePdf(dataset);
  }

  async exportCsv(id) {
    const dataset =
      await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generateCsv(dataset);
  }

  async exportExcel(id) {
    const dataset =
      await DatasetRepository.findById(id);

    if (!dataset) {
      throw new ApiError(
        404,
        "Dataset not found."
      );
    }

    return ExportService.generateExcel(dataset);
  }

  async getSummary(id) {
    const dataset =
      await DatasetRepository.findSummaryById(id);

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

  async downloadFile(id) {
    const dataset =
      await DatasetRepository.findById(id);

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

  async getRow(id, rowNumber) {
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
      await DatasetRepository.findById(id);

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