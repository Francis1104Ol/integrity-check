import DatasetRepository from "../../repositories/dataset.repository.js";
import ExcelService from "../excel/excel.service.js";
import ApiError from "../../utils/ApiError.js";
import ValidationService from "../validation/validation.service.js";
import HeaderMappingService from "../mapping/header-mapping.service.js";
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

  // Read Excel
  const records = ExcelService.read(file.path);


const normalizedRecords = HeaderMappingService.normalize(records);


const report = ValidationService.validate(normalizedRecords);

  // Update statistics
  dataset.totalRecords = report.totalRecords;
  dataset.duplicateRecords = report.duplicateRecords;

  await dataset.save();

  return {
    dataset,
    report,
  };
}

  async create(datasetData) {
    return await DatasetRepository.create(datasetData);
  }

  async getAll() {
    return await DatasetRepository.findAll();
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
}

export default new DatasetService();