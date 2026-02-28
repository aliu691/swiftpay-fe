import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserGroups, GroupStatus } from "../../api/user.api";
import { Link } from "react-router-dom";
import GroupCard from "../../components/groups/GroupCard";
import GroupCardSkeleton from "../../components/groups/GroupCardSkeleton";
import { ChevronDown } from "lucide-react";

export default function MyGroups() {
  const [status, setStatus] = useState<GroupStatus | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["user-groups", status],
    queryFn: () => getUserGroups(status || undefined),
  });

  const groups = data?.data.groups ?? [];

  const handleSelect = (value: GroupStatus) => {
    setStatus(value);
    setOpen(false);
  };

  const resetFilter = () => {
    setStatus(null);
  };

  return (
    <div className="space-y-10 relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Groups</h1>
          <p className="text-gray-500 mt-2">
            Manage and track your collective savings goals.
          </p>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Custom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white border border-gray-300 px-5 py-3 rounded-2xl shadow-sm hover:border-blue-500 transition"
            >
              <span className="text-sm text-gray-700">
                {status
                  ? status.charAt(0).toUpperCase() + status.slice(1)
                  : "Filter by"}
              </span>
              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute top-full mt-2 w-40 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
                {["active", "completed", "disbursed"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelect(item as GroupStatus)}
                    className="block w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {status && (
            <button
              onClick={resetFilter}
              className="text-sm text-gray-500 hover:text-red-500 transition"
            >
              Reset
            </button>
          )}

          <Link
            to="/groups/create"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-md"
          >
            + Create New Group
          </Link>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <GroupCardSkeleton />
          <GroupCardSkeleton />
          <GroupCardSkeleton />
        </div>
      )}

      {/* Groups */}
      {!isLoading && groups.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && groups.length === 0 && (
        <div className="border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center text-gray-500">
          <h3 className="text-xl font-semibold text-gray-700">
            No Groups Found
          </h3>
          <p className="mt-3">
            {status
              ? `No ${status} groups available.`
              : "You have not created or joined any groups yet."}
          </p>
        </div>
      )}
    </div>
  );
}
