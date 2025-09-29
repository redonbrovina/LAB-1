import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, XCircle, Car as CarIcon, User as OwnerIcon, Hash } from 'lucide-react';

export default function CarsManagement() {
  const [cars, setCars] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    PlateNumber: '',
    Model: '',
    OwnerId: ''
  });

  useEffect(() => {
    fetchCars();
    fetchOwners();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/cars/with-owners/all');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to fetch cars.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/owners');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOwners(data);
    } catch (error) {
      console.error('Error fetching owners:', error);
      setError('Failed to fetch owners for dropdown.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.PlateNumber.trim() || !formData.Model.trim() || !formData.OwnerId) {
      setError('Plate Number, Model, and Owner are required.');
      return;
    }

    try {
      const url = editingCar
        ? `http://localhost:5000/api/cars/${editingCar.CarId}`
        : 'http://localhost:5000/api/cars';
      const method = editingCar ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCars();
        resetForm();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save car.');
      }
    } catch (error) {
      console.error('Error saving car:', error);
      setError('Error saving car.');
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car);
    setFormData({
      PlateNumber: car.PlateNumber,
      Model: car.Model,
      OwnerId: car.OwnerId.toString()
    });
    setShowForm(true);
  };

  const handleSoftDelete = async (carId) => {
    if (!window.confirm('Are you sure you want to soft delete this car?')) {
      return;
    }
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${carId}/soft`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchCars();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to soft delete car.');
      }
    } catch (error) {
      console.error('Error soft deleting car:', error);
      setError('Error soft deleting car.');
    }
  };

  const resetForm = () => {
    setFormData({
      PlateNumber: '',
      Model: '',
      OwnerId: ''
    });
    setEditingCar(null);
    setShowForm(false);
    setError('');
  };

  if (loading) return <div className="text-center py-4">Loading cars...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <CarIcon className="mr-3 text-indigo-600" size={30} />
        Cars Management
      </h1>

      <button
        onClick={() => {
          setEditingCar(null);
          setFormData({ PlateNumber: '', Model: '', OwnerId: '' });
          setShowForm(true);
          setError('');
        }}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        <PlusCircle className="mr-2" size={20} />
        Add New Car
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </h2>
            <button
              onClick={resetForm}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XCircle size={24} />
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plate Number</label>
                <input
                  type="text"
                  value={formData.PlateNumber}
                  onChange={(e) => setFormData({ ...formData, PlateNumber: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={formData.Model}
                  onChange={(e) => setFormData({ ...formData, Model: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Owner</label>
                <select
                  value={formData.OwnerId}
                  onChange={(e) => setFormData({ ...formData, OwnerId: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select an owner</option>
                  {owners.map((owner) => (
                    <option key={owner.OwnerId} value={owner.OwnerId}>
                      {owner.Name} ({owner.Phone})
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                  {editingCar ? 'Update Car' : 'Add Car'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No cars found.</td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car.CarId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.CarId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <Hash size={16} className="mr-1 text-gray-500" /> {car.PlateNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.Model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {car.owner ? `${car.owner.Name} (${car.owner.Phone})` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-300 ease-in-out"
                      title="Edit Car"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleSoftDelete(car.CarId)}
                      className="text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                      title="Soft Delete Car"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
