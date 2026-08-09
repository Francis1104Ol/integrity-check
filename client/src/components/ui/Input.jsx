export default function Input({
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

      <input
        {...props}
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