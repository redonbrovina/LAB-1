import { useState, useEffect } from "react";
import { X, Save, CheckCircle, XCircle } from "lucide-react";
import { apiPut, apiGet } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function ApplicationEditModal({ isOpen, onClose, application, onApplicationUpdated }) {
  const [formData, setFormData] = useState({
    emri_kompanise: "",
    email: "",
    aplikimi_statusID: "",
    Arsyeja: ""
  });

  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Fetch application statuses on component mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const data = await apiGet('/aplikimi-status');
        setStatuses(data);
      } catch (err) {
        console.log("Error fetching statuses: ", err);
      }
    };
    fetchStatuses();
  }, []);

  // Load application data when modal opens
  useEffect(() => {
    if (isOpen && application) {
      setFormData({
        emri_kompanise: application.emri_kompanise || "",
        email: application.email || "",
        aplikimi_statusID: application.aplikimi_statusID || "",
        Arsyeja: application.Arsyeja || ""
      });
      setError("");
    }
  }, [isOpen, application]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const validateForm = () => {
    if (formData.emri_kompanise.length < 2) {
      setError("Company name must be at least 2 characters long");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.aplikimi_statusID) {
      setError("Please select a status");
      return false;
    }

    if (formData.Arsyeja.length < 10) {
      setError("Please provide a detailed reason (at least 10 characters)");
      return false;
    }

    setError("");
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const updateData = {
        ...formData,
        adminID: user?.id,
        koha_kontrollimit: new Date().toISOString()
      };
      
      const updatePromise = apiPut(`/aplikimi/${application.aplikimiID}`, updateData);
      
      const updatedApplication = await Promise.race([updatePromise, timeoutPromise]);
      console.log('Update response:', updatedApplication);
      
      if (!updatedApplication) {
        throw new Error('No response received from server');
      }
      
      onApplicationUpdated(updatedApplication);
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    setFormData({
      emri_kompanise: "",
      email: "",
      aplikimi_statusID: "",
      Arsyeja: ""
    });
    onClose();
  };

  const getStatusIcon = (statusId) => {
    const status = statuses.find(s => s.aplikimi_statusID == statusId);
    if (status?.statusi === 'approved') {
      return <CheckCircle className="text-green-500" size={16} />;
    } else if (status?.statusi === 'rejected') {
      return <XCircle className="text-red-500" size={16} />;
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-red-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Review Application</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                name="emri_kompanise"
                value={formData.emri_kompanise}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Status *
            </label>
            <select
              name="aplikimi_statusID"
              value={formData.aplikimi_statusID}
              onChange={handleFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
            >
              <option value="">Select a Status</option>
              {statuses.map((status) => (
                <option key={status.aplikimi_statusID} value={status.aplikimi_statusID}>
                  {(status.statusi).charAt(0).toUpperCase() + (status.statusi).slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Decision *
            </label>
            <textarea
              name="Arsyeja"
              value={formData.Arsyeja}
              onChange={handleFormChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-none"
              placeholder="Please provide a detailed reason for your decision..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Minimum 10 characters required
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {loading ? "Updating..." : "Update Application"}
            </button>
            
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
