import DashboardRepository from "../../repositories/dashboard.repository.js";

class DashboardService {
  async getStats(userId) {
    return await DashboardRepository.getStats(userId);
  }
}

export default new DashboardService();