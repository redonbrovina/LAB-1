import { useState, useEffect } from 'react';

const PassengersManagement = () => {
  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    TicketNumber: '',
    FlightId: ''
  });

  useEffect(() => {
    fetchPassengers();
    fetchFlights();
  }, []);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/passengers/with-flights/all');
      if (response.ok) {
        const data = await response.json();
        setPassengers(data);
      } else {
        setError('Failed to fetch passengers');
      }
    } catch (error) {
      setError('Error fetching passengers');
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flights');
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      } else {
        setError('Failed to fetch flights for dropdown');
      }
    } catch (error) {
      setError('Error fetching flights for dropdown');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Name.trim()) {
      setError('Passenger name is required');
      return;
    }
    
    if (!formData.TicketNumber.trim()) {
      setError('Ticket number is required');
      return;
    }
    
    if (!formData.FlightId) {
      setError('Flight is required');
      return;
    }
    
    try {
      const url = editingPassenger 
        ? `http://localhost:5000/api/passengers/${editingPassenger.PassengerId}`
        : 'http://localhost:5000/api/passengers';
      
      const method = editingPassenger ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchPassengers();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save passenger');
      }
    } catch (error) {
      console.error('Error saving passenger:', error);
      setError('Error saving passenger');
    }
  };

  const handleEdit = (passenger) => {
    setEditingPassenger(passenger);
    setFormData({
      Name: passenger.Name,
      TicketNumber: passenger.TicketNumber,
      FlightId: passenger.FlightId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/passengers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchPassengers();
          setError('');
        } else {
          setError('Failed to delete passenger');
        }
      } catch (error) {
        setError('Error deleting passenger');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      TicketNumber: '',
      FlightId: ''
    });
    setEditingPassenger(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="p-6">Loading passengers...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Passengers Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Passenger
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
            {editingPassenger ? 'Edit Passenger' : 'Add New Passenger'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Passenger Name</label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ticket Number</label>
              <input
                type="text"
                value={formData.TicketNumber}
                onChange={(e) => setFormData({ ...formData, TicketNumber: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., TKT123456"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Flight</label>
              <select
                value={formData.FlightId}
                onChange={(e) => setFormData({ ...formData, FlightId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a flight</option>
                {flights.map((flight) => (
                  <option key={flight.FlightId} value={flight.FlightId}>
                    {flight.FlightNumber} - {flight.Destination} ({formatDate(flight.Date)})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingPassenger ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Passengers List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all passengers and their flight assignments
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {passengers.map((passenger) => (
            <li key={passenger.PassengerId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        👤
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {passenger.Name}
                    </div>
                    <div className="text-sm text-gray-500">
                      🎫 Ticket: {passenger.TicketNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      ✈️ Flight: {passenger.flight ? `${passenger.flight.FlightNumber} - ${passenger.flight.Destination}` : 'N/A'}
                    </div>
                    {passenger.flight && (
                      <div className="text-sm text-gray-500">
                        📅 Departure: {formatDate(passenger.flight.Date)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(passenger)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(passenger.PassengerId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {passengers.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No passengers found. Add your first passenger!
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengersManagement;
