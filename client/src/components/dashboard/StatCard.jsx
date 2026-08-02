export default function StatCard({
  title,
  value,
  color = "bg-blue-600",
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border">
      <div
        className={`mb-4 h-3 w-16 rounded-full ${color}`}
      />

      <h3 className="text-sm text-slate-500">
        {title}
      </h3>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}