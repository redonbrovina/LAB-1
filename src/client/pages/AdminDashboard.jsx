import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Settings, 
  ShoppingBag, 
  Package, 
  Calendar,
  Eye,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [trueApps, setTrueApps] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingApplications: 0
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const fetchApplications = async () => {
    try{
      console.log('Fetching applications...');
      const response = await apiGet("/aplikimi");
      console.log('All applications:', response);

      // Filter applications that are pending or have no status (treat as pending)
      const pendingApplications = response.filter((application) => 
        !application.statusi || application.statusi?.statusi === "pending"
      );
      const limitedData = pendingApplications.slice(0, 2);

      setTrueApps(pendingApplications);
      setApplications(limitedData);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  }

  const fetchDashboardStats = async () => {
    try {
      setStatsLoading(true);
      console.log('Fetching dashboard stats...');
      const response = await apiGet("/admin/dashboard-stats");
      console.log('Dashboard stats:', response);
      setDashboardStats(response);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Keep default values on error
    } finally {
      setStatsLoading(false);
    }
  }

  const fetchRecentOrders = async () => {
    try {
      const response = await apiGet("/porosite");
      const recent = response.slice(0, 5); // Get last 5 orders
      setRecentOrders(recent);
    } catch (error) {
      console.error('Error fetching recent orders:', error);
    }
  }

  const fetchTopProducts = async () => {
    try {
      const response = await apiGet("/produktet");
      const top = response.slice(0, 5); // Get top 5 products
      setTopProducts(top);
    } catch (error) {
      console.error('Error fetching top products:', error);
    }
  }

  useEffect(() => {
    fetchApplications();
    fetchDashboardStats();
    fetchRecentOrders();
    fetchTopProducts();
  }, []);

  const StatCard = ({ title, value, icon: Icon, change, changeType, subtitle }) => (
    <div className="bg-white shadow rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {statsLoading ? '...' : value}
          </p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          {changeType === 'increase' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        </div>
      )}
    </div>
  );

  const ChartCard = ({ title, subtitle, children, icon: Icon }) => (
    <div className="bg-white shadow rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-2 bg-gray-50 rounded-lg">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b rounded-lg">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Analytics & Overview</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  fetchApplications();
                  fetchDashboardStats();
                  fetchRecentOrders();
                  fetchTopProducts();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                🔄 Refresh Data
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <span role="img" aria-label="bell">🔔</span>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <span role="img" aria-label="user">👤</span>
              </button>
            </div>
          </div>
        </div>
      </div>
        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={dashboardStats.totalUsers.toLocaleString()}
            icon={Users}
            subtitle="Registered clients"
          />
          <StatCard
            title="Total Revenue"
            value={`€${dashboardStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            icon={DollarSign}
            subtitle="From all payments"
          />
          <StatCard
            title="Total Orders"
            value={dashboardStats.totalOrders.toLocaleString()}
            icon={ShoppingBag}
            subtitle="All orders"
          />
          <StatCard
            title="Products"
            value={dashboardStats.totalProducts.toLocaleString()}
            icon={Package}
            subtitle="Available products"
          />
        </div>

        {/* Applications and Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Applications */}
          <ChartCard title="Recent Applications" subtitle="Pending applications review" icon={Calendar}>
            <div className="space-y-3">
              {applications.length > 0 ? (
                applications.map((application, index) => (
                  <div key={application.aplikimiID || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{application.emri_kompanise}</p>
                      <p className="text-sm text-gray-500">{application.email}</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                      Pending
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No pending applications</p>
                </div>
              )}
            </div>
          </ChartCard>

          {/* Recent Orders */}
          <ChartCard title="Recent Orders" subtitle="Latest customer orders" icon={ShoppingBag}>
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order, index) => (
                  <div key={order.porosiaID || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order.porosiaID}</p>
                      <p className="text-sm text-gray-500">
                        {order.koha_krijimit ? new Date(order.koha_krijimit).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">€{order.cmimi_total || 0}</p>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                        {order.porosia_statusID === 2 ? 'Completed' : 'Processing'}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No recent orders</p>
                </div>
              )}
            </div>
          </ChartCard>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Status */}
          <ChartCard title="System Overview" subtitle="Current system status" icon={Settings}>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Database Status</span>
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">API Status</span>
                <span className="text-green-500 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Running
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Applications</span>
                <span className="text-yellow-500 font-semibold">{trueApps.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Orders</span>
                <span className="text-blue-500 font-semibold">{dashboardStats.totalOrders}</span>
              </div>
            </div>
          </ChartCard>

          {/* Quick Actions */}
          <ChartCard title="Quick Actions" subtitle="Common admin tasks" icon={Activity}>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/admin/applications')}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Review Applications</p>
                    <p className="text-sm text-gray-500">{trueApps.length} pending</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/admin/orders')}
                className="w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Orders</p>
                    <p className="text-sm text-gray-500">{dashboardStats.totalOrders} total</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => navigate('/admin/products')}
                className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Manage Products</p>
                    <p className="text-sm text-gray-500">{dashboardStats.totalProducts} available</p>
                  </div>
                </div>
              </button>
            </div>
          </ChartCard>
        </div>
    </div>
  );
}