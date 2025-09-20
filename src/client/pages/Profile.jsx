import ClientNavBar from "../components/ClientNavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { clientAPI } from "../utils/api";

export default function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    if (user && user.id) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await clientAPI.getById(user.id);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    try {
      await clientAPI.changePassword(user.id, {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error.message || 'Failed to change password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <p style={{ color: "#808080" }}>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchUserData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#808080" }}>
          Profile
        </h1>

        <div className="max-w-2xl space-y-6">
          {/* User Information */}
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="font-semibold mb-4 text-lg" style={{ color: "#808080" }}>
              Company Information
            </h2>
            <div className="space-y-3">
              <p style={{ color: "#808080" }}>
                <strong>Company Name:</strong> {userData?.emri_kompanise || 'N/A'}
              </p>
              <p style={{ color: "#808080" }}>
                <strong>Email:</strong> {userData?.email || 'N/A'}
              </p>
              <p style={{ color: "#808080" }}>
                <strong>Address:</strong> {userData?.adresa || 'N/A'}
              </p>
              <p style={{ color: "#808080" }}>
                <strong>City:</strong> {userData?.qyteti || 'N/A'}
              </p>
              <p style={{ color: "#808080" }}>
                <strong>Postal Code:</strong> {userData?.kodi_postal || 'N/A'}
              </p>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg" style={{ color: "#808080" }}>
                Security
              </h2>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {passwordError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {passwordSuccess}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#808080" }}>
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#808080" }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password must be at least 8 characters long with uppercase, lowercase, number, and special character
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "#808080" }}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                      setPasswordError('');
                      setPasswordSuccess('');
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}