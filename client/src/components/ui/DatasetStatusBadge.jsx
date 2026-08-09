export default function StatusBadge({ status }) {
  const styles = {
    COMPLETED:
      "bg-green-100 text-green-700",

    PROCESSING:
      "bg-yellow-100 text-yellow-700",

    FAILED:
      "bg-red-100 text-red-700",

    UPLOADED:
      "bg-blue-100 text-blue-700",

    PENDING:
      "bg-gray-100 text-gray-700",
  };

  const label = status
    ?.toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {label || "Unknown"}
    </span>
  );
}