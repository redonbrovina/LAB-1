import { useState } from "react";
import { X, UserPlus, Mail, Lock, Hash } from "lucide-react";
import { apiPost } from "../utils/api";

export default function AddNewAdminModal({ isOpen, onClose, onAdminCreated }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        kodi_personal: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const validateForm = () => {
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (!formData.password.trim()) {
            setError("Password is required");
            return false;
        }

        // Password validation
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(formData.password);
        const hasLowerCase = /[a-z]/.test(formData.password);
        const hasNumbers = /\d/.test(formData.password);
        const hasSpecialChar = /[!@#$%^&*(),.?+-=_":{}|<>]/.test(formData.password);

        if (formData.password.length < minLength) {
            setError(`Password must be at least ${minLength} characters long`);
            return false;
        }

        if (!hasUpperCase) {
            setError('Password must contain at least one uppercase letter');
            return false;
        }

        if (!hasLowerCase) {
            setError('Password must contain at least one lowercase letter');
            return false;
        }

        if (!hasNumbers) {
            setError('Password must contain at least one number');
            return false;
        }

        if (!hasSpecialChar) {
            setError('Password must contain at least one special character');
            return false;
        }

        if (!formData.kodi_personal.trim()) {
            setError("Personal code is required");
            return false;
        }

        const personalCodeRegex = /^\d+$/;
        if (!personalCodeRegex.test(formData.kodi_personal)) {
            setError("Personal code must contain only numbers");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");

        try {
            const newAdmin = await apiPost("/admin/", formData);
            console.log("New admin created:", newAdmin);
            
            // Reset form
            setFormData({
                email: "",
                password: "",
                kodi_personal: ""
            });
            
            // Notify parent component
            if (onAdminCreated) {
                onAdminCreated(newAdmin);
            }
            
            // Close modal
            onClose();
        } catch (err) {
            setError(err.message || "Failed to create admin. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setFormData({
                email: "",
                password: "",
                kodi_personal: ""
            });
            setError("");
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md border border-gray-200 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <UserPlus className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Add New Admin</h3>
                    </div>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="admin@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Minimum 8 characters"
                            />
                        </div>
                    </div>

                    {/* Personal Code Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Personal Code *
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                name="kodi_personal"
                                value={formData.kodi_personal}
                                onChange={handleInputChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter personal code"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            <UserPlus size={18} />
                            {loading ? "Creating..." : "Create Admin"}
                        </button>
                        
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
