import { Eye, Trash2 } from "lucide-react";

export default function DatasetActions({
  onView,
  onDelete,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onView}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        title="View Dataset"
      >
        <Eye size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        title="Delete Dataset"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}