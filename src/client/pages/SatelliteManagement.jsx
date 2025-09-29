import { useState, useEffect } from 'react';
import { satellitesAPI, planetsAPI } from '../utils/api';
import { Plus, Edit, Trash2, Satellite as SatelliteIcon } from 'lucide-react';

export default function SatelliteManagement() {
  const [satellites, setSatellites] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSatellite, setEditingSatellite] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    PlanetId: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [satellitesData, planetsData] = await Promise.all([
        satellitesAPI.getAll(),
        planetsAPI.getAll()
      ]);
      setSatellites(satellitesData);
      setPlanets(planetsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      
      if (editingSatellite) {
        await satellitesAPI.update(editingSatellite.SatelliteId, formData);
      } else {
        await satellitesAPI.create(formData);
      }
      
      setShowForm(false);
      setEditingSatellite(null);
      setFormData({ Name: '', PlanetId: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving satellite:', error);
      setError('Failed to save satellite');
    }
  };

  const handleEdit = (satellite) => {
    setEditingSatellite(satellite);
    setFormData({
      Name: satellite.Name,
      PlanetId: satellite.PlanetId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (satelliteId) => {
    if (window.confirm('Are you sure you want to delete this satellite?')) {
      try {
        await satellitesAPI.delete(satelliteId);
        fetchData();
      } catch (error) {
        console.error('Error deleting satellite:', error);
        setError('Failed to delete satellite');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSatellite(null);
    setFormData({ Name: '', PlanetId: '' });
    setError('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <SatelliteIcon className="h-8 w-8 text-green-600" />
          Satellite Management
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Satellite
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
            {editingSatellite ? 'Edit Satellite' : 'Add New Satellite'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Satellite Name
              </label>
              <input
                type="text"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Planet
              </label>
              <select
                value={formData.PlanetId}
                onChange={(e) => setFormData({ ...formData, PlanetId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Planet</option>
                {planets.map((planet) => (
                  <option key={planet.PlanetId} value={planet.PlanetId}>
                    {planet.Name} ({planet.Type})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingSatellite ? 'Update' : 'Create'}
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
                  Satellite ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planet Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {satellites.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No satellites found
                  </td>
                </tr>
              ) : (
                satellites.map((satellite) => (
                  <tr key={satellite.SatelliteId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {satellite.SatelliteId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {satellite.Name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {satellite.Planet?.Name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {satellite.Planet?.Type || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(satellite)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(satellite.SatelliteId)}
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
