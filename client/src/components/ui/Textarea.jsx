export default function Textarea({
  label,
  error,
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="mb-2 block font-medium">
          {label}
        </label>
      )}

      <textarea
        {...props}
        rows={4}
        className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}