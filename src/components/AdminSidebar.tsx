import {
  LayoutDashboard,
  CreditCard,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Logo from "../components/Logo";

interface Props {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: Props) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/login");
  };

  const baseItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 transition-all duration-200";

  const inactiveItem = "hover:bg-blue-50 hover:text-blue-600";

  const activeItem =
    "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md";

  return (
    <aside className="w-72 h-screen bg-white border-2 border-gray-200 flex flex-col">
      {/* Top Section */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        {/* Logo */}
        <div className="mb-12">
          <Logo size="md" />
          <p className="text-sm text-gray-500 mt-1">Admin Control Panel</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `${baseItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/payments"
            onClick={onClose}
            className={({ isActive }) =>
              `${baseItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <CreditCard size={18} />
            Payments
          </NavLink>

          <NavLink
            to="/admin/ledger"
            onClick={onClose}
            className={({ isActive }) =>
              `${baseItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <BookOpen size={18} />
            Ledger
          </NavLink>

          <NavLink
            to="/admin/users"
            onClick={onClose}
            className={({ isActive }) =>
              `${baseItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <Users size={18} />
            Users
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t-2 border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-700 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
