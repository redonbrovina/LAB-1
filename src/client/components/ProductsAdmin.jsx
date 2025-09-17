import { useEffect, useMemo, useState } from 'react';
import { categoriesAPI, productsAPI } from '../utils/api';
import AdminNavbar from './admin/AdminNavbar';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [form, setForm] = useState({ emri: '', pershkrimi: '', KategoriaID: '' });

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
    setForm({ emri: '', pershkrimi: '', KategoriaID: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        emri: form.emri,
        pershkrimi: form.pershkrimi || null,
        KategoriaID: Number(form.KategoriaID),
      };
      if (!payload.emri || !payload.KategoriaID) {
        setError('Emri dhe Kategoria janë të detyrueshme');
        return;
      }

      if (editingId) {
        await productsAPI.update(editingId, payload);
      } else {
        await productsAPI.create(payload);
      }
      await loadAll();
      resetForm();
    } catch (e) {
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
      if (cid) setForm(f => ({ ...f, KategoriaID: cid }));
    } catch (e) {
      setError(e?.message || 'Deshtoi krijimi i kategorisë');
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.ProduktiID ?? p.produktiID ?? p.id);
    setForm({
      emri: p.emri || '',
      pershkrimi: p.pershkrimi || '',
      KategoriaID: p.KategoriaID ?? p.kategoriaID ?? '',
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
      <AdminNavbar />
      <div className="bg-white shadow rounded-2xl p-6 ml-66">
        <h3 className="font-semibold mb-4 text-red-600">{editingId ? 'Përditëso Produktin' : 'Shto Produkt të Ri'}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
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
              value={form.KategoriaID}
              onChange={e => setForm({ ...form, KategoriaID: e.target.value })}
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
          <div className="md:col-span-3 flex gap-3">
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              {editingId ? 'Ruaj Ndryshimet' : 'Shto Produktin'}
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={resetForm}>Anulo</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-2xl p-6 ml-66">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-red-600">Lista e Produkteve</h3>
          <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg" onClick={loadAll}>Refresh</button>
        </div>
        {loading ? (
          <div className="text-gray-500">Duke u ngarkuar...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Emri</th>
                  <th className="py-2 pr-4">Kategoria</th>
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
                      <td className="py-2 pr-4">{p.emri}</td>
                      <td className="py-2 pr-4">{categoryMap.get(catId) || catId || '-'}</td>
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
                    <td className="py-4 text-center text-gray-500" colSpan={5}>Nuk ka produkte</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}


