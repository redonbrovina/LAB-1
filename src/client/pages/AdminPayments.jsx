import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Banknote } from "lucide-react";
import { paymentAPI, paymentMethodsAPI, ordersAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState('all'); // 'all', 'client', 'admin'
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const { user } = useAuth();

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [formData, setFormData] = useState({
    porosiaID: "",
    menyra_pagesesID: "",
    shuma_pageses: "",
    numri_llogarise: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = pagination.currentPage) => {
    setLoading(true);
    try {
      console.log("Fetching data for admin payments...");
      
      // Try to fetch each data type separately to identify which one is failing
      let paymentsData = [];
      let paymentMethodsData = [];
      let ordersData = [];
      
      try {
        const response = await paymentAPI.getPaginated(page, pagination.itemsPerPage);
        paymentsData = response.data;
        setPagination(response.pagination);
        console.log("Payments data:", paymentsData);
      } catch (error) {
        console.error("Error fetching payments:", error);
        // Fallback to getAll if paginated fails
        try {
          paymentsData = await paymentAPI.getAll();
          setPagination({
            currentPage: 1,
            totalPages: 1,
            totalItems: paymentsData.length,
            itemsPerPage: paymentsData.length,
            hasNextPage: false,
            hasPrevPage: false
          });
        } catch (fallbackError) {
          console.error("Error fetching payments (fallback):", fallbackError);
        }
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

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
      fetchData(newPage);
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

  const getFilteredPayments = () => {
    switch (paymentFilter) {
      case 'client':
        return payments.filter(payment => payment.klientiID);
      case 'admin':
        return payments.filter(payment => !payment.klientiID);
      case 'all':
      default:
        return payments;
    }
  };

  const getFilterCounts = () => {
    const clientCount = payments.filter(payment => payment.klientiID).length;
    const adminCount = payments.filter(payment => !payment.klientiID).length;
    return {
      all: payments.length,
      client: clientCount,
      admin: adminCount
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = user?.adminID || user?.id || user?.adminId || user?.userId;
      
      if (editingPayment && editingPayment.pagesaID) {
        // Only allow editing admin payments
        if (!editingPayment.klientiID) {
          await paymentAPI.update(editingPayment.pagesaID, formData);
        } else {
          alert("You can only edit admin payments, not client payments.");
          return;
        }
      } else {
        // Create new admin payment for client orders
        const paymentData = {
          ...formData,
          klientiID: null, // This will be an admin payment
          adminID: adminId
        };
        await paymentAPI.create(paymentData);
      }
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      await fetchData(1);
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
    // Only allow editing admin payments
    if (payment.klientiID) {
      alert("You can only edit admin payments, not client payments.");
      return;
    }
    
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
    
    // Find the payment to check if it's an admin payment
    const payment = payments.find(p => p.pagesaID === id);
    if (payment && payment.klientiID) {
      alert("You can only delete admin payments, not client payments.");
      return;
    }
    
    if (window.confirm("Delete this admin payment?")) {
      try {
        await paymentAPI.delete(id);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        await fetchData(1);
        alert("Payment deleted successfully!");
      } catch (error) {
        console.error("Error deleting payment:", error);
        alert(`Error deleting payment: ${error.message}`);
      }
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
    <div className="p-4 lg:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#808080" }}>
              Admin Payments
            </h1>
            <p className="text-gray-600 mt-1">Manage payments in the system</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPagination(prev => ({ ...prev, currentPage: 1 }));
                fetchData(1);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
              <DollarSign size={20} />
              Add Admin Payment
            </button>
          </div>
        </div>

        {/* Payment Filters */}
        <div className="mb-6">
          <div className="bg-white shadow rounded-2xl p-4">
            <h3 className="text-lg font-semibold mb-4">Filter Payments</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setPaymentFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  paymentFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Payments ({getFilterCounts().all})
              </button>
              <button
                onClick={() => setPaymentFilter('client')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  paymentFilter === 'client'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Client Payments ({getFilterCounts().client})
              </button>
              <button
                onClick={() => setPaymentFilter('admin')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  paymentFilter === 'admin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Admin Payments ({getFilterCounts().admin})
              </button>
            </div>
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
              Client Payments
            </div>
            <p className="text-2xl font-bold mt-2">{getFilterCounts().client}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <Banknote size={24} />
              Admin Payments
            </div>
            <p className="text-2xl font-bold mt-2">{getFilterCounts().admin}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payment History</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> All payments are view-only for audit trail integrity. Payments cannot be edited or deleted once created.
              </p>
            </div>
          </div>

          {getFilteredPayments().length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {payments.length === 0 
                ? "No payments found. Payments will appear here when clients make payments."
                : `No ${paymentFilter} payments found. Try a different filter.`
              }
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Order ID</th>
                    <th className="text-left py-3 px-4">Payment Method</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Account Number</th>
                    <th className="text-left py-3 px-4">Payment Date</th>
                    <th className="text-left py-3 px-4">Payment Type</th>
                    <th className="text-left py-3 px-4">User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredPayments().map((payment, index) => {
                    const paymentMethod = paymentMethods.find(method => method.menyra_pagesesID === payment.menyra_pagesesID);
                    return (
                      <tr key={payment.pagesaID || index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-center">{payment.pagesaID || index + 1}</td>
                        <td className="py-3 px-4 text-center">{payment.porosiaID || 'N/A'}</td>
                        <td className="py-3 px-4 text-center">{paymentMethod?.menyra_pageses || 'N/A'}</td>
                        <td className="py-3 px-4 font-semibold text-center">${payment.shuma_pageses || '0.00'}</td>
                        <td className="py-3 px-4 text-center">{payment.numri_llogarise || 'N/A'}</td>
                        <td className="py-3 px-4 text-center">{payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.klientiID ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {payment.klientiID ? 'Client Payment' : 'Admin Payment'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">{payment.klientiID || payment.adminID || 'N/A'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Payment Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {editingPayment ? "Edit Admin Payment" : "Add New Admin Payment"}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Order</label>
                    <select
                      value={formData.porosiaID}
                      onChange={(e) => setFormData({...formData, porosiaID: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select an order</option>
                      {orders.length === 0 ? (
                        <option value="" disabled>No orders available</option>
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
                      onChange={(e) => setFormData({...formData, menyra_pagesesID: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select a payment method</option>
                      {paymentMethods.length === 0 ? (
                        <option value="" disabled>No payment methods available</option>
                      ) : (
                        paymentMethods.map((method) => (
                          <option key={method.menyra_pagesesID} value={method.menyra_pagesesID}>
                            {method.menyra_pageses}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={formData.shuma_pageses}
                        onChange={(e) => setFormData({...formData, shuma_pageses: e.target.value})}
                        className="w-full border rounded-lg px-8 py-2 pl-8"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Amount to be paid for this order</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Account Number</label>
                    <input
                      type="text"
                      value={formData.numri_llogarise}
                      onChange={(e) => setFormData({...formData, numri_llogarise: e.target.value})}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Optional account number"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    {editingPayment ? 'Update' : 'Create'} Admin Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPayment(null);
                      setFormData({
                        porosiaID: "",
                        menyra_pagesesID: "",
                        shuma_pageses: "",
                        numri_llogarise: ""
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

        {/* Pagination */}
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

    </div>
  );
}