import React, { useState, useEffect } from 'react';
import { contractsAPI, employeesAPI } from '../utils/api';

const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    EmployeeId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Fetching contracts and employees...');
      const [contractsData, employeesData] = await Promise.all([
        contractsAPI.getAll(),
        employeesAPI.getAll()
      ]);
      console.log('Contracts data:', contractsData);
      console.log('Employees data:', employeesData);
      setContracts(contractsData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contractData = {
        ...formData,
        EmployeeId: parseInt(formData.EmployeeId)
      };

      console.log('Submitting contract:', contractData);
      if (editingContract) {
        console.log('Updating contract:', editingContract.Id);
        await contractsAPI.update(editingContract.Id, contractData);
      } else {
        console.log('Creating new contract');
        await contractsAPI.create(contractData);
      }
      setShowModal(false);
      setEditingContract(null);
      setFormData({ Title: '', Description: '', EmployeeId: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving contract:', error);
      alert('Error saving contract: ' + error.message);
    }
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setFormData({
      Title: contract.Title,
      Description: contract.Description || '',
      EmployeeId: contract.EmployeeId.toString()
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      try {
        await contractsAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting contract:', error);
        alert('Error deleting contract: ' + error.message);
      }
    }
  };

  const handleAddNew = () => {
    setEditingContract(null);
    setFormData({ Title: '', Description: '', EmployeeId: '' });
    setShowModal(true);
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(e => e.Id === employeeId);
    return employee ? `${employee.Name} ${employee.Surname}` : 'Unknown Employee';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contracts Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add New Contract
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contract ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contracts.map((contract) => (
              <tr key={contract.Id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contract.Id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {contract.Title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {contract.Description || 'No description'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getEmployeeName(contract.EmployeeId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(contract)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contract.Id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingContract ? 'Edit Contract' : 'Add New Contract'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.Title}
                    onChange={(e) => setFormData({ ...formData, Title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.Description}
                    onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="3"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee
                  </label>
                  <select
                    value={formData.EmployeeId}
                    onChange={(e) => setFormData({ ...formData, EmployeeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select an employee</option>
                    {employees.map((employee) => (
                      <option key={employee.Id} value={employee.Id}>
                        {employee.Name} {employee.Surname}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                  >
                    {editingContract ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contracts;
