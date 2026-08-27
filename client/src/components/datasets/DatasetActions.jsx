import {
  Eye,
  Trash2,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

export default function DatasetActions({
  onView,
  onDelete,
  onDownload,
  onExportPdf,
  onExportCsv,
  onExportExcel,
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      {/* View */}
      <button
        type="button"
        onClick={onView}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
        title="View Dataset"
      >
        <Eye size={18} />
      </button>

      {/* Download Original Dataset */}
      <button
        type="button"
        onClick={onDownload}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-green-50 hover:text-green-600"
        title="Download Original Dataset"
      >
        <Download size={18} />
      </button>

      {/* Export PDF */}
      <button
        type="button"
        onClick={onExportPdf}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        title="Export PDF Report"
      >
        <FileText size={18} />
      </button>

      {/* Export CSV */}
      <button
        type="button"
        onClick={onExportCsv}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-yellow-50 hover:text-yellow-600"
        title="Export CSV Report"
      >
        <FileSpreadsheet size={18} />
      </button>

      {/* Export Excel */}
      <button
        type="button"
        onClick={onExportExcel}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600"
        title="Export Excel Report"
      >
        <FileSpreadsheet size={18} />
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={onDelete}
        className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        title="Delete Dataset"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}