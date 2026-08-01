import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { DashboardService } from "../../services/dashboard.service";

import StatCard from "../../components/dashboard/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response =
          await DashboardService.getStats();

        setStats(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome back 👋
        </p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Datasets"
            value={
              stats?.overview
                ?.totalDatasets ?? 0
            }
          />

          <StatCard
            title="Records"
            value={
              stats?.overview
                ?.totalRecords ?? 0
            }
            color="bg-green-600"
          />

          <StatCard
            title="Duplicates"
            value={
              stats?.overview
                ?.duplicateRecords ?? 0
            }
            color="bg-red-500"
          />

          <StatCard
            title="Processing Time"
            value={`${stats?.overview?.averageProcessingTime ?? 0} ms`}
            color="bg-purple-600"
          />
        </div>
      )}
    </DashboardLayout>
  );
}