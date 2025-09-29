import { useState, useEffect } from 'react';
import { planetsAPI } from '../utils/api';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';

export default function PlanetManagement() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlanet, setEditingPlanet] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    Type: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setLoading(true);
      const data = await planetsAPI.getAll();
      setPlanets(data);
    } catch (error) {
      console.error('Error fetching planets:', error);
      setError('Failed to fetch planets');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      if (editingPlanet) {
        await planetsAPI.update(editingPlanet.PlanetId, formData);
      } else {
        await planetsAPI.create(formData);
      }
      
      setShowForm(false);
      setEditingPlanet(null);
      setFormData({ Name: '', Type: '' });
      fetchPlanets();
    } catch (error) {
      console.error('Error saving planet:', error);
      setError('Failed to save planet');
    }
  };

  const handleEdit = (planet) => {
    setEditingPlanet(planet);
    setFormData({
      Name: planet.Name,
      Type: planet.Type
    });
    setShowForm(true);
  };

  const handleDelete = async (planetId) => {
    if (window.confirm('Are you sure you want to delete this planet?')) {
      try {
        await planetsAPI.delete(planetId);
        fetchPlanets();
      } catch (error) {
        console.error('Error deleting planet:', error);
        setError('Failed to delete planet');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlanet(null);
    setFormData({ Name: '', Type: '' });
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Globe className="h-8 w-8 text-blue-600" />
          Planet Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Planet
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
            {editingPlanet ? 'Edit Planet' : 'Add New Planet'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planet Name
              </label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planet Type
              </label>
              <select
                value={formData.Type}
                onChange={(e) => setFormData({ ...formData, Type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                <option value="Terrestrial">Terrestrial</option>
                <option value="Gas Giant">Gas Giant</option>
                <option value="Ice Giant">Ice Giant</option>
                <option value="Dwarf Planet">Dwarf Planet</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                {editingPlanet ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planet ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {planets.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No planets found
                  </td>
                </tr>
              ) : (
                planets.map((planet) => (
                  <tr key={planet.PlanetId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {planet.PlanetId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {planet.Name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {planet.Type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(planet)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(planet.PlanetId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
