import { useState, useEffect } from 'react';

const LibrariesManagement = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLibrary, setEditingLibrary] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    City: ''
  });

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/libraries');
      if (response.ok) {
        const data = await response.json();
        setLibraries(data);
      } else {
        setError('Failed to fetch libraries');
      }
    } catch (error) {
      setError('Error fetching libraries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.Name.trim()) {
      setError('Library name is required');
      return;
    }
    
    if (!formData.City.trim()) {
      setError('City is required');
      return;
    }
    
    try {
      const url = editingLibrary 
        ? `http://localhost:5000/api/libraries/${editingLibrary.LibraryId}`
        : 'http://localhost:5000/api/libraries';
      
      const method = editingLibrary ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchLibraries();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save library');
      }
    } catch (error) {
      console.error('Error saving library:', error);
      setError('Error saving library');
    }
  };

  const handleEdit = (library) => {
    setEditingLibrary(library);
    setFormData({
      Name: library.Name,
      City: library.City
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this library? This will also delete all associated books.')) {
      try {
        const response = await fetch(`http://localhost:5000/api/libraries/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchLibraries();
          setError('');
        } else {
          setError('Failed to delete library');
        }
      } catch (error) {
        setError('Error deleting library');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '',
      City: ''
    });
    setEditingLibrary(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading libraries...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Libraries Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Library
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
            {editingLibrary ? 'Edit Library' : 'Add New Library'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Library Name</label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., Central Public Library"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={formData.City}
                onChange={(e) => setFormData({ ...formData, City: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="e.g., New York"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingLibrary ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Libraries List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all libraries in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {libraries.map((library) => (
            <li key={library.LibraryId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        📚
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {library.Name}
                    </div>
                    <div className="text-sm text-gray-500">
                      🏙️ {library.City}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(library)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(library.LibraryId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {libraries.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No libraries found. Add your first library!
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrariesManagement;
