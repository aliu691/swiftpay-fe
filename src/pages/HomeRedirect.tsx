import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function HomeRedirect() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // 🔥 Wait for auth hydration
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-blue-600" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 IMPORTANT: If we were redirected here from another page (like /join)
  const from = location.state?.from?.pathname;

  if (from && from !== "/") {
    return <Navigate to={from} replace />;
  }

  // Role-based routing fallback
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
}
