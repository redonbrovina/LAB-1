import ClientNavBar from "../components/ClientNavBar";
import { Package, TrendingUp, TrendingDown, Plus, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function StockMovement() {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovement, setEditingMovement] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    produktiID: "",
    sasia: "",
    lloji: "in",
    data: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/levizje-stok');
      const data = await response.json();
      setMovements(data);
    } catch (error) {
      console.error('Error fetching stock movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    
    try {
      const url = editingMovement 
        ? `http://localhost:5000/api/levizje-stok/${editingMovement.id}`
        : 'http://localhost:5000/api/levizje-stok';
      
      const method = editingMovement ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Stock movement saved:', result);
        
        // Refresh the movements list
        await fetchMovements();
        
        // Close modal and reset form
        setShowForm(false);
        setEditingMovement(null);
        setFormData({
          produktiID: "",
          sasia: "",
          lloji: "in",
          data: new Date().toISOString().split('T')[0]
        });
        
        // Show success message
        setMessage(editingMovement ? 'Stock movement updated successfully!' : 'Stock movement created successfully!');
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessage(errorData.message || 'Failed to save stock movement');
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error('Error saving stock movement:', error);
      setMessage('Network error. Please try again.');
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (movement) => {
    setEditingMovement(movement);
    setFormData({
      produktiID: movement.produktiID || "",
      sasia: movement.sasia || "",
      lloji: movement.lloji || "in",
      data: movement.data ? movement.data.split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock movement?')) {
      try {
        console.log('Attempting to delete stock movement with ID:', id);
        
        const response = await fetch(`http://localhost:5000/api/levizje-stok/${id}`, {
          method: 'DELETE',
        });
        
        console.log('Delete response status:', response.status);
        
        if (response.ok) {
          const result = await response.json();
          console.log('Stock movement deleted successfully:', result);
          
          // Refresh the movements list
          await fetchMovements();
          
          // Show success message
          setMessage('Stock movement deleted successfully!');
          setTimeout(() => setMessage(""), 3000);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Delete failed:', errorData);
          setMessage(errorData.message || `Failed to delete stock movement (Status: ${response.status})`);
          setTimeout(() => setMessage(""), 3000);
        }
      } catch (error) {
        console.error('Error deleting stock movement:', error);
        setMessage('Network error. Please try again.');
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const getMovementTypeColor = (type) => {
    return type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getMovementIcon = (type) => {
    return type === 'in' ? <TrendingUp size={16} /> : <TrendingDown size={16} />;
  };

  const totalIn = movements.filter(m => m.lloji === 'in').reduce((sum, m) => sum + (parseInt(m.sasia) || 0), 0);
  const totalOut = movements.filter(m => m.lloji === 'out').reduce((sum, m) => sum + (parseInt(m.sasia) || 0), 0);

  if (loading) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading stock movements...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Stock Movement Management
          </h1>
          <button
            onClick={() => {
              setEditingMovement(null);
              setFormData({
                produktiID: "",
                sasia: "",
                lloji: "in",
                data: new Date().toISOString().split('T')[0]
              });
              setShowForm(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Movement
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-600 font-semibold">
              <Package size={24} />
              Total Movements
            </div>
            <p className="text-2xl font-bold mt-2">{movements.length}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <TrendingUp size={24} />
              Stock In
            </div>
            <p className="text-2xl font-bold mt-2">{totalIn}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 font-semibold">
              <TrendingDown size={24} />
              Stock Out
            </div>
            <p className="text-2xl font-bold mt-2">{totalOut}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-purple-600 font-semibold">
              <ArrowUpDown size={24} />
              Net Change
            </div>
            <p className={`text-2xl font-bold mt-2 ${totalIn - totalOut >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalIn - totalOut >= 0 ? '+' : ''}{totalIn - totalOut}
            </p>
          </div>
        </div>

        {/* Stock Movements Table */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Stock Movement History</h2>
          
          {movements.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No stock movements found. Create your first movement above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Product ID</th>
                    <th className="text-left py-3 px-4">Quantity</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.map((movement, index) => (
                    <tr key={movement.id || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{movement.produktiID || `Product #${index + 1}`}</td>
                      <td className="py-3 px-4 font-semibold">{movement.sasia || '0'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${getMovementTypeColor(movement.lloji)}`}>
                          {getMovementIcon(movement.lloji)}
                          {movement.lloji === 'in' ? 'Stock In' : 'Stock Out'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {movement.data ? new Date(movement.data).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(movement)}
                            className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(movement.id || index)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add/Edit Stock Movement Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingMovement ? 'Edit Stock Movement' : 'Add New Stock Movement'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMovement(null);
                    setFormData({
                      produktiID: "",
                      sasia: "",
                      lloji: "in",
                      data: new Date().toISOString().split('T')[0]
                    });
                    setMessage("");
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  disabled={submitting}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product ID (Optional)</label>
                    <input
                      type="text"
                      value={formData.produktiID}
                      onChange={(e) => setFormData({...formData, produktiID: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter product ID (optional)"
                    />
                    <p className="text-xs text-gray-500 mt-1">Note: Product ID is optional for stock movements</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.sasia}
                      onChange={(e) => setFormData({...formData, sasia: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Movement Type</label>
                    <select
                      value={formData.lloji}
                      onChange={(e) => setFormData({...formData, lloji: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="in">Stock In</option>
                      <option value="out">Stock Out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.data}
                      onChange={(e) => setFormData({...formData, data: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex-1 py-2 rounded-lg text-white ${
                      submitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {submitting 
                      ? (editingMovement ? 'Updating...' : 'Creating...') 
                      : (editingMovement ? 'Update' : 'Create') + ' Movement'
                    }
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setShowForm(false);
                      setEditingMovement(null);
                      setFormData({
                        produktiID: "",
                        sasia: "",
                        lloji: "in",
                        data: new Date().toISOString().split('T')[0]
                      });
                      setMessage("");
                    }}
                    className={`flex-1 py-2 rounded-lg ${
                      submitting 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
