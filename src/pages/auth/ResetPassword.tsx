import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api";
import { toast } from "react-hot-toast";
import AuthLayout from "../../components/AuthLayout";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = password.length >= 8 && password === confirm;

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || !token) return;

    try {
      setLoading(true);

      const response = await resetPassword({
        token,
        newPassword: password,
      });

      toast.success(response.message || "Password updated");

      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold">Reset Password</h1>

        <p className="text-gray-500">
          Choose a strong password to protect your account.
        </p>

        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="w-full pr-12 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm Password
          </label>

          <input
            type={show ? "text" : "password"}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          {confirm && confirm !== password && (
            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {/* 🔥 Change Email Button */}
        <button
          type="button"
          onClick={() => navigate("/request-reset")}
          className="text-blue-600 text-sm"
        >
          Change email?
        </button>
      </form>
    </AuthLayout>
  );
}
