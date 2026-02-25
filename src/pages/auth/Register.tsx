import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import AuthLayout from "../../components/AuthLayout";
import { register } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useContext(AuthContext);

  const navigate = useNavigate();

  // ✅ Email Validation Function
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    emailError === "";

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setLoading(true);

      const result = await register({ name, email, password });

      loginContext(result.data.accessToken, null);

      toast.success(result.message);

      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Registration failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>

      <p className="text-gray-500 mb-8 text-base">
        Join SwiftPay for seamless cross-border payments
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="relative mt-2">
            <User
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

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
              placeholder="name@example.com"
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
          <label className="text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="relative mt-2">
            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
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

          <p className="text-xs text-gray-400 mt-2">
            Must be at least 8 characters with numbers and symbols.
          </p>
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
              Creating...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <p className="text-sm text-center mt-8 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
