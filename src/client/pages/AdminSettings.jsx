import { Settings, UserPlus, Edit3, Trash2, Shield, AlertTriangle } from "lucide-react";

export default function AdminSettings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white shadow-sm border-b rounded-lg">
                <div className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Settings className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
                            <p className="text-gray-600 mt-1">Manage system settings and administrator accounts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Administrator Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Add Administrator</h3>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-gray-700 leading-relaxed">
                                Add a new administrator to the system. This action grants full system access and should only be performed with proper authorization.
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                ⚠️ This action requires administrative privileges and proper approval.
                            </p>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        <UserPlus size={18} />
                        Add New Administrator
                    </button>
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
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        <Edit3 size={18} />
                        Update Profile Information
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
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                        <Trash2 size={18} />
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}