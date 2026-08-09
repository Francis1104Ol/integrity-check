export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="py-16 text-center">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </div>
  );
}