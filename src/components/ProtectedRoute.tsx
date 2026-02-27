import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { token, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
