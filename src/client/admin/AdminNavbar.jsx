import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, ShoppingBag, Package, Users, Settings, DollarSign } from "lucide-react";
import { useAuth } from "../utils/AuthContext";

export default function AdminNavbar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "flex items-center gap-2 text-white font-semibold bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
      : "flex items-center gap-2 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200";
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-red-600 text-white flex flex-col z-10">
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-6 space-y-4">
        <Link to="/admin" className={getLinkClass("/admin")}>
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link to="/admin/applications" className={getLinkClass("/admin/applications")}>
          <FileText size={18} />
          Applications
        </Link>

        <Link to="/admin/orders" className={getLinkClass("/admin/orders")}>
          <ShoppingBag size={18} />
          Orders
        </Link>

        <Link to="/admin/carts" className={getLinkClass("/admin/carts")}>
          <ShoppingBag size={18} />
          Carts
        </Link>

        <Link to="/admin/products" className={getLinkClass("/admin/products")}>
          <Package size={18} />
          Products
        </Link>

        <Link to="/admin/payments" className={getLinkClass("/admin/payments")}>
          <DollarSign size={18} />
          Payments
        </Link>

        <Link to="/admin/users" className={getLinkClass("/admin/users")}>
          <Users size={18} />
          Users
        </Link>

        <Link to="/admin/settings" className={getLinkClass("/admin/settings")}>
          <Settings size={18} />
          Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="px-4 ml-2 mt-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
        Logout
        </button>
      </nav>
    </div>
  );
}
