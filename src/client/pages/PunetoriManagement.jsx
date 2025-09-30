import React, { useState, useEffect } from 'react';
import { punetoriAPI, fabrikaAPI } from '../utils/api';
import { Plus, Edit, Trash2, HardHat } from 'lucide-react';

export default function PunetoriManagement() {
  const [punetoret, setPunetoret] = useState([]);
  const [fabrikat, setFabrikat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingPunetori, setEditingPunetori] = useState(null);
  const [formData, setFormData] = useState({
    Emri: '',
    Mbiemri: '',
    Pozita: '',
    ID_fabrika: ''
  });

  useEffect(() => {
    loadPunetoret();
    loadFabrikat();
  }, []);

  const loadPunetoret = async () => {
    try {
      setLoading(true);
      const response = await punetoriAPI.getAll();
      setPunetoret(response);
      setError(null);
    } catch (err) {
      setError('Failed to load workers');
      console.error('Error loading workers:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFabrikat = async () => {
    try {
      const response = await fabrikaAPI.getAll();
      setFabrikat(response);
    } catch (err) {
      console.error('Error loading factories:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPunetori) {
        await punetoriAPI.update(editingPunetori.ID, formData);
      } else {
        await punetoriAPI.create(formData);
      }
      setShowModal(false);
      setEditingPunetori(null);
      setFormData({ Emri: '', Mbiemri: '', Pozita: '', ID_fabrika: '' });
      loadPunetoret();
    } catch (err) {
      setError('Failed to save worker');
      console.error('Error saving worker:', err);
    }
  };

  const handleEdit = (punetori) => {
    setEditingPunetori(punetori);
    setFormData({
      Emri: punetori.Emri,
      Mbiemri: punetori.Mbiemri,
      Pozita: punetori.Pozita,
      ID_fabrika: punetori.ID_fabrika
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this worker?')) {
      try {
        await punetoriAPI.delete(id);
        loadPunetoret();
      } catch (err) {
        setError('Failed to delete worker');
        console.error('Error deleting worker:', err);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPunetori(null);
    setFormData({ Emri: '', Mbiemri: '', Pozita: '', ID_fabrika: '' });
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
          <HardHat className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Worker Management</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Worker</span>
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
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Factory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {punetoret.map((punetori) => (
                <tr key={punetori.ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {punetori.ID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {punetori.Emri}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {punetori.Mbiemri}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {punetori.Pozita}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {punetori.fabrika ? punetori.fabrika.EmriFabrikes : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(punetori)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(punetori.ID)}
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
                {editingPunetori ? 'Edit Worker' : 'Add New Worker'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Emri}
                    onChange={(e) => setFormData({ ...formData, Emri: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Mbiemri}
                    onChange={(e) => setFormData({ ...formData, Mbiemri: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.Pozita}
                    onChange={(e) => setFormData({ ...formData, Pozita: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Factory
                  </label>
                  <select
                    required
                    value={formData.ID_fabrika}
                    onChange={(e) => setFormData({ ...formData, ID_fabrika: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Factory</option>
                    {fabrikat.map((fabrika) => (
                      <option key={fabrika.ID} value={fabrika.ID}>
                        {fabrika.EmriFabrikes} - {fabrika.Lokacioni}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    {editingPunetori ? 'Update' : 'Create'}
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
