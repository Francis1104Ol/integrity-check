export default function ValidationSummary({
  validation,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Validation Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Passed</span>
          <span className="font-semibold text-green-600">
            {validation?.passed ?? 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Failed</span>
          <span className="font-semibold text-red-600">
            {validation?.failed ?? 0}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Pending</span>
          <span className="font-semibold text-yellow-600">
            {validation?.pending ?? 0}
          </span>
        </div>

        <hr />

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Success Rate
          </p>

          <h2 className="mt-2 text-4xl font-bold text-blue-600">
            {validation?.successRate ?? 0}%
          </h2>
        </div>
      </div>
    </div>
  );
}
