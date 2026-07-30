import Dataset from "../models/dataset.model.js";

class DashboardRepository {
  async getStats() {
    const now = new Date();

    const today = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const week = new Date(today);
    week.setDate(today.getDate() - 7);

    const month = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const [
      aggregate,
      uploadsToday,
      uploadsThisWeek,
      uploadsThisMonth,
      recentDatasets,
    ] = await Promise.all([
      Dataset.aggregate([
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
      ]),

      Dataset.countDocuments({
        createdAt: {
          $gte: today,
        },
      }),

      Dataset.countDocuments({
        createdAt: {
          $gte: week,
        },
      }),

      Dataset.countDocuments({
        createdAt: {
          $gte: month,
        },
      }),

      Dataset.find()
        .select(
          "name status totalRecords duplicateRecords createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean(),
    ]);

    const stats =
      aggregate[0] ?? {
        totalDatasets: 0,
        totalRecords: 0,
        duplicateRecords: 0,
        averageProcessingTime: 0,
        passedValidations: 0,
        failedValidations: 0,
        pendingValidations: 0,
      };

    const successRate =
      stats.totalDatasets === 0
        ? 0
        : Number(
            (
              (stats.passedValidations /
                stats.totalDatasets) *
              100
            ).toFixed(2)
          );

    return {
      overview: {
        totalDatasets: stats.totalDatasets,
        totalRecords: stats.totalRecords,
        duplicateRecords: stats.duplicateRecords,
        averageProcessingTime: Number(
          (stats.averageProcessingTime ?? 0).toFixed(2)
        ),
      },

      validation: {
        passed: stats.passedValidations,
        failed: stats.failedValidations,
        pending: stats.pendingValidations,
        successRate,
      },

      uploads: {
        today: uploadsToday,
        thisWeek: uploadsThisWeek,
        thisMonth: uploadsThisMonth,
      },

      recentDatasets,
    };
  }
}

export default new DashboardRepository();