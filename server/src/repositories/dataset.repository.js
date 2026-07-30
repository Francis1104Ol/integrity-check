import Dataset from "../models/dataset.model.js";

class DatasetRepository {
  async create(datasetData) {
    return Dataset.create(datasetData);
  }

  async findAll({
    page = 1,
    limit = 10,
    search = "",
    status,
    sort = "createdAt",
  }) {
    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [datasets, total] = await Promise.all([
      Dataset.find(filter)
        .populate(
          "uploadedBy",
          "firstName lastName email"
        )
        .sort({ [sort]: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Dataset.countDocuments(filter),
    ]);

    return {
      datasets,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id) {
    return Dataset.findById(id)
      .populate(
        "uploadedBy",
        "firstName lastName email"
      );
  }

  async findReportById(id) {
    return Dataset.findById(id).select(
      "name status validatedAt report"
    );
  }

  async update(id, updateData) {
    return Dataset.findByIdAndUpdate(
      id,
      updateData,
      {
        returnDocument: "after",
      }
    );
  }

  async delete(id) {
    return Dataset.findByIdAndDelete(id);
  }
async findSummaryById(id) {
  return Dataset.findById(id).select(
    "name status report.summary validatedAt"
  );
}
  
}

export default new DatasetRepository();