import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getGroupDetails,
  getGroupContributions,
  payoutGroup,
} from "../../api/group.api";
import { useAuth } from "../../hooks/useAuth";

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

export default function GroupDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

  const payoutMutation = useMutation({
    mutationFn: () => payoutGroup(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group-details", id] });
      queryClient.invalidateQueries({ queryKey: ["group-contributions", id] });
    },
  });

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

  const group = detailsData?.data;
  const contributions = contributionsData?.data;

  const isCreator = group?.createdBy.id === user?.id;
  const isComplete =
    (contributions?.totalContributed ?? 0) >= (group?.targetAmount ?? 0);

  const canPayout = isCreator && isComplete && group?.status !== "disbursed";

  return (
    <div className="space-y-8 sm:space-y-10 px-4 sm:px-0">
      <GroupHeader
        group={group}
        showPayout={canPayout}
        onPayout={() => payoutMutation.mutate()}
        isProcessing={payoutMutation.isPending}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <GroupProgressCard
          totalContributed={contributions?.totalContributed ?? 0}
          targetAmount={group?.targetAmount ?? 0}
          status={group?.status}
        />

        <GroupInsightsCard
          members={group?.members ?? []}
          invites={group?.invites ?? []}
          createdAt={group?.createdAt ?? ""}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <ContributionsTable
          contributions={contributions?.contributions ?? []}
        />

        <MembersCard
          members={group?.members ?? []}
          createdById={group?.createdBy.id ?? ""}
        />
      </div>
    </div>
  );
}
