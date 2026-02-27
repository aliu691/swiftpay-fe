import { Search, Bell, Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  onMenuClick?: () => void;
}

export default function Topbar({ onMenuClick }: Props) {
  const { user } = useAuth();

  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="h-20 bg-white border-b-2 border-gray-200 px-4 md:px-8 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button onClick={onMenuClick} className="lg:hidden text-gray-600">
          <Menu size={24} />
        </button>

        {/* Search (Desktop only) */}
        <div className="hidden md:flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl w-[400px] max-w-full">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search groups or transactions..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 md:gap-6">
        <Bell size={20} className="text-gray-500" />

        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-semibold shadow-md">
            {initials}
          </div>

          {/* Hide name/email on very small screens */}
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[140px]">
              {user?.email ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
