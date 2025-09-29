import { useState, useEffect } from 'react';

const StoresManagement = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [formData, setFormData] = useState({
    StoreName: '',
    Location: ''
  });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/stores');
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      } else {
        setError('Failed to fetch stores');
      }
    } catch (error) {
      setError('Error fetching stores');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.StoreName.trim()) {
      setError('Store name is required');
      return;
    }
    
    if (!formData.Location.trim()) {
      setError('Location is required');
      return;
    }
    
    try {
      const url = editingStore 
        ? `http://localhost:5000/api/stores/${editingStore.StoreId}`
        : 'http://localhost:5000/api/stores';
      
      const method = editingStore ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchStores();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save store');
      }
    } catch (error) {
      console.error('Error saving store:', error);
      setError('Error saving store');
    }
  };

  const handleEdit = (store) => {
    setEditingStore(store);
    setFormData({
      StoreName: store.StoreName,
      Location: store.Location
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/stores/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchStores();
          setError('');
        } else {
          setError('Failed to delete store');
        }
      } catch (error) {
        setError('Error deleting store');
      }
    }
  };

  const resetForm = () => {
    setFormData({ StoreName: '', Location: '' });
    setEditingStore(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading stores...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stores Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Store
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
            {editingStore ? 'Edit Store' : 'Add New Store'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Name</label>
              <input
                type="text"
                value={formData.StoreName}
                onChange={(e) => setFormData({ ...formData, StoreName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.Location}
                onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingStore ? 'Update' : 'Create'}
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">Stores List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all stores in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {stores.map((store) => (
            <li key={store.StoreId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {store.StoreName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {store.StoreName}
                    </div>
                    <div className="text-sm text-gray-500">
                      📍 {store.Location}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(store)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(store.StoreId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {stores.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No stores found. Add your first store!
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresManagement;
