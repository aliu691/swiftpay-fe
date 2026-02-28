import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { verifyPayment } from "../api/payments.api";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const { data, isLoading } = useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference!),
    enabled: !!reference,
    retry: 3, // retry to avoid webhook race condition
    retryDelay: 1500,
  });

  const status = data?.data?.status;

  useEffect(() => {
    if (!reference) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (status === "success") {
      setTimeout(() => {
        navigate(`/groups/${data!.data.groupId}`, { replace: true });
      }, 1500);
    }

    if (status === "failed") {
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    }
  }, [status, data, reference, navigate]);

  /* =========================
     SUCCESS
  ========================= */

  if (status === "success") {
    return (
      <CenteredCard
        icon={<CheckCircle2 size={60} className="text-green-500 mx-auto" />}
        title="Payment Successful 🎉"
        subtitle="Redirecting you back to your group..."
      />
    );
  }

  /* =========================
     FAILURE
  ========================= */

  if (status === "failed") {
    return (
      <CenteredCard
        icon={<XCircle size={60} className="text-red-500 mx-auto" />}
        title="Payment Failed"
        subtitle="Redirecting..."
      />
    );
  }

  /* =========================
     LOADING (DEFAULT STATE)
  ========================= */

  return (
    <CenteredCard
      icon={
        <Loader2 size={48} className="animate-spin text-blue-600 mx-auto" />
      }
      title="Verifying Payment..."
      subtitle="Please wait while we confirm your transaction."
    />
  );
}

/* ======================================
   Reusable UI Wrapper
====================================== */

function CenteredCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-12 rounded-3xl shadow-lg text-center space-y-6 animate-fadeIn">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
