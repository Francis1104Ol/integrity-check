import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";

import { AuthService } from "../../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  async function onSubmit(data) {
    try {
      setLoading(true);

      const response =
        await AuthService.register({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        });

      if (response.data.success === false) {
        throw new Error(
          response.data.message ||
            "Registration failed."
        );
      }

      toast.success(
        "Account created successfully. Please login."
      );

      navigate("/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <ShieldCheck
            className="mx-auto mb-4 text-blue-600"
            size={48}
          />

          <h1 className="text-3xl font-bold text-slate-900">
            IntegrityCheck
          </h1>

          <p className="mt-2 text-slate-500">
            Create your validation officer account
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                First Name
              </label>

              <input
                type="text"
                {...register("firstName", {
                  required:
                    "First name is required",
                })}
                className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="First name"
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Last Name
              </label>

              <input
                type="text"
                {...register("lastName", {
                  required:
                    "Last name is required",
                })}
                className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Last name"
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Please enter a valid email address.",
                },
              })}
              className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters.",
                  },
                })}
                className="w-full rounded-xl border border-slate-300 p-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Create a password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Please confirm your password.",
                    validate: (value) =>
                      value === password ||
                      "Passwords do not match.",
                  }
                )}
                className="w-full rounded-xl border border-slate-300 p-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}