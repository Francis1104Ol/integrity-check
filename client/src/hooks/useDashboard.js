import { useEffect, useState } from "react";

import { DashboardService } from "../services/dashboard.service";

export function useDashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  async function fetchDashboard() {
    try {
      setLoading(true);

      const response =
        await DashboardService.getStats();

      setStats(response.data.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, []);

  return {
    stats,
    loading,
    refresh: fetchDashboard,
  };
}