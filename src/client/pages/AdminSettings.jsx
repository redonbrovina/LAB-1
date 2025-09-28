import { Settings, UserPlus, Edit3, Trash2, Shield, AlertTriangle, Mail, User } from "lucide-react";
import { useState, useEffect } from "react";
import { apiGet, apiDelete } from "../utils/api";
import { useAuth } from "../utils/AuthContext";
import EditAdminModal from "../admin/EditAdminModal";
import AddNewAdminModal from "../admin/AddNewAdminModal";

export default function AdminSettings() {
    const { logout } = useAuth();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const fetchAdminProfile = async () => {
        try {
            setLoading(true);
            const adminData = await apiGet('/admin/profile');
            setAdmin(adminData);
        } catch (error) {
            console.error('Error fetching admin profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleAddAdminClick = () => {
        setShowAddAdminModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await apiDelete(`/admin/${admin.adminID}`);
            console.log('Admin deleted successfully');
            
            // Clear authentication state locally (don't call server logout since account is deleted)
            // Cookies will be cleared by the server
            
            // Redirect to admin login page
            window.location.href = '/admin-login';
        } catch (error) {
            console.error('Error deleting admin account:', error);
            alert('Error deleting account. Please try again.');
        }
        
        setShowDeleteConfirm(false);
    };

    const handleAdminUpdated = (updatedAdmin) => {
        setAdmin(updatedAdmin);
        setShowEditModal(false);
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
    };

    const handleCloseAddAdminModal = () => {
        setShowAddAdminModal(false);
    };

    const handleAdminCreated = (newAdmin) => {
        console.log('New admin created:', newAdmin);
        // You could add a success message or refresh the admin list here
        setShowAddAdminModal(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-gray-500">Loading admin profile...</div>
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="text-red-500">Error loading admin profile</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Settings className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                            <p className="text-gray-600 mt-1">Manage your administrator account and profile</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Your Profile</h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium text-gray-900">{admin.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="h-5 w-5 text-gray-400" />
                                <div>
                                    <p className="text-sm text-gray-500">Admin ID</p>
                                    <p className="font-medium text-gray-900">{admin.adminID}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="text-red-600 font-bold text-2xl">
                                    {admin.email ? admin.email.charAt(0).toUpperCase() : 'A'}
                                </span>
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
                                Update your personal information including email address and password. Personal code cannot be modified for security reasons.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Personal code is permanent and cannot be changed.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={handleEditClick}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                        <Edit3 size={18} />
                        Update Profile Information
                    </button>
                </div>
            </div>

            {/* Add New Admin Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Add New Admin</h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <UserPlus className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-gray-700 leading-relaxed">
                                Create a new administrator account with email, password, and personal code. The new admin will have full access to the system.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Personal code is required for admin authentication and cannot be changed after creation.
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={handleAddAdminClick}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <UserPlus size={18} />
                        Add New Administrator
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
                                Permanently delete your administrator account from the system. This action will remove all access and cannot be undone.
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

            {/* Edit Admin Modal */}
            <EditAdminModal
                isOpen={showEditModal}
                onClose={handleCloseModal}
                admin={admin}
                onAdminUpdated={handleAdminUpdated}
            />

            {/* Add New Admin Modal */}
            <AddNewAdminModal
                isOpen={showAddAdminModal}
                onClose={handleCloseAddAdminModal}
                onAdminCreated={handleAdminCreated}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md border-4 border-red-300">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <h3 className="text-lg font-bold text-gray-900">Confirm Account Deletion</h3>
                        </div>
                        <p className="text-gray-700 mb-6">
                            Are you sure you want to permanently delete your administrator account? This action cannot be undone and will immediately revoke all system access.
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
        </div>
    );
}