import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import { login } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();

  const navigate = useNavigate();

  // Email validation
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && emailError === "";

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setLoading(true);

      const result = await login({ email, password });

      // 🔥 Use context login
      loginContext(result.data.accessToken);

      toast.success(result.message);

      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>

      <p className="text-gray-500 mb-8 text-base">
        Please enter your details to sign in to your account.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="relative mt-2">
            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl focus:ring-2 focus:outline-none transition
              ${
                emailError
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
          </div>

          {emailError && (
            <p className="text-sm text-red-500 mt-2">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => navigate("/request-reset")}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative mt-2">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
          <span className="text-sm text-gray-600">Remember me for 30 days</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition
          ${
            isFormValid && !loading
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <p className="text-sm text-center mt-8 text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 font-medium hover:underline"
        >
          Create a new account
        </Link>
      </p>
    </AuthLayout>
  );
}
