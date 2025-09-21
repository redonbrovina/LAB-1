import { useEffect, useState } from "react";
import { DollarSign, Plus, Edit, Trash2, CreditCard, Banknote } from "lucide-react";
import { paymentAPI, paymentMethodsAPI, ordersAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    porosiaID: "",
    menyra_pagesesID: "",
    shuma_pageses: "",
    numri_llogarise: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log("Fetching data for admin payments...");
      
      // Try to fetch each data type separately to identify which one is failing
      let paymentsData = [];
      let paymentMethodsData = [];
      let ordersData = [];
      
      try {
        paymentsData = await paymentAPI.getAll();
        console.log("Payments data:", paymentsData);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
      
      try {
        paymentMethodsData = await paymentMethodsAPI.getAll();
        console.log("Payment methods data:", paymentMethodsData);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
      
      try {
        ordersData = await ordersAPI.getAll();
        console.log("Orders data:", ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // If orders fail, show a message but don't block the page
        alert("Warning: Could not fetch orders. You may need to create some orders first or check your authentication.");
      }
      
      setPayments(Array.isArray(paymentsData) ? paymentsData : []);
      setPaymentMethods(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await paymentAPI.getAll();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = user?.adminID || user?.id || user?.adminId || user?.userId;
      
      if (editingPayment && editingPayment.pagesaID) {
        await paymentAPI.update(editingPayment.pagesaID, formData);
      } else {
        // Add admin ID for B2B logic (admin payment, klientiID should be NULL)
        const paymentData = {
          ...formData,
          klientiID: null,
          adminID: adminId
        };
        await paymentAPI.create(paymentData);
      }
      await fetchData();
      setShowForm(false);
      setEditingPayment(null);
      setFormData({ porosiaID: "", menyra_pagesesID: "", shuma_pageses: "", numri_llogarise: "" });
      alert("Payment saved successfully!");
    } catch (error) {
      console.error("Error saving payment:", error);
      alert(`Error saving payment: ${error.message}`);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      porosiaID: payment.porosiaID || "",
      menyra_pagesesID: payment.menyra_pagesesID || "",
      shuma_pageses: payment.shuma_pageses || "",
      numri_llogarise: payment.numri_llogarise || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Delete this payment?")) {
      try {
        await paymentAPI.delete(id);
        await fetchData();
        alert("Payment deleted successfully!");
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert(`Error deleting payment: ${error.message}`);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading payments...</div>
      </div>
    );
  }

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Admin Payments
          </h1>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
            >
              <Plus size={20} />
              Add Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 font-semibold">
              <DollarSign size={24} />
              Total Payments
            </div>
            <p className="text-2xl font-bold mt-2">{payments.length}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-600 font-semibold">
              <CreditCard size={24} />
              Payment Methods
            </div>
            <p className="text-2xl font-bold mt-2">{paymentMethods.length}</p>
            {paymentMethods.length === 0 && (
              <p className="text-xs text-red-600 mt-1">Create payment methods first</p>
            )}
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <Banknote size={24} />
              Orders Available
            </div>
            <p className="text-2xl font-bold mt-2">{orders.length}</p>
            {orders.length === 0 && (
              <p className="text-xs text-red-600 mt-1">Create orders first</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          
          {/* Debug Information */}
          <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Payments: {payments.length} | Payment Methods: {paymentMethods.length} | Orders: {orders.length}</p>
            <p>Authentication: {localStorage.getItem('token') ? 'Token present' : 'No token'}</p>
          </div>

          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No payments found. Create your first payment above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Method ID</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Account Number</th>
                    <th className="text-left py-3 px-4">Payment Date</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment.pagesaID || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{payment.pagesaID || index + 1}</td>
                      <td className="py-3 px-4">{payment.porosiaID || 'N/A'}</td>
                      <td className="py-3 px-4">{payment.menyra_pagesesID || 'N/A'}</td>
                      <td className="py-3 px-4 font-semibold">${payment.shuma_pageses || '0.00'}</td>
                      <td className="py-3 px-4">{payment.numri_llogarise || 'N/A'}</td>
                      <td className="py-3 px-4">{payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(payment)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(payment.pagesaID)} className="p-1 text-red-600 hover:bg-red-100 rounded">
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

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{editingPayment ? "Edit Payment" : "Add New Payment"}</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <select
                      value={formData.porosiaID}
                      onChange={(e) => setFormData({ ...formData, porosiaID: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select an order</option>
                      {orders.length === 0 ? (
                        <option value="" disabled>No orders available - Create orders first</option>
                      ) : (
                        orders.map((order) => (
                          <option key={order.porosiaID} value={order.porosiaID}>
                            Order #{order.porosiaID} - ${order.cmimi_total || '0.00'}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select
                      value={formData.menyra_pagesesID}
                      onChange={(e) => setFormData({ ...formData, menyra_pagesesID: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select a payment method</option>
                      {paymentMethods.length === 0 ? (
                        <option value="" disabled>No payment methods available - Create payment methods first</option>
                      ) : (
                        paymentMethods
                          .filter(method => method.aktiv === 1)
                          .map((method) => (
                            <option key={method.menyra_pagesesID} value={method.menyra_pagesesID}>
                              {method.menyra_pageses}
                            </option>
                          ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.shuma_pageses}
                      onChange={(e) => setFormData({ ...formData, shuma_pageses: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Account Number</label>
                    <input
                      type="text"
                      value={formData.numri_llogarise}
                      onChange={(e) => setFormData({ ...formData, numri_llogarise: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Optional account number"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    {editingPayment ? "Update" : "Create"} Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPayment(null);
                      setFormData({ porosiaID: "", menyra_pagesesID: "", shuma_pageses: "", numri_llogarise: "" });
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