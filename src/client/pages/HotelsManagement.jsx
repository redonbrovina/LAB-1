import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, XCircle, Building as HotelIcon, MapPin } from 'lucide-react';

export default function HotelsManagement() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Location: ''
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/hotels');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.Name.trim() || !formData.Location.trim()) {
      setError('Hotel Name and Location are required.');
      return;
    }

    try {
      const url = editingHotel
        ? `http://localhost:5000/api/hotels/${editingHotel.HotelId}`
        : 'http://localhost:5000/api/hotels';
      const method = editingHotel ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchHotels();
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save hotel.');
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
      setError('Error saving hotel.');
    }
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      Name: hotel.Name,
      Location: hotel.Location
    });
    setShowForm(true);
  };

  const handleDelete = async (hotelId) => {
    if (!window.confirm('Are you sure you want to delete this hotel? This will also delete all associated rooms.')) {
      return;
    }
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchHotels();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete hotel.');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setError('Error deleting hotel.');
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      Location: ''
    });
    setEditingHotel(null);
    setShowForm(false);
    setError('');
  };

  if (loading) return <div className="text-center py-4">Loading hotels...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <HotelIcon className="mr-3 text-indigo-600" size={30} />
        Hotels Management
      </h1>

      <button
        onClick={() => { setShowForm(true); setEditingHotel(null); setFormData({ Name: '', Location: '' }); }}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <PlusCircle className="mr-2" size={20} />
        Add New Hotel
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h2>
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  type="text"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.Location}
                  onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
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
                  {editingHotel ? 'Update Hotel' : 'Add Hotel'}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No hotels found.</td>
              </tr>
            ) : (
              hotels.map((hotel) => (
                <tr key={hotel.HotelId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hotel.HotelId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <MapPin size={16} className="mr-1 text-gray-500" /> {hotel.Location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300 ease-in-out"
                      title="Edit Hotel"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.HotelId)}
                      className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                      title="Delete Hotel"
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
