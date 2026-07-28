import DashboardService from "../../services/dashboard/dashboard.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class DashboardController {
  /**
   * Get dashboard statistics
   */
  async getStats(req, res, next) {
    try {
      const stats = await DashboardService.getStats();

      return res.status(200).json(
        ApiResponse.success(
          "Dashboard statistics retrieved successfully.",
          stats
        )
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new DashboardController();