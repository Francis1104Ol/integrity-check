export default function UploadStatistics({
  uploads,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Upload Activity
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span>Today</span>

          <span className="rounded-lg bg-blue-100 px-3 py-1 font-semibold text-blue-700">
            {uploads?.today ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>This Week</span>

          <span className="rounded-lg bg-green-100 px-3 py-1 font-semibold text-green-700">
            {uploads?.thisWeek ?? 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>This Month</span>

          <span className="rounded-lg bg-purple-100 px-3 py-1 font-semibold text-purple-700">
            {uploads?.thisMonth ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}