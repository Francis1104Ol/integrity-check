export default function RecentDatasets({
  datasets = [],
}) {
  function getStatusStyles(status) {
    switch (status) {
      case "UPLOADED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "FAILED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Recent Datasets
        </h2>

        <span className="text-sm text-slate-500">
          Latest 5
        </span>
      </div>

      {datasets.length === 0 ? (
        <div className="rounded-xl bg-slate-50 py-8 text-center">
          <p className="text-slate-500">
            No datasets uploaded yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {datasets.map((dataset) => (
            <div
              key={dataset._id}
              className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-800">
                  {dataset.name}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {dataset.totalRecords ?? 0} records{" "}
                  <span className="mx-1">•</span>
                  {dataset.duplicateRecords ?? 0} duplicates
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {dataset.createdAt
                    ? new Date(
                        dataset.createdAt
                      ).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(
                  dataset.status
                )}`}
              >
                {dataset.status || "UNKNOWN"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}