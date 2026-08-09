
import DashboardLayout from "../../layouts/DashboardLayout";
import { useDashboard } from "../../hooks/useDashboard";
import StatCard from "../../components/dashboard/StatCard";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentDatasets from "../../components/dashboard/RecentDatasets";
import ValidationSummary from "../../components/dashboard/ValidationSummary";
import UploadStatistics from "../../components/dashboard/UploadStatistics";

export default function Dashboard() {
const { stats, loading } = useDashboard();
  return (
  <DashboardLayout>
    <DashboardHeader />

    

    {loading ? (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    ) : (
      <>
        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Datasets"
            value={
              stats?.overview?.totalDatasets ?? 0
            }
            subtitle="Uploaded datasets"
          />

          <StatCard
            title="Records"
            value={
              stats?.overview?.totalRecords ?? 0
            }
            subtitle="Processed records"
            color="bg-green-600"
          />

          <StatCard
            title="Duplicates"
            value={
              stats?.overview?.duplicateRecords ??
              0
            }
            subtitle="Duplicate records"
            color="bg-red-500"
          />

          <StatCard
            title="Avg. Processing"
            value={`${
              stats?.overview
                ?.averageProcessingTime ?? 0
            } ms`}
            subtitle="Average validation time"
            color="bg-purple-600"
          />
        </div>

        {/* Lower Section */}
        <div className="mt-8 grid gap-6 xl:grid-cols-4">
  <div className="xl:col-span-2">
    <RecentDatasets
      datasets={stats?.recentDatasets || []}
    />
  </div>

  <ValidationSummary
    validation={stats?.validation}
  />

  <UploadStatistics
    uploads={stats?.uploads}
  />
</div>

<div className="mt-8">
  <QuickActions />
</div>
      </>
    )}
  </DashboardLayout>
);
}