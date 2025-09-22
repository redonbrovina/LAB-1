import ClientNavBar from "../components/ClientNavBar";
import EditClientModal from "../components/EditClientModal";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { clientAPI, apiDelete } from "../utils/api";
import { Settings, User, Edit3, Trash2, Mail, Building, MapPin, AlertTriangle } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user && user.klientiID) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const data = await clientAPI.getById(user.klientiID);
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiDelete(`/klienti/${userData.klientiID}`);
      console.log('Client deleted successfully');
      
      // Clear authentication state locally
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error deleting client account:', error);
      alert('Error deleting account. Please try again.');
    }
    
    setShowDeleteConfirm(false);
  };

  const handleClientUpdated = (updatedClient) => {
    setUserData(updatedClient);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
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

            <div className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-6 py-6">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xl">
                    {userData?.emri_kompanise ? userData.emri_kompanise.charAt(0).toUpperCase() : 'C'}
                  </span>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
                  <p className="text-gray-600 mt-1">Manage your company account and profile information</p>
                  <p className="text-sm text-gray-500 mt-1">Company: {userData?.emri_kompanise || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Company Name</p>
                      <p className="font-medium text-gray-900">{userData?.emri_kompanise || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{userData?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">{userData?.adresa || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{userData?.qyteti || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Postal Code</p>
                      <p className="font-medium text-gray-900">{userData?.kodi_postal || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Client ID</p>
                      <p className="font-medium text-gray-900">{userData?.klientiID || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Edit3 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Edit3 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Update your company information including contact details and address. Company ID cannot be modified for security reasons.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Company ID is permanent and cannot be changed.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleEditClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Edit3 size={18} />
                Update Company Information
              </button>
            </div>
          </div>


          {/* Delete Account Card */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-100 bg-red-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-red-900">Delete Account</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Permanently delete your company account from the system. This action will remove all access and cannot be undone.
                  </p>
                  <p className="text-sm text-red-600 mt-2 font-medium">
                    ⚠️ This action is irreversible and will immediately revoke all system access.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleDeleteClick}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md border-4 border-red-300">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-bold text-gray-900">Confirm Account Deletion</h3>
                </div>
                <p className="text-gray-700 mb-6">
                  Are you sure you want to permanently delete your company account? This action cannot be undone and will immediately revoke all system access.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Yes, Delete Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Client Modal */}
          <EditClientModal
            isOpen={showEditModal}
            onClose={handleCloseModal}
            client={userData}
            onClientUpdated={handleClientUpdated}
          />
        </div>
      </div>
    </div>
  );
}