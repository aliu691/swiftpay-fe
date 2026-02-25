import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-20 bg-white border-b px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl w-[400px]">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search groups or transactions..."
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <Bell size={20} className="text-gray-500 cursor-pointer" />

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div>
            <p className="text-sm font-semibold">User</p>
            <p className="text-xs text-gray-500">Member</p>
          </div>
        </div>
      </div>
    </div>
  );
}
