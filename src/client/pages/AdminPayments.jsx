import { useEffect, useState } from "react";
import { DollarSign, Plus, Edit, Trash2, CreditCard, Banknote } from "lucide-react";
import { paymentAPI } from "../utils/api";
import AdminNavbar from "../components/admin/AdminNavbar";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const [formData, setFormData] = useState({
    porosiaID: "",
    menyra_pagesesID: "",
    shuma: "",
    status: "pending"
  });

  useEffect(() => {
    fetchPayments();
  }, []);

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
      if (editingPayment && editingPayment.id) {
        await paymentAPI.update(editingPayment.id, formData);
      } else {
        await paymentAPI.create(formData);
      }
      await fetchPayments();
      setShowForm(false);
      setEditingPayment(null);
      setFormData({ porosiaID: "", menyra_pagesesID: "", shuma: "", status: "pending" });
    } catch (error) {
      console.error("Error saving payment:", error);
    }
  };

  const handleEdit = (payment) => {
    setEditingPayment(payment);
    setFormData({
      porosiaID: payment.porosiaID || "",
      menyra_pagesesID: payment.menyra_pagesesID || "",
      shuma: payment.shuma || "",
      status: payment.status || "pending",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("Delete this payment?")) {
      try {
        await paymentAPI.delete(id);
        await fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
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
      <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
        <AdminNavbar />
        <div className="ml-64 flex items-center justify-center h-screen">
          <div className="text-lg">Loading payments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
      <AdminNavbar />
      <div className="ml-64 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Admin Payments
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700"
          >
            <Plus size={20} />
            Add Payment
          </button>
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
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <CreditCard size={24} />
              Completed
            </div>
            <p className="text-2xl font-bold mt-2">
              {payments.filter((p) => p.status === "completed").length}
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-yellow-600 font-semibold">
              <Banknote size={24} />
              Pending
            </div>
            <p className="text-2xl font-bold mt-2">
              {payments.filter((p) => p.status === "pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>

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
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment.id || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{payment.id || index + 1}</td>
                      <td className="py-3 px-4">{payment.porosiaID}</td>
                      <td className="py-3 px-4">{payment.menyra_pagesesID}</td>
                      <td className="py-3 px-4 font-semibold">${payment.shuma}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(payment)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(payment.id)} className="p-1 text-red-600 hover:bg-red-100 rounded">
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
                    <label className="block text-sm font-medium mb-2">Order ID</label>
                    <input
                      type="text"
                      value={formData.porosiaID}
                      onChange={(e) => setFormData({ ...formData, porosiaID: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method ID</label>
                    <input
                      type="text"
                      value={formData.menyra_pagesesID}
                      onChange={(e) => setFormData({ ...formData, menyra_pagesesID: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.shuma}
                      onChange={(e) => setFormData({ ...formData, shuma: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="failed">Failed</option>
                    </select>
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
                      setFormData({ porosiaID: "", menyra_pagesesID: "", shuma: "", status: "pending" });
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
    </div>
  );
}


