export default function RecentDatasets({
  datasets = [],
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Recent Datasets
      </h2>

      {datasets.length === 0 ? (
        <p className="text-slate-500">
          No datasets uploaded yet.
        </p>
      ) : (
        <div className="space-y-4">
          {datasets.map((dataset) => (
            <div
              key={dataset._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">
                  {dataset.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {dataset.totalRecords} records •{" "}
                  {dataset.duplicateRecords} duplicates
                </p>

                <p className="text-xs text-slate-400">
                  {new Date(
                    dataset.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  dataset.status === "UPLOADED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {dataset.status || "VALIDATED"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}