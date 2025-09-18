import { useState, useEffect } from "react";
import { X, Save } from "lucide-react";
import { apiPut, apiGet } from "../utils/api";

export default function EditUserModal({ isOpen, onClose, user, onUserUpdated }) {
  const [formData, setFormData] = useState({
    emri_kompanise: "",
    email: "",
    adresa: "",
    shtetiID: "",
    qyteti: "",
    kodi_postal: ""
  });
  const [shtetet, setShtetet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch countries on component mount
  useEffect(() => {
    const fetchShtetet = async () => {
      try {
        const data = await apiGet('/form/shtetet');
        setShtetet(data);
      } catch (err) {
        console.log("Error fetching countries: ", err);
      }
    };
    fetchShtetet();
  }, []);

  // Load user data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        emri_kompanise: user.emri_kompanise || "",
        email: user.email || "",
        adresa: user.adresa || "",
        shtetiID: user.shtetiID || "",
        qyteti: user.qyteti || "",
        kodi_postal: user.kodi_postal || ""
      });
      setError("");
    }
  }, [isOpen, user]);

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

    if (formData.adresa.length < 5) {
      setError("Please enter a valid address");
      return false;
    }

    if (formData.qyteti.length < 2) {
      setError("Please enter a valid city");
      return false;
    }

    const postalCodeRegex = /^[0-9]{5,10}$/;
    if (!postalCodeRegex.test(formData.kodi_postal)) {
      setError("Please enter a valid postal code (5-10 digits)");
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
      console.log('Updating user with data:', formData);
      console.log('User ID:', user.klientiID);
      
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const updatePromise = apiPut(`/klienti/${user.klientiID}`, formData);
      
      const updatedUser = await Promise.race([updatePromise, timeoutPromise]);
      console.log('Update response:', updatedUser);
      
      if (!updatedUser) {
        throw new Error('No response received from server');
      }
      
      onUserUpdated(updatedUser);
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
      adresa: "",
      shtetiID: "",
      qyteti: "",
      kodi_postal: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-4 border-red-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Client</h2>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="adresa"
                value={formData.adresa}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <select
                name="shtetiID"
                value={formData.shtetiID}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
              >
                <option value="">Select a Country</option>
                {shtetet.map((shteti) => (
                  <option key={shteti.shtetiID} value={shteti.shtetiID}>
                    {shteti.emri_shtetit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="qyteti"
                value={formData.qyteti}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                type="text"
                name="kodi_postal"
                value={formData.kodi_postal}
                onChange={handleFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
                placeholder="Enter postal code"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {loading ? "Updating..." : "Update Client"}
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
