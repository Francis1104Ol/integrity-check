import Dataset from "../models/dataset.model.js";

class DashboardRepository {
  async getStats() {
    const [stats] = await Dataset.aggregate([
      {
        $group: {
          _id: null,

          totalDatasets: {
            $sum: 1,
          },

          totalRecords: {
            $sum: "$totalRecords",
          },

          duplicateRecords: {
            $sum: "$duplicateRecords",
          },

          averageProcessingTime: {
            $avg: "$processingTime",
          },

          passedValidations: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$report.summary.status",
                    "PASSED",
                  ],
                },
                1,
                0,
              ],
            },
          },

          failedValidations: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$report.summary.status",
                    "FAILED",
                  ],
                },
                1,
                0,
              ],
            },
          },

          pendingValidations: {
            $sum: {
              $cond: [
                {
                  $eq: [
                    "$report.summary.status",
                    "PENDING",
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const result = stats ?? {
      totalDatasets: 0,
      totalRecords: 0,
      duplicateRecords: 0,
      averageProcessingTime: 0,
      passedValidations: 0,
      failedValidations: 0,
      pendingValidations: 0,
    };

    result.averageProcessingTime = Number(
      (result.averageProcessingTime ?? 0).toFixed(2)
    );

    return result;
  }
}

export default new DashboardRepository();