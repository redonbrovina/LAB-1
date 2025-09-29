import { useState, useEffect } from 'react';

const FlightsManagement = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    FlightNumber: '',
    Destination: '',
    Date: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/flights');
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      } else {
        setError('Failed to fetch flights');
      }
    } catch (error) {
      setError('Error fetching flights');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.FlightNumber.trim()) {
      setError('Flight number is required');
      return;
    }
    
    if (!formData.Destination.trim()) {
      setError('Destination is required');
      return;
    }
    
    if (!formData.Date) {
      setError('Flight date is required');
      return;
    }
    
    // Validate date is not in the past (allow same day)
    const selectedDate = new Date(formData.Date);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    if (selectedDay < today) {
      setError('Flight date cannot be in the past');
      return;
    }
    
    try {
      const url = editingFlight 
        ? `http://localhost:5000/api/flights/${editingFlight.FlightId}`
        : 'http://localhost:5000/api/flights';
      
      const method = editingFlight ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchFlights();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save flight');
      }
    } catch (error) {
      console.error('Error saving flight:', error);
      setError('Error saving flight');
    }
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
    const dateValue = new Date(flight.Date);
    const formattedDate = dateValue.toISOString().slice(0, 16);

    setFormData({
      FlightNumber: flight.FlightNumber,
      Destination: flight.Destination,
      Date: formattedDate
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/flights/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchFlights();
          setError('');
        } else {
          setError('Failed to delete flight');
        }
      } catch (error) {
        setError('Error deleting flight');
      }
    }
  };

  const resetForm = () => {
    // Set default date to current date/time for new flights
    const now = new Date();
    const defaultDate = now.toISOString().slice(0, 16);

    setFormData({
      FlightNumber: '',
      Destination: '',
      Date: defaultDate
    });
    setEditingFlight(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="p-6">Loading flights...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Flights Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Flight
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingFlight ? 'Edit Flight' : 'Add New Flight'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Flight Number</label>
              <input
                type="text"
                value={formData.FlightNumber}
                onChange={(e) => setFormData({ ...formData, FlightNumber: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., AA123"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                value={formData.Destination}
                onChange={(e) => setFormData({ ...formData, Destination: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., New York"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Flight Date & Time</label>
              <input
                type="datetime-local"
                value={formData.Date}
                onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Select the departure date and time. You can schedule flights for today or future dates.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingFlight ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Flights List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all flights in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {flights.map((flight) => (
            <li key={flight.FlightId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        ✈️
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {flight.FlightNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      🎯 {flight.Destination}
                    </div>
                    <div className="text-sm text-gray-500">
                      📅 {formatDate(flight.Date)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(flight)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.FlightId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {flights.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No flights found. Add your first flight!
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsManagement;
