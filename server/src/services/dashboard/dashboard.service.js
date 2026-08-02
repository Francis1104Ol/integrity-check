import DashboardRepository from "../../repositories/dashboard.repository.js";

class DashboardService {
  async getStats() {
    return await DashboardRepository.getStats();
  }
}

export default new DashboardService();