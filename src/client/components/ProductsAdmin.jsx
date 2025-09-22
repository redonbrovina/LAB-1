import { useEffect, useMemo, useState } from 'react';
import { categoriesAPI, productsAPI } from '../utils/api';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [form, setForm] = useState({ 
    emri: '', 
    pershkrimi: '', 
    kategoriaID: '',
    cmimi: '',
    sasia_ne_stok: '',
    imazhi: '/src/client/assets/images/default-pill-bottle.svg'
  });

  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach(c => map.set(c.KategoriaID ?? c.kategoriaID ?? c.id, c.emri));
    return map;
  }, [categories]);

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [p, c] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll(),
      ]);
      setProducts(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
    } catch (e) {
      setError(e?.message || 'Deshtoi ngarkimi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({ emri: '', pershkrimi: '', kategoriaID: '', cmimi: '', sasia_ne_stok: '', imazhi: '/src/client/assets/images/default-pill-bottle.svg' });
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
        cmimi: Number(form.cmimi) || 0,
        sasia_ne_stok: Number(form.sasia_ne_stok) || 0,
        imazhi: form.imazhi || '/src/client/assets/images/default-pill-bottle.svg',
      };
      
      console.log('Payload:', payload);
      
      if (!payload.emri || !payload.kategoriaID) {
        setError('Emri dhe Kategoria janë të detyrueshme');
        return;
      }
      if (payload.cmimi < 0) {
        setError('Çmimi nuk mund të jetë negative');
        return;
      }
      if (payload.sasia_ne_stok < 0) {
        setError('Sasia në stok nuk mund të jetë negative');
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
      setSuccess(editingId ? 'Produkti u përditësua me sukses!' : 'Produkti u shtua me sukses!');
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

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const created = await categoriesAPI.create({ emri: newCategoryName.trim() });
      setNewCategoryName('');
      await loadAll();
      const cid = created?.KategoriaID ?? created?.kategoriaID ?? created?.id;
      if (cid) setForm(f => ({ ...f, kategoriaID: cid }));
    } catch (e) {
      setError(e?.message || 'Deshtoi krijimi i kategorisë');
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.ProduktiID ?? p.produktiID ?? p.id);
    setForm({
      emri: p.emri || '',
      pershkrimi: p.pershkrimi || '',
      kategoriaID: p.KategoriaID ?? p.kategoriaID ?? '',
      cmimi: p.variacionet?.[0]?.cmimi || '',
      sasia_ne_stok: p.sasia_ne_stok || '', // Fixed: use p.sasia_ne_stok instead of p.variacionet[0].sasia_ne_stok
      imazhi: (p && p.imazhi) ? p.imazhi : '/src/client/assets/images/default-pill-bottle.svg',
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni i sigurt që doni ta fshini produktin?')) return;
    try {
      await productsAPI.delete(id);
      await loadAll();
    } catch (e) {
      setError(e?.message || 'Deshtoi fshirja');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-red-600">{editingId ? 'Përditëso Produktin' : 'Shto Produkt të Ri'}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        {success && <div className="mb-3 text-sm text-green-600">{success}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Emri</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.emri}
              onChange={e => setForm({ ...form, emri: e.target.value })}
              placeholder="p.sh. Paracetamol"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Kategoria</label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={form.kategoriaID}
              onChange={e => setForm({ ...form, kategoriaID: e.target.value })}
            >
              <option value="">Zgjidh kategorinë</option>
              {categories.map(c => (
                <option key={c.KategoriaID ?? c.kategoriaID ?? c.id} value={c.KategoriaID ?? c.kategoriaID ?? c.id}>
                  {c.emri}
                </option>
              ))}
            </select>
            <div className="flex gap-2 mt-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2"
                placeholder="Kategori e re"
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
              />
              <button type="button" className="px-3 py-2 bg-gray-200 rounded-lg" onClick={handleCreateCategory}>Shto</button>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Çmimi (€)</label>
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
            <label className="block text-sm text-gray-600 mb-1">Sasia në Stok</label>
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
            <label className="block text-sm text-gray-600 mb-1">Përshkrimi</label>
            <textarea
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
              value={form.pershkrimi}
              onChange={e => setForm({ ...form, pershkrimi: e.target.value })}
              placeholder="Opsionale"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm text-gray-600 mb-1">Imazhi (URL ose path)</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.imazhi}
              onChange={e => setForm({ ...form, imazhi: e.target.value })}
              placeholder="/src/client/assets/images/default-pill-bottle.svg"
            />
            <p className="text-xs text-gray-500 mt-1">Lëreni bosh për të përdorur imazhin e paracaktuar</p>
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
              {editingId ? 'Ruaj Ndryshimet' : 'Shto Produktin'}
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={resetForm}>Anulo</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-red-600">Lista e Produkteve</h3>
          <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg" onClick={loadAll}>Refresh</button>
        </div>
        {loading ? (
          <div className="text-gray-500">Duke u ngarkuar...</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">ID</th>
                    <th className="py-2 pr-4">Imazhi</th>
                    <th className="py-2 pr-4">Emri</th>
                    <th className="py-2 pr-4">Kategoria</th>
                    <th className="py-2 pr-4">Çmimi</th>
                    <th className="py-2 pr-4">Stok</th>
                    <th className="py-2 pr-4">Përshkrimi</th>
                    <th className="py-2 pr-4">Veprimet</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => {
                    const id = p.ProduktiID ?? p.produktiID ?? p.id;
                    const catId = p.KategoriaID ?? p.kategoriaID;
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
                        <td className="py-2 pr-4">€{p.variacionet?.[0]?.cmimi || '0.00'}</td>
                        <td className="py-2 pr-4">{p.sasia_ne_stok || '0'}</td>
                        <td className="py-2 pr-4 max-w-xl truncate" title={p.pershkrimi || ''}>{p.pershkrimi || '-'}</td>
                        <td className="py-2 pr-4 space-x-2">
                          <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded" onClick={() => handleEdit(p)}>Edito</button>
                          <button className="px-3 py-1 text-xs bg-red-500 text-white rounded" onClick={() => handleDelete(id)}>Fshij</button>
                        </td>
                      </tr>
                    );
                  })}
                  {products.length === 0 && (
                    <tr>
                      <td className="py-4 text-center text-gray-500" colSpan={8}>Nuk ka produkte</td>
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
                            <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded" onClick={() => handleEdit(p)}>Edito</button>
                            <button className="px-3 py-1 text-xs bg-red-500 text-white rounded" onClick={() => handleDelete(id)}>Fshij</button>
                          </div>
                        </div>
                        
                        {/* Second Row - Price, Stock, and Description */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Çmimi:</span>
                            <span className="font-semibold text-gray-900">€{p.variacionet?.[0]?.cmimi || '0.00'}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">Stok:</span>
                            <span className="font-medium text-gray-900">{p.sasia_ne_stok || '0'}</span>
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
                  Nuk ka produkte
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


