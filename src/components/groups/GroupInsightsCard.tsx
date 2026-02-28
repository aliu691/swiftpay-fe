import AnimatedNumber from "../dashboard/AnimatedNumber";

interface Props {
  members: any[];
  invites: any[];
  createdAt: string;
}

export default function GroupInsightsCard({
  members,
  invites,
  createdAt,
}: Props) {
  const accepted = invites.filter(
    (i) => i.status.toLowerCase() === "accepted"
  ).length;

  const daysSinceCreated = Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-gray-200 space-y-8">
      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-700">Group Insights</h3>

      {/* Active Members */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-base">Active Members</span>
        <span className="text-2xl font-bold text-gray-900">
          <AnimatedNumber value={members.length} />
        </span>
      </div>

      {/* Accepted Invites */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-base">Accepted Invites</span>
        <span className="text-2xl font-bold text-gray-900">
          <AnimatedNumber value={accepted} />
        </span>
      </div>

      {/* Days Since Created */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-base">Days Since Created</span>
        <span className="text-2xl font-bold text-gray-900">
          <AnimatedNumber value={daysSinceCreated} />{" "}
          <span className="text-lg font-medium text-gray-700">days</span>
        </span>
      </div>
    </div>
  );
}
