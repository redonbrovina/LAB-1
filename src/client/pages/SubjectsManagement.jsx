import { useState, useEffect } from 'react';

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Credits: '',
    TeacherId: ''
  });

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/subjects/with-teachers/all');
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        setError('Failed to fetch subjects');
      }
    } catch (error) {
      setError('Error fetching subjects');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/teachers');
      if (response.ok) {
        const data = await response.json();
        setTeachers(data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Title.trim()) {
      setError('Subject title is required');
      return;
    }
    
    if (!formData.Credits) {
      setError('Credits are required');
      return;
    }
    
    if (!formData.TeacherId) {
      setError('Please select a teacher');
      return;
    }
    
    // Validate credits
    const credits = parseInt(formData.Credits);
    if (credits < 1 || credits > 10) {
      setError('Credits must be between 1 and 10');
      return;
    }
    
    try {
      const url = editingSubject 
        ? `http://localhost:5000/api/subjects/${editingSubject.SubjectId}`
        : 'http://localhost:5000/api/subjects';
      
      const method = editingSubject ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Credits: credits,
          TeacherId: parseInt(formData.TeacherId)
        }),
      });

      if (response.ok) {
        await fetchSubjects();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save subject');
      }
    } catch (error) {
      console.error('Error saving subject:', error);
      setError('Error saving subject');
    }
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setFormData({
      Title: subject.Title,
      Credits: subject.Credits.toString(),
      TeacherId: subject.TeacherId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/subjects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchSubjects();
          setError('');
        } else {
          setError('Failed to delete subject');
        }
      } catch (error) {
        setError('Error deleting subject');
      }
    }
  };

  const resetForm = () => {
    setFormData({ Title: '', Credits: '', TeacherId: '' });
    setEditingSubject(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading subjects...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Subjects Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Subject
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
            {editingSubject ? 'Edit Subject' : 'Add New Subject'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Title</label>
              <input
                type="text"
                value={formData.Title}
                onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Credits</label>
              <input
                type="number"
                value={formData.Credits}
                onChange={(e) => setFormData({ ...formData, Credits: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                min="1"
                max="10"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teacher</label>
              <select
                value={formData.TeacherId}
                onChange={(e) => setFormData({ ...formData, TeacherId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.TeacherId} value={teacher.TeacherId}>
                    {teacher.Name} ({teacher.Email})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingSubject ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Subjects List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all subjects in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {subjects.map((subject) => (
            <li key={subject.SubjectId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {subject.Title.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {subject.Title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Credits: {subject.Credits}
                    </div>
                    <div className="text-sm text-gray-500">
                      Teacher: {subject.teacher?.Name} ({subject.teacher?.Email})
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(subject)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject.SubjectId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {subjects.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No subjects found. Add your first subject!
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsManagement;
