import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { AuthService } from "../../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
  try {
    setLoading(true);

    const response = await AuthService.login(data);

    const { token, user } = response.data.data;

    await login(token, user);

    toast.success("Login successful");

    navigate("/dashboard");
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <ShieldCheck
            className="mx-auto mb-4 text-blue-600"
            size={48}
          />

          <h1 className="text-3xl font-bold">
            IntegrityCheck
          </h1>

          <p className="mt-2 text-slate-500">
            Login to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label>Email</label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="mt-2 w-full rounded-xl border p-3"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label>Password</label>

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
                })}
                className="w-full rounded-xl border p-3 pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4"
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

          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Signing in..."
              : "Login"}
          </button>
          <div className="mt-6 text-center text-sm text-slate-500">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="font-semibold text-blue-600 hover:text-blue-700"
  >
    Create an account
  </Link>
</div>
        </form>
      </div>
    </div>
  );
}