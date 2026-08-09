export default function StatCard({
  title,
  value,
  subtitle,
  color = "bg-blue-600",
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div
        className={`mb-5 h-2 w-14 rounded-full ${color}`}
      />

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}