import DatasetService from "../../services/dataset/dataset.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class DatasetController {
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
      next(error);
    }
  }

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
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const datasets = await DatasetService.getAll();

      return res.status(200).json(
        ApiResponse.success(
          "Datasets retrieved successfully.",
          datasets
        )
      );
    } catch (error) {
      next(error);
    }
  }

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
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const response = await DatasetService.delete(req.params.id);

      return res.status(200).json(
        ApiResponse.success(
          response.message
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new DatasetController();