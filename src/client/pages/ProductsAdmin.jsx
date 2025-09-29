import { useEffect, useMemo, useState } from 'react';
import { categoriesAPI, productsAPI, apiGet } from '../utils/api';
import { Edit3, Trash2 } from 'lucide-react';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dosages, setDosages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ 
    emri: '', 
    pershkrimi: '', 
    kategoriaID: '',
    dozaID: '',
    cmimi: '',
    sasia_ne_stok: '',
    imazhi: '/src/client/assets/images/default-pill-bottle.svg'
  });

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach(c => map.set(c.KategoriaID ?? c.kategoriaID ?? c.id, c.emri));
    return map;
  }, [categories]);

  const dosageMap = useMemo(() => {
    const map = new Map();
    dosages.forEach(d => map.set(d.dozaID, d.doza));
    return map;
  }, [dosages]);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [p, c, d] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
        apiGet('/doza/'),
      ]);
      setProducts(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
      setDosages(Array.isArray(d) ? d : []);
    } catch (e) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ emri: '', pershkrimi: '', kategoriaID: '', dozaID: '', cmimi: '', sasia_ne_stok: '', imazhi: '/src/client/assets/images/default-pill-bottle.svg' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log('Form submission started...');
    console.log('Form data:', form);
    
    try {
      const payload = {
        emri: form.emri,
        pershkrimi: form.pershkrimi || null,
        kategoriaID: Number(form.kategoriaID),
        dozaID: form.dozaID ? Number(form.dozaID) : null,
        cmimi: Number(form.cmimi) || 0,
        sasia_ne_stok: Number(form.sasia_ne_stok) || 0,
        imazhi: form.imazhi || '/src/client/assets/images/default-pill-bottle.svg',
      };
      
      console.log('Payload:', payload);
      
      if (!payload.emri || !payload.kategoriaID) {
        setError('Name and Category are required');
        return;
      }
      if (payload.cmimi < 0) {
        setError('Price cannot be negative');
        return;
      }
      if (payload.sasia_ne_stok < 0) {
        setError('Stock quantity cannot be negative');
        return;
      }

      console.log('Validation passed, calling API...');
      
      if (editingId) {
        console.log('Updating product with ID:', editingId);
        await productsAPI.update(editingId, payload);
      } else {
        console.log('Creating new product...');
        await productsAPI.create(payload);
      }
      
      console.log('API call successful, reloading data...');
      await loadAll();
      resetForm();
      setSuccess(editingId ? 'Product updated successfully!' : 'Product added successfully!');
      console.log('Product added/updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (e) {
      console.error('Error in handleSubmit:', e);
      setError(e?.message || 'Deshtoi ruajtja');
    }
  };


  const handleEdit = (p) => {
    setEditingId(p.ProduktiID ?? p.produktiID ?? p.id);
    setForm({
      emri: p.emri || '',
      pershkrimi: p.pershkrimi || '',
      kategoriaID: p.KategoriaID ?? p.kategoriaID ?? '',
      dozaID: p.dozaID ?? '',
      cmimi: p.cmimi || '',
      sasia_ne_stok: p.sasia_ne_stok || '', // Fixed: use p.sasia_ne_stok instead of p.variacionet[0].sasia_ne_stok
      imazhi: (p && p.imazhi) ? p.imazhi : '/src/client/assets/images/default-pill-bottle.svg',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productsAPI.delete(id);
      await loadAll();
    } catch (e) {
      setError(e?.message || 'Failed to delete');
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#808080" }}>Products Management</h1>
          <p className="text-gray-600 mt-1">Manage products in the system</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-red-600">{editingId ? 'Update Product' : 'Add New Product'}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-3 text-sm text-green-600">{success}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.emri}
              onChange={e => setForm({ ...form, emri: e.target.value })}
              placeholder="p.sh. Paracetamol"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={form.kategoriaID}
              onChange={e => setForm({ ...form, kategoriaID: e.target.value })}
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.KategoriaID ?? c.kategoriaID ?? c.id} value={c.KategoriaID ?? c.kategoriaID ?? c.id}>
                  {c.emri}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Dosage (ml)</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={form.dozaID}
              onChange={e => setForm({ ...form, dozaID: e.target.value })}
            >
              <option value="">Select dosage</option>
              {dosages.map(d => (
                <option key={d.dozaID} value={d.dozaID}>
                  {d.doza} ml
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Price (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="w-full border rounded-lg px-3 py-2"
              value={form.cmimi}
              onChange={e => setForm({ ...form, cmimi: e.target.value })}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Stock Quantity</label>
            <input
              type="number"
              min="0"
              className="w-full border rounded-lg px-3 py-2"
              value={form.sasia_ne_stok}
              onChange={e => setForm({ ...form, sasia_ne_stok: e.target.value })}
              placeholder="0"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              value={form.pershkrimi}
              onChange={e => setForm({ ...form, pershkrimi: e.target.value })}
              placeholder="Opsionale"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Image (URL or path)</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.imazhi}
              onChange={e => setForm({ ...form, imazhi: e.target.value })}
              placeholder="/src/client/assets/images/default-pill-bottle.svg"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
          </div>
          <div className="md:col-span-3 flex gap-3">
            <button 
              type="submit" 
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={(e) => {
                console.log('Submit button clicked!');
                console.log('Form state:', form);
              }}
            >
              {editingId ? 'Save Changes' : 'Add Product'}
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={resetForm}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-red-600">Products List</h3>
        </div>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Image</th>
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Dosage</th>
                    <th className="py-2 pr-4">Price</th>
                    <th className="py-2 pr-4">Stock</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => {
                    const id = p.ProduktiID ?? p.produktiID ?? p.id;
                    const catId = p.KategoriaID ?? p.kategoriaID;
                    const dosageId = p.dozaID;
                    return (
                      <tr key={id} className="border-b hover:bg-gray-50">
                        <td className="py-2 pr-4">{id}</td>
                        <td className="py-2 pr-4">
                          <div className="w-12 h-12">
                            <img 
                              src={(p && p.imazhi) ? p.imazhi : '/src/client/assets/images/default-pill-bottle.svg'} 
                              alt={p?.emri || 'Product'}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = '/src/client/assets/images/default-pill-bottle.svg';
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2 pr-4">{p.emri}</td>
                        <td className="py-2 pr-4">{categoryMap.get(catId) || catId || '-'}</td>
                        <td className="py-2 pr-4">{dosageMap.get(dosageId) ? `${dosageMap.get(dosageId)} ml` : '-'}</td>
                        <td className="py-2 pr-4">€{p.cmimi || '0.00'}</td>
                        <td className="py-2 pr-4">{p.sasia_ne_stok || '0'}</td>
                        <td className="py-2 pr-4 max-w-xl truncate" title={p.pershkrimi || ''}>{p.pershkrimi || '-'}</td>
                        <td className="py-2 pr-4 space-x-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td className="py-4 text-center text-gray-500" colSpan={9}>No products</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {products.length > 0 ? (
                <div className="space-y-4">
                  {products.map(p => {
                    const id = p.ProduktiID ?? p.produktiID ?? p.id;
                    const catId = p.KategoriaID ?? p.kategoriaID;
                    const dosageId = p.dozaID;
                    
                    return (
                      <div key={id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {/* First Row - Image, Name, and Actions */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-16 h-16 flex-shrink-0">
                            <img 
                              src={(p && p.imazhi) ? p.imazhi : '/src/client/assets/images/default-pill-bottle.svg'} 
                              alt={p?.emri || 'Product'}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = '/src/client/assets/images/default-pill-bottle.svg';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{p.emri}</div>
                            <div className="text-sm text-gray-500">ID: {id}</div>
                            <div className="text-sm text-gray-600">{categoryMap.get(catId) || catId || '-'}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(p)}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Second Row - Price, Stock, Dosage, and Description */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Price:</span>
                            <span className="font-semibold text-gray-900">€{p.cmimi || '0.00'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Stock:</span>
                            <span className="font-medium text-gray-900">{p.sasia_ne_stok || '0'}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Dosage:</span>
                            <span className="font-medium text-gray-900">{dosageMap.get(dosageId) ? `${dosageMap.get(dosageId)} ml` : '-'}</span>
                          </div>
                          
                          {p.pershkrimi && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Përshkrimi:</span>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{p.pershkrimi}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No products
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


