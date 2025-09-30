import React, { useState, useEffect } from 'react';
import { fabrikaAPI } from '../utils/api';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';

export default function FabrikaManagement() {
  const [fabrikat, setFabrikat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingFabrika, setEditingFabrika] = useState(null);
  const [formData, setFormData] = useState({
    EmriFabrikes: '',
    Lokacioni: ''
  });

  useEffect(() => {
    loadFabrikat();
  }, []);

  const loadFabrikat = async () => {
    try {
      setLoading(true);
      const response = await fabrikaAPI.getAll();
      setFabrikat(response);
      setError(null);
    } catch (err) {
      setError('Failed to load factories');
      console.error('Error loading factories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFabrika) {
        await fabrikaAPI.update(editingFabrika.ID, formData);
      } else {
        await fabrikaAPI.create(formData);
      }
      setShowModal(false);
      setEditingFabrika(null);
      setFormData({ EmriFabrikes: '', Lokacioni: '' });
      loadFabrikat();
    } catch (err) {
      setError('Failed to save factory');
      console.error('Error saving factory:', err);
    }
  };

  const handleEdit = (fabrika) => {
    setEditingFabrika(fabrika);
    setFormData({
      EmriFabrikes: fabrika.EmriFabrikes,
      Lokacioni: fabrika.Lokacioni
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this factory?')) {
      try {
        await fabrikaAPI.delete(id);
        loadFabrikat();
      } catch (err) {
        setError('Failed to delete factory');
        console.error('Error deleting factory:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFabrika(null);
    setFormData({ EmriFabrikes: '', Lokacioni: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Factory Management</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Factory</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factory Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workers Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fabrikat.map((fabrika) => (
                <tr key={fabrika.ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {fabrika.ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fabrika.EmriFabrikes}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fabrika.Lokacioni}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {fabrika.punetoret ? fabrika.punetoret.length : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(fabrika)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(fabrika.ID)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingFabrika ? 'Edit Factory' : 'Add New Factory'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Factory Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.EmriFabrikes}
                    onChange={(e) => setFormData({ ...formData, EmriFabrikes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Lokacioni}
                    onChange={(e) => setFormData({ ...formData, Lokacioni: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    {editingFabrika ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
