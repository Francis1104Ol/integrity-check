import Dataset from "../models/dataset.model.js";

class DatasetRepository {
  async create(datasetData) {
    return Dataset.create(datasetData);
  }

  async findAll({
    userId,
    page = 1,
    limit = 10,
    search = "",
    status,
    sort = "createdAt",
  }) {
    const filter = {
      uploadedBy: userId,
    };

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

  async findById(id, userId) {
    return Dataset.findOne({
      _id: id,
      uploadedBy: userId,
    }).populate(
      "uploadedBy",
      "firstName lastName email"
    );
  }

  async findReportById(id, userId) {
    return Dataset.findOne({
      _id: id,
      uploadedBy: userId,
    }).select(
      "name status validatedAt report"
    );
  }

  async update(id, userId, updateData) {
    return Dataset.findOneAndUpdate(
      {
        _id: id,
        uploadedBy: userId,
      },
      updateData,
      {
        returnDocument: "after",
      }
    );
  }

  async delete(id, userId) {
    return Dataset.findOneAndDelete({
      _id: id,
      uploadedBy: userId,
    });
  }

  async findSummaryById(id, userId) {
    return Dataset.findOne({
      _id: id,
      uploadedBy: userId,
    }).select(
      "name status report.summary validatedAt"
    );
  }
}

export default new DatasetRepository();