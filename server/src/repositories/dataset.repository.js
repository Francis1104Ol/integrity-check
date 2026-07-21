import Dataset from "../models/dataset.model.js";

class DatasetRepository {
  async create(datasetData) {
    return await Dataset.create(datasetData);
  }

  async findAll() {
    return await Dataset.find()
      .populate("uploadedBy", "firstName lastName email")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Dataset.findById(id)
      .populate("uploadedBy", "firstName lastName email");
  }

  async update(id, updateData) {
    return await Dataset.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
  }

  async delete(id) {
    return await Dataset.findByIdAndDelete(id);
  }
}

export default new DatasetRepository();