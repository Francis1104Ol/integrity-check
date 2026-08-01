import api from "./api";

export const DashboardService = {
  getStats() {
    return api.get("/dashboard/stats");
  },
};