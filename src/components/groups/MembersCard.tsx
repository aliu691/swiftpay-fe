import { Users } from "lucide-react";

interface Props {
  members: {
    id: string;
    name: string;
    email: string;
  }[];
  createdById: string;
}

export default function MembersCard({ members, createdById }: Props) {
  return (
    <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 overflow-hidden">
      <div className="flex items-center gap-3 p-5 sm:p-6">
        <Users size={20} className="text-gray-900" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          Members ({members.length})
        </h3>
      </div>

      <div className="border-t border-gray-200" />

      <div className="divide-y divide-gray-100">
        {members.map((member) => {
          const isAdmin = member.id === createdById;

          return (
            <div key={member.id} className="flex items-center gap-4 p-5 sm:p-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-lg font-semibold text-gray-700">
                {member.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                  {member.name}
                </p>

                <p className="text-sm sm:text-md text-gray-500 truncate">
                  {member.email}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
