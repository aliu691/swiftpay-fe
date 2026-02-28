import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGroupDetails,
  getGroupContributions,
  payoutGroup,
  contribute,
} from "../../api/group.api";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import GroupHeader from "../../components/groups/GroupHeader";
import GroupProgressCard from "../../components/groups/GroupProgressCard";
import GroupInsightsCard from "../../components/groups/GroupInsightsCard";
import ContributionsTable from "../../components/groups/ContributionsTable";
import MembersCard from "../../components/groups/MembersCard";
import { GroupHeaderSkeleton } from "../../components/groups/skeletons/GroupHeaderSkeleton";
import { GroupProgressCardSkeleton } from "../../components/groups/skeletons/GroupProgressCardSkeleton";
import { GroupInsightsCardSkeleton } from "../../components/groups/skeletons/GroupInsightsCardSkeleton";
import { ContributionsTableSkeleton } from "../../components/groups/skeletons/ContributionsTableSkeleton";
import { MembersCardSkeleton } from "../../components/groups/skeletons/MembersCardSkeleton";
import ContributeModal from "../../components/groups/ContributeModal";

export default function GroupDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===============================
     FETCH DATA
  =============================== */

  const { data: detailsData, isLoading: detailsLoading } = useQuery({
    queryKey: ["group-details", id],
    queryFn: () => getGroupDetails(id!),
    enabled: !!id,
  });

  const { data: contributionsData, isLoading: contributionsLoading } = useQuery(
    {
      queryKey: ["group-contributions", id],
      queryFn: () => getGroupContributions(id!),
      enabled: !!id,
    }
  );

  /* ===============================
     PAYOUT MUTATION
  =============================== */

  const payoutMutation = useMutation({
    mutationFn: () => payoutGroup(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group-details", id] });
      queryClient.invalidateQueries({
        queryKey: ["group-contributions", id],
      });

      toast.success("Group successfully paid out");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Payout failed";

      toast.error(message);
    },
  });

  /* ===============================
     CONTRIBUTE MUTATION
  =============================== */

  const contributeMutation = useMutation({
    mutationFn: (amount: number) => contribute(id!, amount),
    onSuccess: (res) => {
      // 🔥 Redirect to Paystack
      window.location.href = res.data.authorizationUrl;
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to initialize payment";

      toast.error(message);
    },
  });

  /* ===============================
     HANDLE CONTRIBUTE CLICK
  =============================== */

  const handleContribute = () => {
    setIsModalOpen(true);
  };

  const handleSubmitContribution = (amount: number) => {
    contributeMutation.mutate(amount);
  };

  /* ===============================
     HANDLE PAYSTACK RETURN
  =============================== */

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");

    if (reference) {
      toast.success("Payment processing...");

      queryClient.invalidateQueries({ queryKey: ["group-details", id] });
      queryClient.invalidateQueries({
        queryKey: ["group-contributions", id],
      });

      // Remove reference from URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.search]);

  /* ===============================
     LOADING STATE
  =============================== */

  if (detailsLoading || contributionsLoading) {
    return (
      <div className="space-y-8 sm:space-y-10 px-4 sm:px-0">
        <GroupHeaderSkeleton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <GroupProgressCardSkeleton />
          <GroupInsightsCardSkeleton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <ContributionsTableSkeleton />
          <MembersCardSkeleton />
        </div>
      </div>
    );
  }

  /* ===============================
     DATA
  =============================== */

  const group = detailsData?.data;
  const contributions = contributionsData?.data;

  if (!group) return null;

  const isCreator = group.createdBy.id === user?.id;
  const isComplete =
    (contributions?.totalContributed ?? 0) >= (group?.targetAmount ?? 0);

  const canPayout = isCreator && isComplete && group.status !== "disbursed";

  const totalContributed = contributions?.totalContributed ?? 0;
  const targetAmount = group?.targetAmount ?? 0;
  const remainingAmount = Math.max(targetAmount - totalContributed, 0);

  /* ===============================
     UI
  =============================== */

  return (
    <div className="space-y-8 sm:space-y-10 px-4 sm:px-0">
      <GroupHeader
        group={group}
        showPayout={canPayout}
        onPayout={() => payoutMutation.mutate()}
        isProcessing={payoutMutation.isPending}
        onContribute={handleContribute}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <GroupProgressCard
          totalContributed={contributions?.totalContributed ?? 0}
          targetAmount={group?.targetAmount ?? 0}
          status={group.status}
        />

        <GroupInsightsCard
          members={group.members ?? []}
          invites={group.invites ?? []}
          createdAt={group.createdAt ?? ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <ContributionsTable
          contributions={contributions?.contributions ?? []}
        />

        <MembersCard
          members={group.members ?? []}
          createdById={group.createdBy.id}
        />
      </div>
      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitContribution}
        isProcessing={contributeMutation.isPending}
        remainingAmount={remainingAmount}
      />
    </div>
  );
}
