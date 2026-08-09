import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/datasets/upload")}
          className="w-full rounded-xl bg-blue-600 py-3 text-white"
        >
          Upload Dataset
        </button>

        <button
          onClick={() => navigate("/datasets")}
          className="w-full rounded-xl border py-3"
        >
          View Datasets
        </button>

        <button
          onClick={() => navigate("/reports")}
          className="w-full rounded-xl border py-3"
        >
          Validation Reports
        </button>
      </div>
    </div>
  );
}