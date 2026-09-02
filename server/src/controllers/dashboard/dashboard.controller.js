import DashboardService from "../../services/dashboard/dashboard.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class DashboardController {
  /**
   * Get dashboard statistics
   */
  async getStats(req, res, next) {
    try {
      const dashboard =
        await DashboardService.getStats(
          req.user._id
        );

      return res.status(200).json(
        ApiResponse.success(
          "Dashboard statistics retrieved successfully.",
          dashboard
        )
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new DashboardController();