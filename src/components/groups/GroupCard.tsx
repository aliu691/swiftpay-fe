import { Link } from "react-router-dom";
import { Calendar, User, Banknote } from "lucide-react";
import { UserGroup } from "../../api/user.api";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../StatusBadge";
import bgImage from "../../assets/bg.jpg";

interface Props {
  group: UserGroup;
}

export default function GroupCard({ group }: Props) {
  const { user } = useAuth();
  const isCreator = group.createdBy?.id === user?.id;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
      {/* Cover Image */}
      <div
        className="h-48 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Soft Overlay */}
        <div className="absolute inset-0 backdrop-blur-[2px] bg-black/5" />

        <StatusBadge status={group.status} className="absolute top-4 left-4" />
      </div>

      <div className="p-8">
        {/* Title + Target */}
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
            {group.name}
          </h2>

          <span className="font-semibold text-gray-900">
            ₦{group.targetAmount.toLocaleString()}
          </span>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 mt-6 text-gray-500">
          <User size={18} />
          <span>
            By{" "}
            <span className="font-semibold text-gray-600">
              {isCreator ? "Me" : group.createdBy?.name}
            </span>
          </span>
        </div>

        {/* Completed */}
        {group.completedAt && (
          <div className="flex items-center gap-2 mt-4 text-gray-500">
            <Calendar size={18} />
            Completed: {new Date(group.completedAt).toLocaleDateString()}
          </div>
        )}

        {/* Disbursed */}
        {group.disbursedAt && (
          <div className="flex items-center gap-2 mt-4 text-gray-500">
            <Banknote size={18} />
            Disbursed: {new Date(group.disbursedAt).toLocaleDateString()}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <Link
            to={`/groups/${group.id}`}
            className="text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
