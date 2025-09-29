import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, XCircle, User as OwnerIcon, Phone } from 'lucide-react';

export default function OwnersManagement() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Phone: ''
  });

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/owners');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
      setError('Failed to fetch owners.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.Name.trim() || !formData.Phone.trim()) {
      setError('Owner Name and Phone are required.');
      return;
    }

    try {
      const url = editingOwner
        ? `http://localhost:5000/api/owners/${editingOwner.OwnerId}`
        : 'http://localhost:5000/api/owners';
      const method = editingOwner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchOwners();
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save owner.');
      }
    } catch (error) {
      console.error('Error saving owner:', error);
      setError('Error saving owner.');
    }
  };

  const handleEdit = (owner) => {
    setEditingOwner(owner);
    setFormData({
      Name: owner.Name,
      Phone: owner.Phone
    });
    setShowForm(true);
  };

  const handleDelete = async (ownerId) => {
    if (!window.confirm('Are you sure you want to delete this owner? This will also delete all associated cars.')) {
      return;
    }
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/owners/${ownerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchOwners();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete owner.');
      }
    } catch (error) {
      console.error('Error deleting owner:', error);
      setError('Error deleting owner.');
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      Phone: ''
    });
    setEditingOwner(null);
    setShowForm(false);
    setError('');
  };

  if (loading) return <div className="text-center py-4">Loading owners...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <OwnerIcon className="mr-3 text-indigo-600" size={30} />
        Owners Management
      </h1>

      <button
        onClick={() => {
          setEditingOwner(null);
          setFormData({ Name: '', Phone: '' });
          setShowForm(true);
          setError('');
        }}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <PlusCircle className="mr-2" size={20} />
        Add New Owner
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingOwner ? 'Edit Owner' : 'Add New Owner'}
            </h2>
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                <input
                  type="text"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.Phone}
                  onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                  {editingOwner ? 'Update Owner' : 'Add Owner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {owners.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No owners found.</td>
              </tr>
            ) : (
              owners.map((owner) => (
                <tr key={owner.OwnerId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{owner.OwnerId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{owner.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <Phone size={16} className="mr-1 text-gray-500" /> {owner.Phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(owner)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300 ease-in-out"
                      title="Edit Owner"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(owner.OwnerId)}
                      className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                      title="Delete Owner"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
