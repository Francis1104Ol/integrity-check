import Card from "../../ui/Card";

export default function ValidationSummary({
  report,
}) {
  if (!report) {
    return (
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Validation Summary
        </h3>

        <p className="mt-4 text-slate-500">
          No validation report available.
        </p>
      </Card>
    );
  }

  const summary = report.summary;
  const statistics = report.statistics;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Validation Summary
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Overview of the dataset validation
            results.
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            summary?.status === "PASSED"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {summary?.status || "UNKNOWN"}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-600">
            Total Records
          </span>

          <strong>
            {summary?.totalRecords ?? 0}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Valid Records
          </span>

          <strong className="text-green-600">
            {summary?.validRecords ?? 0}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Invalid Records
          </span>

          <strong className="text-red-600">
            {summary?.invalidRecords ?? 0}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Duplicate Records
          </span>

          <strong className="text-red-600">
            {statistics?.duplicateRecords ?? 0}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Invalid Formats
          </span>

          <strong className="text-red-600">
            {statistics?.invalidFormats ?? 0}
          </strong>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-600">
            Warning Records
          </span>

          <strong className="text-yellow-600">
            {summary?.warningRecords ?? 0}
          </strong>
        </div>

        <hr />

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Health Score
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {summary?.healthScore ?? 0}%
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {summary?.message}
          </p>
        </div>
      </div>
    </Card>
  );
}