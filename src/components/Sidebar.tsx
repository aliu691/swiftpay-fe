import {
  LayoutDashboard,
  Users,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "./Logo";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition";

  const activeItem =
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md";

  return (
    <aside className="w-72 bg-white border-r flex flex-col justify-between p-6">
      <div>
        {/* Logo */}
        <div className="mb-12">
          <Logo size="lg" />
          <p className="text-sm text-gray-500 mt-1">Collaborative Savings</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/groups"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <Users size={18} />
            My Groups
          </NavLink>

          <NavLink
            to="/groups/create"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <PlusCircle size={18} />
            Create Group
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : ""}`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
