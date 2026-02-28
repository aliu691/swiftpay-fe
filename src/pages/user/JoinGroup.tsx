import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getInvitePreview, joinGroup } from "../../api/group.api";
import { toast } from "react-hot-toast";
import {
  Banknote,
  CheckCircle2,
  Loader2,
  Plus,
  Target,
  TrendingUp,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Feature } from "../../components/groups/Feature";

export default function JoinGroup() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [accepted, setAccepted] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);

  /* ===============================
     FETCH INVITE PREVIEW
  =============================== */

  const { data, isLoading, isError } = useQuery({
    queryKey: ["invite-preview", token],
    queryFn: () => getInvitePreview(token!),
    retry: false,
  });

  /* ===============================
     CONFETTI
  =============================== */

  const launchConfetti = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  /* ===============================
     JOIN MUTATION
  =============================== */

  const mutation = useMutation({
    mutationFn: () => joinGroup(token!),
    onSuccess: (res) => {
      setAccepted(true);
      launchConfetti();
      toast.success(res.message);

      setTimeout(() => {
        navigate(`/groups/${res.data.groupId}`, { replace: true });
      }, 2000);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to join group";

      toast.error(message);
    },
  });

  /* ===============================
     Animate Progress
  =============================== */

  useEffect(() => {
    if (data?.data?.percentage !== undefined) {
      setTimeout(() => {
        setProgressWidth(data.data.percentage);
      }, 200);
    }
  }, [data]);

  /* ===============================
     SKELETON LOADING
  =============================== */

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 animate-pulse space-y-6">
        <div className="h-56 bg-gray-200 rounded-2xl" />
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  /* ===============================
     INVALID / EXPIRED
  =============================== */

  if (isError || !data?.data) {
    return (
      <div className="max-w-3xl mx-auto py-24 px-4 text-center animate-fadeIn">
        <h2 className="text-3xl font-bold text-gray-900">
          This invitation is no longer valid
        </h2>
        <p className="text-gray-500 mt-4">
          The link may have expired or already been used.
        </p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const { groupName, targetAmount, totalContributed, percentage, createdBy } =
    data.data;

  /* ===============================
     SUCCESS SCREEN
  =============================== */

  if (accepted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 animate-fadeIn">
        <CheckCircle2 size={90} className="text-green-500 animate-scaleIn" />
        <h3 className="text-3xl font-bold mt-6 text-gray-900">
          Successfully Joined!
        </h3>
        <p className="text-gray-500 mt-2">Redirecting you to the group...</p>
      </div>
    );
  }

  /* ===============================
     MAIN UI
  =============================== */

  return (
    <div className="max-w-6xl mx-auto py-10 sm:py-16 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* HERO */}
      <div className="relative rounded-2xl overflow-hidden h-[180px] sm:h-[280px] shadow-md">
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="banner"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45 flex items-end px-6 sm:px-12 pb-6 sm:pb-10">
          <div>
            <span className="bg-blue-600 text-white text-xs sm:text-sm px-4 py-1.5 rounded-full font-semibold">
              INVITATION
            </span>

            <h1 className="text-2xl sm:text-5xl font-bold text-white mt-4">
              {groupName}
            </h1>
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 sm:p-12 space-y-8">
        {/* Header */}
        <div className="flex gap-4 sm:gap-8 items-start sm:items-center">
          <div className="w-16 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-full bg-gray-200 flex items-center justify-center text-xl sm:text-3xl font-bold text-gray-700">
            {createdBy.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              You're invited to join!
            </h2>

            <p className="text-gray-600 mt-1">
              Created by{" "}
              <span className="font-semibold text-blue-600">{createdBy}</span>
            </p>

            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm sm:text-base">
              <Target size={16} />
              Target: ₦{targetAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <p className="text-gray-500 font-medium text-sm sm:text-base">
            Current Progress
          </p>

          <div className="flex justify-between items-end mt-2">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900">
              ₦{totalContributed.toLocaleString()}
              <span className="text-gray-500 text-sm sm:text-lg font-medium ml-2">
                raised
              </span>
            </h3>

            <span className="text-blue-600 text-xl sm:text-2xl font-bold">
              {percentage.toFixed(0)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 overflow-hidden mt-4">
            <div
              className="h-3 sm:h-4 bg-blue-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          {totalContributed === 0 && (
            <p className="text-gray-500 italic mt-4 text-sm sm:text-base">
              Be the first to contribute to this fund!
            </p>
          )}
        </div>

        {/* Join Button */}
        <button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-lg transition-all bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:opacity-50"
        >
          {mutation.isPending ? "Joining..." : "Join this Group"}
        </button>

        <p className="text-center text-gray-400 text-xs sm:text-sm">
          By joining, you agree to SwiftPay's Terms of Service.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div className="text-center space-y-12">
        <h3 className="text-3xl font-bold text-gray-900">How SwiftPay Works</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <Feature
            icon={<Plus />}
            title="Create"
            desc="Set a goal and target amount for any event."
          />
          <Feature
            icon={<UserPlus />}
            title="Invite"
            desc="Share your group link with friends and family."
          />
          <Feature
            icon={<Banknote />}
            title="Contribute"
            desc="Securely pay into the fund using multiple options."
          />
          <Feature
            icon={<TrendingUp />}
            title="Track"
            desc="Monitor progress in real-time until the goal is met."
          />
        </div>
      </div>
    </div>
  );
}
