import { CreditCard, Wallet, Smartphone, Plus, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  const [formData, setFormData] = useState({
    menyra_pageses: "",
    pershkrimi: ""
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/menyra-pageses');
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingMethod 
        ? `http://localhost:5000/api/menyra-pageses/${editingMethod.menyra_pagesesID}`
        : 'http://localhost:5000/api/menyra-pageses';
      
      const method = editingMethod ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchPaymentMethods();
        setShowForm(false);
        setEditingMethod(null);
        setFormData({
          menyra_pageses: "",
          pershkrimi: ""
        });
        alert(editingMethod ? 'Payment method updated successfully!' : 'Payment method created successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to save payment method'}`);
      }
    } catch (error) {
      console.error('Error saving payment method:', error);
      alert('Error saving payment method. Please try again.');
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setFormData({
      menyra_pageses: method.menyra_pageses || "",
      pershkrimi: method.pershkrimi || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/menyra-pageses/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPaymentMethods();
          alert('Payment method deleted successfully!');
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to delete payment method'}`);
        }
      } catch (error) {
        console.error('Error deleting payment method:', error);
        alert('Error deleting payment method. Please try again.');
      }
    }
  };


  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete ALL payment methods? This action cannot be undone!')) {
      try {
        const response = await fetch('http://localhost:5000/api/menyra-pageses', {
          method: 'DELETE',
        });
        if (response.ok) {
          const result = await response.json();
          alert(result.message || 'All payment methods deleted successfully');
          fetchPaymentMethods();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to delete all payment methods'}`);
        }
      } catch (error) {
        console.error('Error deleting all payment methods:', error);
        alert('Error deleting all payment methods. Please try again.');
      }
    }
  };

  const getPaymentMethodIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('card') || lowerName.includes('credit')) {
      return <CreditCard size={24} className="text-blue-600" />;
    } else if (lowerName.includes('cash') || lowerName.includes('cash')) {
      return <Wallet size={24} className="text-green-600" />;
    } else if (lowerName.includes('mobile') || lowerName.includes('digital')) {
      return <Smartphone size={24} className="text-purple-600" />;
    }
    return <CreditCard size={24} className="text-gray-600" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading payment methods...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
          Payment Methods Management
        </h1>
        <div className="flex gap-3">
          {paymentMethods.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
            >
              <Trash2 size={20} />
              Delete All
            </button>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Method
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="mb-8">
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex items-center gap-3 text-green-600 font-semibold mb-4">
            <CreditCard size={24} />
            Payment Methods Overview
          </div>
          <p className="text-2xl font-bold">{paymentMethods.length} methods configured</p>
          {paymentMethods.length === 0 && (
            <div className="flex items-center gap-2 mt-2 text-orange-600">
              <span className="text-sm">No payment methods configured - clients cannot make payments</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Methods Grid */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Manage Payment Methods</h2>
        
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <CreditCard size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg mb-2">No payment methods configured</p>
            <p className="text-sm">Add your first payment method to enable client payments</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <div key={method.menyra_pagesesID || index} className="border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  {getPaymentMethodIcon(method.menyra_pageses || 'Default')}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(method)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(method.menyra_pagesesID)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">
                  {method.menyra_pageses || `Payment Method ${index + 1}`}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {method.pershkrimi || 'No description available'}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    ID: {method.menyra_pagesesID}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Payment Method Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Method Name</label>
                  <input
                    type="text"
                    value={formData.menyra_pageses}
                    onChange={(e) => setFormData({...formData, menyra_pageses: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., Credit Card, PayPal, Bank Transfer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.pershkrimi}
                    onChange={(e) => setFormData({...formData, pershkrimi: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Optional description for this payment method"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  {editingMethod ? 'Update' : 'Create'} Method
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMethod(null);
                    setFormData({
                      menyra_pageses: "",
                      pershkrimi: ""
                    });
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
