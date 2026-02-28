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
      {/* Header */}
      <div className="flex items-center gap-3 p-6">
        <Users size={20} className="text-gray-900" />
        <h3 className="text-xl font-semibold text-gray-900">
          Members ({members.length})
        </h3>
      </div>

      <div className="border-t border-gray-200" />

      {/* Members List */}
      <div className="divide-y divide-gray-100">
        {members.map((member) => {
          const isAdmin = member.id === createdById;

          return (
            <div
              key={member.id}
              className="flex items-center justify-between p-6"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                {/* Name + Role */}
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </p>

                  <p className="text-md text-gray-500">{member.email}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
