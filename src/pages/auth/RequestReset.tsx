import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../../api";
import { toast } from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail) return;

    try {
      setLoading(true);

      const response = await requestPasswordReset({ email });

      toast.success(response.message || "Reset link sent");

      localStorage.setItem("reset_email", email);
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold">Reset Password</h1>

        <p className="text-gray-500">
          Enter the email associated with your account and we'll send you a link
          to reset your password.
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>

          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isValidEmail && email && (
            <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValidEmail || loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-blue-600 text-sm"
        >
          <ArrowLeft size={16} />
          Back to Login
        </button>
      </form>
    </AuthLayout>
  );
}
