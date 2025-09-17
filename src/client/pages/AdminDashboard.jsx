import { DollarSign, TrendingUp, Users, Settings } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#FEF2F2" }}>
      <div className="w-64 bg-red-600 text-white p-6">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 bg-red-700 rounded-lg">
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg">
            Applications
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg">
            Orders
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg">
            Products
          </button>
          <button 
            onClick={() => navigate('/admin-payments')}
            className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg"
          >
            Payments
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg">
            Users
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-red-700 rounded-lg">
            Settings
          </button>
        </nav>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
            Welcome, Admin {user?.id}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="bell">🔔</span>
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="user">👤</span>
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Users size={18} /> Total Users
            </div>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-xs text-green-500">+12% this month</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <TrendingUp size={18} /> Pending Applications
            </div>
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-orange-500">Needs review</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <DollarSign size={18} /> Revenue
            </div>
            <p className="text-2xl font-bold">$45.2K</p>
            <p className="text-xs text-green-500">+8% vs last month</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Settings size={18} /> System Status
            </div>
            <p className="text-2xl font-bold text-green-500">Online</p>
            <p className="text-xs text-gray-500">All systems operational</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Applications */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-red-600">Recent Applications</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Albania Foods Shpk</p>
                  <p className="text-sm text-gray-500">contact@albaniafoods.com</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Pharma Plus</p>
                  <p className="text-sm text-gray-500">info@pharmaplus.com</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Approved</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-red-600">System Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Database Status</span>
                <span className="text-green-500">✓ Connected</span>
              </div>
              <div className="flex justify-between">
                <span>API Status</span>
                <span className="text-green-500">✓ Running</span>
              </div>
              <div className="flex justify-between">
                <span>Server Load</span>
                <span className="text-yellow-500">45%</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup</span>
                <span className="text-gray-500">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
