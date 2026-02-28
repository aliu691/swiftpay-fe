import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { verifyPayment } from "../api/payments.api";
import { getGroupDetails, getGroupContributions } from "../api/group.api";
import { useAuth } from "../hooks/useAuth";

export default function PaymentCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const reference = searchParams.get("reference");

  const [goalReached, setGoalReached] = useState(false);
  const [isCreator, setIsCreator] = useState(false);

  const { data } = useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: () => verifyPayment(reference!),
    enabled: !!reference,
    retry: 3,
    retryDelay: 1500,
  });

  const status = data?.data?.status;
  const groupId = data?.data?.groupId;

  useEffect(() => {
    if (!reference) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (status === "success" && groupId) {
      const refetchData = async () => {
        // 🔥 FORCE REFETCH
        const details = await queryClient.fetchQuery({
          queryKey: ["group-details", groupId],
          queryFn: () => getGroupDetails(groupId),
        });

        const contributions = await queryClient.fetchQuery({
          queryKey: ["group-contributions", groupId],
          queryFn: () => getGroupContributions(groupId),
        });

        const total = contributions.data.totalContributed ?? 0;
        const target = details.data.targetAmount ?? 0;

        const creatorId = details.data.createdBy.id;

        if (total >= target) {
          setGoalReached(true);
        }

        if (creatorId === user?.id) {
          setIsCreator(true);
        }

        // Delay so animation can be seen
        setTimeout(
          () => {
            navigate(`/groups/${groupId}`, { replace: true });
          },
          total >= target ? 2500 : 1500
        );
      };

      refetchData();
    }

    if (status === "failed") {
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    }
  }, [status, groupId, reference, navigate, queryClient, user]);

  /* =========================
     SUCCESS + GOAL REACHED
  ========================= */

  if (status === "success" && goalReached) {
    return (
      <CenteredCard
        icon={
          <Trophy
            size={70}
            className="text-yellow-500 mx-auto animate-bounce"
          />
        }
        title="🎉 Goal Reached!"
        subtitle={
          isCreator
            ? "Your group has reached its target. You can now request payout."
            : "This group has reached its savings goal!"
        }
      />
    );
  }

  /* =========================
     SUCCESS NORMAL
  ========================= */

  if (status === "success") {
    return (
      <CenteredCard
        icon={<CheckCircle2 size={60} className="text-green-500 mx-auto" />}
        title="Payment Successful 🎉"
        subtitle="Updating group data..."
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
     LOADING
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
