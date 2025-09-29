import { useState, useEffect } from 'react';

const AppointmentsManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    PatientName: '',
    Date: new Date().toISOString().slice(0, 16), // Default to current date/time
    DoctorId: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/appointments/with-doctors/all');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        setError('Failed to fetch appointments');
      }
    } catch (error) {
      setError('Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.PatientName.trim()) {
      setError('Patient name is required');
      return;
    }
    
    if (!formData.Date) {
      setError('Date and time is required');
      return;
    }
    
    if (!formData.DoctorId) {
      setError('Please select a doctor');
      return;
    }
    
    // Validate date is not in the past
    const selectedDate = new Date(formData.Date);
    const now = new Date();
    if (selectedDate < now) {
      setError('Appointment date cannot be in the past');
      return;
    }
    
    try {
      const url = editingAppointment 
        ? `http://localhost:5000/api/appointments/${editingAppointment.AppointmentId}`
        : 'http://localhost:5000/api/appointments';
      
      const method = editingAppointment ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchAppointments();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save appointment');
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      setError('Error saving appointment');
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
    const dateValue = new Date(appointment.Date);
    const formattedDate = dateValue.toISOString().slice(0, 16);
    
    setFormData({
      PatientName: appointment.PatientName,
      Date: formattedDate,
      DoctorId: appointment.DoctorId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchAppointments();
          setError('');
        } else {
          setError('Failed to delete appointment');
        }
      } catch (error) {
        setError('Error deleting appointment');
      }
    }
  };

  const resetForm = () => {
    // Set default date to current date/time for new appointments
    const now = new Date();
    const defaultDate = now.toISOString().slice(0, 16);
    
    setFormData({ 
      PatientName: '', 
      Date: defaultDate, 
      DoctorId: '' 
    });
    setEditingAppointment(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return <div className="p-6">Loading appointments...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Appointments Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Appointment
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
            {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                value={formData.PatientName}
                onChange={(e) => setFormData({ ...formData, PatientName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date & Time</label>
              <input
                type="datetime-local"
                value={formData.Date}
                onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Select the date and time for the appointment</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Doctor</label>
              <select
                value={formData.DoctorId}
                onChange={(e) => setFormData({ ...formData, DoctorId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.DoctorId} value={doctor.DoctorId}>
                    Dr. {doctor.Name} - {doctor.Specialization}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingAppointment ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Appointments List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all appointments in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.AppointmentId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {appointment.PatientName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {appointment.PatientName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(appointment.Date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Doctor: Dr. {appointment.doctor?.Name} ({appointment.doctor?.Specialization})
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(appointment)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.AppointmentId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {appointments.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No appointments found. Add your first appointment!
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsManagement;
