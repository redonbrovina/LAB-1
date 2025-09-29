import { useEffect, useMemo, useState } from 'react';
import { furnitoriAPI } from '../utils/api';
import { Edit3, Trash2 } from 'lucide-react';

export default function SuppliersAdmin() {
  const [suppliers, setSuppliers] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ emri: '', shtetiID: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await furnitoriAPI.getAll();
      const allSuppliersData = Array.isArray(data) ? data : [];
      setAllSuppliers(allSuppliersData);
      
      // Apply search filter
      const filteredSuppliers = allSuppliersData.filter(supplier =>
        supplier.emri?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.furnitoriID?.toString().includes(searchTerm)
      );
      
      // Calculate pagination
      const totalItems = filteredSuppliers.length;
      const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);
      const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
      const endIndex = startIndex + pagination.itemsPerPage;
      const paginatedSuppliers = filteredSuppliers.slice(startIndex, endIndex);
      
      setSuppliers(paginatedSuppliers);
      setPagination(prev => ({
        ...prev,
        totalPages,
        totalItems,
        hasNextPage: pagination.currentPage < totalPages,
        hasPrevPage: pagination.currentPage > 1
      }));
    } catch (e) {
      setError(e?.message || 'Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  useEffect(() => { loadAll(); }, [searchTerm, pagination.currentPage]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ emri: '', shtetiID: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        emri: form.emri,
        shtetiID: form.shtetiID ? Number(form.shtetiID) : null,
      };
      if (!payload.emri) {
        setError('Supplier name is required');
        return;
      }

      if (editingId) {
        await furnitoriAPI.update(editingId, payload);
      } else {
        await furnitoriAPI.create(payload);
      }
      await loadAll();
      resetForm();
    } catch (e) {
      setError(e?.message || 'Failed to save');
    }
  };

  const handleEdit = (s) => {
    setEditingId(s.furnitoriID ?? s.id);
    setForm({
      emri: s.emri || '',
      shtetiID: s.shtetiID ?? '',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) return;
    try {
      await furnitoriAPI.delete(id);
      await loadAll();
    } catch (e) {
      setError(e?.message || 'Failed to delete');
    }
  };

  // Suppliers are already filtered and paginated in loadAll

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#808080" }}>Suppliers Management</h1>
          <p className="text-gray-600 mt-1">Manage suppliers in the system</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-red-600">{editingId ? 'Update Supplier' : 'Add New Supplier'}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Supplier Name</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.emri}
              onChange={e => setForm({ ...form, emri: e.target.value })}
              placeholder="e.g. Pharma Albania"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Country ID</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              type="number"
              value={form.shtetiID}
              onChange={e => setForm({ ...form, shtetiID: e.target.value })}
              placeholder="Optional"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              {editingId ? 'Save Changes' : 'Add Supplier'}
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-red-600">Suppliers List</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
          </div>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Country</th>
                  <th className="py-2 lg:pr-2 lg:sticky lg:right-0 lg:bg-white lg:shadow-lg lg:pl-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(s => {
                  const id = s.furnitoriID ?? s.id;
                  return (
                    <tr key={id} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4">{id}</td>
                      <td className="py-2 pr-4">{s.emri}</td>
                      <td className="py-2 pr-4">{s.shteti.emri_shtetit || '-'}</td>
                      <td className="py-2 lg:pr-2 lg:sticky lg:right-0 lg:bg-white lg:shadow-lg lg:pl-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(s)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Edit Supplier"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Supplier"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {suppliers.length === 0 && (
                  <tr>
                    <td className="py-4 text-center text-gray-500" colSpan={4}>
                      {searchTerm ? 'No suppliers found' : 'No suppliers'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}</span> of <span className="font-medium">{pagination.totalItems}</span> results
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = Math.max(1, pagination.currentPage - 2) + i;
              if (pageNum > pagination.totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 text-sm rounded ${
                    pageNum === pagination.currentPage
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
