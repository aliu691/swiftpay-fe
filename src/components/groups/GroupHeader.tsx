import { Link } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import { useAuth } from "../../hooks/useAuth";
import { User, Group, Banknote } from "lucide-react";

interface Props {
  group: any;
  showPayout: boolean;
  onPayout: () => void;
  isProcessing: boolean;
  onContribute: () => void;
}

export default function GroupHeader({
  group,
  showPayout,
  onPayout,
  isProcessing,
  onContribute,
}: Props) {
  const { user } = useAuth();
  const isCreator = user?.email === group.createdBy.email;

  const formattedDate = new Date(group.createdAt).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  const canContribute = group.status === "active";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
        <Link
          to="/groups"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to My Groups
        </Link>
        <span>/</span>
        <span className="text-gray-700 truncate">{group.name}</span>
      </div>

      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Section */}
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
            <Group className="text-white" size={28} />
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                {group.name}
              </h1>

              <StatusBadge status={group.status} />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-500 mt-3 text-sm sm:text-base">
              <User size={16} />
              <span>
                Created by{" "}
                <span className="font-medium text-gray-700">
                  {isCreator ? "Me" : group.createdBy.name}
                </span>
              </span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Right Section Buttons */}
        <div className="flex gap-4 flex-wrap">
          {canContribute && (
            <button
              onClick={onContribute}
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Banknote size={18} />
              Contribute
            </button>
          )}

          {showPayout && (
            <button
              onClick={onPayout}
              disabled={isProcessing}
              className="bg-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Payout Group"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
