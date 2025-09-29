import { useState, useEffect } from 'react';

const TeachersManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Email: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/teachers');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      } else {
        setError('Failed to fetch teachers');
      }
    } catch (error) {
      setError('Error fetching teachers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Name.trim()) {
      setError('Teacher name is required');
      return;
    }
    
    if (!formData.Email.trim()) {
      setError('Email is required');
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      setError('Please provide a valid email address');
      return;
    }
    
    try {
      const url = editingTeacher 
        ? `http://localhost:5000/api/teachers/${editingTeacher.TeacherId}`
        : 'http://localhost:5000/api/teachers';
      
      const method = editingTeacher ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchTeachers();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save teacher');
      }
    } catch (error) {
      console.error('Error saving teacher:', error);
      setError('Error saving teacher');
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      Name: teacher.Name,
      Email: teacher.Email
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/teachers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchTeachers();
          setError('');
        } else {
          setError('Failed to delete teacher');
        }
      } catch (error) {
        setError('Error deleting teacher');
      }
    }
  };

  const resetForm = () => {
    setFormData({ Name: '', Email: '' });
    setEditingTeacher(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading teachers...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teachers Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Teacher
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
            {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teacher Name</label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingTeacher ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Teachers List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all teachers in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {teachers.map((teacher) => (
            <li key={teacher.TeacherId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {teacher.Name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {teacher.Name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {teacher.Email}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.TeacherId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {teachers.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No teachers found. Add your first teacher!
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersManagement;
