import { useState, useMemo } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Wallet,
  Calendar,
  Users,
  RefreshCcw,
  Landmark,
  FolderPlus,
} from "lucide-react";
import { getUserDashboard } from "../../api";
import EmptyState from "../../components/dashboard/EmptyState";
import GroupsSummaryCard from "../../components/dashboard/GroupsSummaryCard";
import StatsCard from "../../components/dashboard/StatsCard";
import StatsCardSkeleton from "../../components/dashboard/StatsCardSkeleton";
import UpgradeCard from "../../components/dashboard/UpgradeCard";
import { useQuery } from "@tanstack/react-query";

function getCurrentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
}

export default function Dashboard() {
  const today = new Date().toISOString().split("T")[0];

  // 👇 Applied range (used by query)
  const [appliedRange, setAppliedRange] = useState(getCurrentMonthRange());

  // 👇 Draft range (used by picker only)
  const [draftRange, setDraftRange] = useState(appliedRange);

  const [showPicker, setShowPicker] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard", appliedRange],
    queryFn: () => getUserDashboard(appliedRange),
  });

  const dashboard = data?.data;

  const successful = dashboard?.successfulContributions ?? 0;
  const failed = dashboard?.failedContributions ?? 0;
  const totalAttempts = successful + failed;

  const successRate =
    totalAttempts > 0 ? Math.round((successful / totalAttempts) * 100) : 0;

  const formattedRange = useMemo(() => {
    if (!appliedRange.startDate || !appliedRange.endDate)
      return "Current Period";

    const start = new Date(appliedRange.startDate).toLocaleDateString();
    const end = new Date(appliedRange.endDate).toLocaleDateString();

    return `${start} - ${end}`;
  }, [appliedRange]);

  if (isLoading) {
    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Savings Overview</h1>

          <p className="text-gray-500 mt-2">
            You currently have {dashboard?.completedGroups ?? 0} completed group
            cycle and have donated ₦
            {dashboard?.totalDonated?.toLocaleString() ?? 0}.
          </p>
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => {
              setDraftRange(appliedRange); // sync before opening
              setShowPicker(!showPicker);
            }}
            className="flex items-center gap-3 bg-white border-2 border-gray-200 px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <Calendar size={18} className="text-gray-500" />
            <span className="text-sm text-gray-500">{formattedRange}</span>
          </button>

          {showPicker && (
            <div className="absolute top-16 right-0 bg-white border rounded-2xl shadow-xl p-6 w-80 z-50">
              <div className="space-y-4">
                {/* Start Date */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Start Date
                  </label>
                  <input
                    type="date"
                    max={today}
                    value={draftRange.startDate}
                    onChange={(e) =>
                      setDraftRange((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                        endDate:
                          prev.endDate < e.target.value
                            ? e.target.value
                            : prev.endDate,
                      }))
                    }
                    className="w-full mt-2 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    End Date
                  </label>
                  <input
                    type="date"
                    min={draftRange.startDate}
                    max={today}
                    value={draftRange.endDate}
                    onChange={(e) =>
                      setDraftRange((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full mt-2 border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => {
                      const reset = getCurrentMonthRange();
                      setDraftRange(reset);
                      setAppliedRange(reset);
                      setShowPicker(false);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => {
                      setAppliedRange(draftRange); // 🔥 ONLY NOW query refetches
                      setShowPicker(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Donated"
          value={dashboard?.totalDonated ?? 0}
          prefix="₦"
          icon={<Wallet className="text-green-600" />}
          badge={`${successRate}%`}
          badgeColor="green"
          iconBgClassName="bg-green-50"
        />

        <StatsCard
          title="Successful Contributions"
          value={successful}
          subtitle={`${successRate}% success rate`}
          badgeColor="blue"
          iconBgClassName="bg-blue-50"
          icon={<CheckCircle2 className="text-blue-600" />}
        />

        <StatsCard
          title="Failed Contributions"
          value={failed}
          subtitle={failed > 0 ? "Needs attention" : "No failed transactions"}
          badgeColor="red"
          iconBgClassName="bg-red-50"
          icon={<AlertCircle className="text-red-600" />}
        />
      </div>

      {/* Groups + Upgrade */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Groups Overview
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <GroupsSummaryCard
              label="Joined"
              value={`${dashboard?.totalGroupsJoined ?? 0}`}
              icon={<Users className="text-blue-600" size={20} />}
            />
            <GroupsSummaryCard
              label="Active"
              value={`${dashboard?.activeGroups ?? 0}`}
              icon={<RefreshCcw className="text-indigo-600" size={20} />}
            />
            <GroupsSummaryCard
              label="Completed"
              value={`${dashboard?.completedGroups ?? 0}`}
              icon={<CheckCircle2 className="text-emerald-600" size={20} />}
            />
            <GroupsSummaryCard
              label="Disbursed"
              value={`${dashboard?.disbursedGroups ?? 0}`}
              icon={<Landmark className="text-green-700" size={20} />}
              color="green"
            />
            <GroupsSummaryCard
              label="Created"
              value={`${dashboard?.groupsCreated ?? 0}`}
              icon={<FolderPlus className="text-gray-600" size={20} />}
            />
          </div>

          {dashboard?.activeGroups === 0 && <EmptyState />}
        </div>

        <div>
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
