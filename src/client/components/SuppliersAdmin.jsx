import { useEffect, useMemo, useState } from 'react';
import { furnitoriAPI } from '../utils/api';

export default function SuppliersAdmin() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ emri: '', shtetiID: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await furnitoriAPI.getAll();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || 'Deshtoi ngarkimi i furnitorëve');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

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
        setError('Emri i furnitorit është i detyrueshëm');
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
      setError(e?.message || 'Deshtoi ruajtja');
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
    if (!window.confirm('A jeni i sigurt që doni ta fshini furnitorin?')) return;
    try {
      await furnitoriAPI.delete(id);
      await loadAll();
    } catch (e) {
      setError(e?.message || 'Deshtoi fshirja');
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.emri?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.furnitoriID?.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-semibold mb-4 text-red-600">{editingId ? 'Përditëso Furnitorin' : 'Shto Furnitor të Ri'}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Emri i Furnitorit</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              value={form.emri}
              onChange={e => setForm({ ...form, emri: e.target.value })}
              placeholder="p.sh. Pharma Albania"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">ID i Shtetit</label>
            <input
              className="w-full border rounded-lg px-3 py-2"
              type="number"
              value={form.shtetiID}
              onChange={e => setForm({ ...form, shtetiID: e.target.value })}
              placeholder="Opsionale"
            />
          </div>
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              {editingId ? 'Ruaj Ndryshimet' : 'Shto Furnitorin'}
            </button>
            {editingId && (
              <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg" onClick={resetForm}>Anulo</button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white shadow rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-red-600">Lista e Furnitorëve</h3>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Kërko furnitor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-2"
            />
            <button className="px-3 py-2 text-sm bg-gray-100 rounded-lg" onClick={loadAll}>Rifresko</button>
          </div>
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
                  <th className="py-2 pr-4">Shteti</th>
                  <th className="py-2 lg:pr-2 lg:sticky lg:right-0 lg:bg-white lg:shadow-lg lg:pl-4">Veprimet</th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map(s => {
                  const id = s.furnitoriID ?? s.id;
                  return (
                    <tr key={id} className="border-b hover:bg-gray-50">
                      <td className="py-2 pr-4">{id}</td>
                      <td className="py-2 pr-4">{s.emri}</td>
                      <td className="py-2 pr-4">{s.shteti.emri_shtetit || '-'}</td>
                      <td className="py-2 lg:pr-2 lg:sticky lg:right-0 lg:bg-white lg:shadow-lg lg:pl-4 space-x-2">
                        <button className="px-3 py-1 text-xs bg-blue-500 text-white rounded" onClick={() => handleEdit(s)}>Edito</button>
                        <button className="px-3 py-1 text-xs bg-red-500 text-white rounded" onClick={() => handleDelete(id)}>Fshij</button>
                      </td>
                    </tr>
                  );
                })}
                {filteredSuppliers.length === 0 && (
                  <tr>
                    <td className="py-4 text-center text-gray-500" colSpan={4}>
                      {searchTerm ? 'Nuk u gjetën furnitorë' : 'Nuk ka furnitorë'}
                    </td>
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
