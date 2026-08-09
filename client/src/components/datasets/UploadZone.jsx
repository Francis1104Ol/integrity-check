import { UploadCloud } from "lucide-react";

export default function UploadZone({
  file,
  setFile,
}) {
  function handleChange(e) {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-300 p-10 text-center transition hover:border-blue-500">

      <UploadCloud
        size={52}
        className="mx-auto mb-4 text-blue-600"
      />

      <h3 className="text-lg font-semibold">
        Drag & Drop your file
      </h3>

      <p className="mt-2 text-slate-500">
        Excel (.xlsx, .xls) or CSV
      </p>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleChange}
        className="mt-6"
      />

      {file && (
        <div className="mt-6 rounded-xl bg-slate-100 p-4">

          <p className="font-semibold">
            {file.name}
          </p>

          <p className="text-sm text-slate-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

    </div>
  );
}