import ClientNavBar from "../components/ClientNavBar"; 
import { DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
            Welcome, {user?.role === 'klient' ? 'Client' : 'User'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="bell">🔔</span>
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-colors"
            >
              <span role="img" aria-label="user">👤</span>
            </button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <DollarSign size={18} /> Earnings
            </div>
            <p className="text-2xl font-bold">$350.4</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <TrendingUp size={18} /> Spend this month
            </div>
            <p className="text-2xl font-bold">$642.39</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-4">
            <div className="flex items-center gap-2 text-green-600 font-semibold">
              <ShoppingBag size={18} /> Sales
            </div>
            <p className="text-2xl font-bold">$574.34</p>
            <p className="text-xs text-green-500">+23% vs last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Weekly Revenue */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Weekly Revenue</h2>
            <div className="h-48 flex items-center justify-center text-gray-400">
            </div>
          </div>

          {/* This Month Spending */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-semibold mb-4">This Month</h2>
            <p className="text-2xl font-bold">$37.5K</p>
            <p className="text-sm text-green-500">+2.45% On track</p>
            <div className="h-48 flex items-center justify-center text-gray-400">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
