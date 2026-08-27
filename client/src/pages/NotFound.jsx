import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-10 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <ShieldAlert
            size={40}
            className="text-red-500"
          />
        </div>

        {/* Error Code */}
        <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Error 404
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-slate-500">
          The page you're looking for doesn't exist or may
          have been moved. Please check the URL or return to
          your dashboard.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Home size={18} />
            Go to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Branding */}
        <div className="mt-10 border-t pt-6">
          <p className="text-sm font-semibold text-slate-800">
            IntegrityCheck
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Data validation and integrity platform
          </p>
        </div>
      </div>
    </div>
  );
}