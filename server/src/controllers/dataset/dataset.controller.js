import DatasetService from "../../services/dataset/dataset.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class DatasetController {
  /**
   * Create a dataset
   */
  async create(req, res, next) {
    try {
      const datasetData = {
        ...req.body,
        uploadedBy: req.user._id,
      };

      const dataset = await DatasetService.create(datasetData);

      return res.status(201).json(
        ApiResponse.success(
          "Dataset created successfully.",
          dataset
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Upload and validate a dataset
   */
  async upload(req, res, next) {
    try {
      const uploadData = {
        ...req.body,
        uploadedBy: req.user._id,
        file: req.file,
      };

      const result = await DatasetService.upload(uploadData);

      return res.status(201).json(
        ApiResponse.success(
          "Dataset uploaded successfully.",
          result
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get all datasets
   */
  async getAll(req, res, next) {
    try {
      const datasets = await DatasetService.getAll(req.query);

      return res.status(200).json(
        ApiResponse.success(
          "Datasets retrieved successfully.",
          datasets
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get dataset by ID
   */
  async getById(req, res, next) {
    try {
      const dataset = await DatasetService.getById(req.params.id);

      return res.status(200).json(
        ApiResponse.success(
          "Dataset retrieved successfully.",
          dataset
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Delete dataset
   */
  async delete(req, res, next) {
    try {
      const response = await DatasetService.delete(req.params.id);

      return res.status(200).json(
        ApiResponse.success(response.message)
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get validation report
   */
  async getReport(req, res, next) {
    try {
      const report = await DatasetService.getReport(req.params.id);

      return res.status(200).json(
        ApiResponse.success(
          "Validation report retrieved successfully.",
          report
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Export validation report as PDF
   */
  async exportPdf(req, res, next) {
    try {
      const pdfBuffer = await DatasetService.exportPdf(req.params.id);

      res.setHeader("Content-Type", "application/pdf");

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="validation-report.pdf"'
      );

      return res.send(pdfBuffer);
    } catch (error) {
      return next(error);
    }
  }
}

export default new DatasetController();