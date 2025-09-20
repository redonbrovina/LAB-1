import { DollarSign, TrendingUp, Users, Settings } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../utils/api";
import { useState, useEffect } from "react";


export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [trueApps, setTrueApps] = useState([]);

  const fetchApplications = async () => {
    try{
      console.log('Fetching applications...');
      const response = await apiGet("/aplikimi");
      console.log('All applications:', response);

      const pendingApplications = response.filter((application) => application.statusi?.statusi === "pending");
      const limitedData = pendingApplications.slice(0, 2);

      setTrueApps(pendingApplications);
      setApplications(limitedData);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setApplications([]);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
      <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={fetchApplications}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                🔄 Refresh Applications
              </button>
              <button className="p-2 rounded-full bg-white shadow">
                <span role="img" aria-label="bell">🔔</span>
              </button>
              <button className="p-2 rounded-full bg-white shadow">
                <span role="img" aria-label="user">👤</span>
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
            <p className="text-2xl font-bold">{trueApps.length}</p>
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
              <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="font-semibold mb-4 text-red-600">Recent Applications</h2>
                <div className="space-y-3">
                  {applications.length > 0 ? (
                    applications.map((application, index) => (
                      <div key={application.aplikimiID || index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{application.emri_kompanise}</p>
                          <p className="text-sm text-gray-500">{application.email}</p>
                        </div>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                          Pending
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-between items-center p-3 rounded-lg">
                      <p className="text-sm">No pending applications</p>
                    </div>
                  )}
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
    );
}