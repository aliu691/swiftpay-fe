import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (!loading && !user && !toastShownRef.current) {
      if (location.pathname.startsWith("/join")) {
        toast("Please login to accept this invitation.", {
          icon: "🔐",
        });
        toastShownRef.current = true;
      }
    }
  }, [user, loading, location.pathname]);

  // 🔥 Wait for hydration to finish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={36} className="animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
