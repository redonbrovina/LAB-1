import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, XCircle, Bed as RoomIcon, Building as HotelIcon, Users } from 'lucide-react';

export default function RoomsManagement() {
  console.log('RoomsManagement component loaded');
  
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    RoomNumber: '',
    Capacity: '',
    HotelId: ''
  });

  useEffect(() => {
    fetchRooms();
    fetchHotels();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/rooms/with-hotels/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hotels');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setError('Failed to fetch hotels for dropdown.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('Form submitted with data:', formData);

    if (!formData.RoomNumber.trim() || !formData.Capacity || !formData.HotelId) {
      console.log('Validation failed: missing required fields');
      setError('Room Number, Capacity, and Hotel are required.');
      return;
    }

    const capacity = parseInt(formData.Capacity);
    console.log('Parsed capacity:', capacity);
    if (capacity < 1 || capacity > 10) {
      console.log('Validation failed: capacity out of range');
      setError('Capacity must be between 1 and 10.');
      return;
    }

    try {
      const url = editingRoom
        ? `http://localhost:5000/api/rooms/${editingRoom.RoomId}`
        : 'http://localhost:5000/api/rooms';
      const method = editingRoom ? 'PUT' : 'POST';
      
      const requestBody = {
        ...formData,
        Capacity: capacity
      };
      
      console.log('Making API call to:', url);
      console.log('Request body:', requestBody);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      if (response.ok) {
        console.log('Room created successfully');
        await fetchRooms();
        resetForm();
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        setError(errorData.message || 'Failed to save room.');
      }
    } catch (error) {
      console.error('Error saving room:', error);
      setError('Error saving room.');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      RoomNumber: room.RoomNumber,
      Capacity: room.Capacity.toString(),
      HotelId: room.HotelId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) {
      return;
    }
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchRooms();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete room.');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Error deleting room.');
    }
  };

  const resetForm = () => {
    setFormData({
      RoomNumber: '',
      Capacity: '',
      HotelId: ''
    });
    setEditingRoom(null);
    setShowForm(false);
    setError('');
  };

  if (loading) return <div className="text-center py-4">Loading rooms...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <RoomIcon className="mr-3 text-indigo-600" size={30} />
        Rooms Management
      </h1>

      <button
        onClick={() => { 
          setEditingRoom(null);
          setFormData({
            RoomNumber: '',
            Capacity: '',
            HotelId: ''
          });
          setShowForm(true); 
          setError('');
        }}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <PlusCircle className="mr-2" size={20} />
        Add New Room
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h2>
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                  type="text"
                  value={formData.RoomNumber}
                  onChange={(e) => setFormData({ ...formData, RoomNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.Capacity}
                  onChange={(e) => setFormData({ ...formData, Capacity: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Number of guests the room can accommodate (1-10)
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel</label>
                <select
                  value={formData.HotelId}
                  onChange={(e) => setFormData({ ...formData, HotelId: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select a hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.HotelId} value={hotel.HotelId}>
                      {hotel.Name} ({hotel.Location})
                    </option>
                  ))}
                </select>
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
                  {editingRoom ? 'Update Room' : 'Add Room'}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No rooms found.</td>
              </tr>
            ) : (
              rooms.map((room) => (
                <tr key={room.RoomId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.RoomId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.RoomNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <Users size={16} className="mr-1 text-gray-500" /> {room.Capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {room.hotel ? `${room.hotel.Name} (${room.hotel.Location})` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(room)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300 ease-in-out"
                      title="Edit Room"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(room.RoomId)}
                      className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                      title="Delete Room"
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
