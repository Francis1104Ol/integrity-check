import StatCard from "../../dashboard/StatCard";

export default function DatasetStatistics({ dataset }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Records"
        value={dataset.totalRecords ?? 0}
        color="bg-blue-600"
      />

      <StatCard
        title="Duplicates"
        value={dataset.duplicateRecords ?? 0}
        color="bg-red-500"
      />

      <StatCard
        title="Valid Records"
        value={
          dataset.report?.summary?.validRecords ?? 0
        }
        color="bg-green-500"
      />

      <StatCard
        title="Processing Time"
        value={`${dataset.processingTime ?? 0} ms`}
        color="bg-purple-600"
      />
    </div>
  );
}