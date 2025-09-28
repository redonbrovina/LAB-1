import ClientNavBar from "../components/ClientNavBar";
import { DollarSign, Plus, CreditCard, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { paymentAPI, paymentMethodsAPI, ordersAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const { user, defaultPaymentMethod } = useAuth();

  // Pagination state for payments
  const [visiblePaymentsCount, setVisiblePaymentsCount] = useState(5);

  const [formData, setFormData] = useState({
    menyra_pagesesID: defaultPaymentMethod || "",
    shuma_pageses: "",
    numri_llogarise: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [paymentsData, paymentMethodsData] = await Promise.all([
        paymentAPI.getAll(),
        paymentMethodsAPI.getAll()
      ]);
      
      // Get user's client ID
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId || user?.klienti_id;
      
      // Filter payments to show only current client's payments
      const clientPayments = Array.isArray(paymentsData) 
        ? paymentsData.filter(payment => payment.klientiID == clientId)
        : [];

      // Fetch pending orders for this client (pagesa_statusID = 1 = "Ne pritje")
      const allOrders = await ordersAPI.getByClientId(clientId);
      const ordersArray = Array.isArray(allOrders) ? allOrders : [];
      
      // Filter orders with pagesa_statusID = 1 (Ne pritje - pending)
      const pendingOrdersList = ordersArray.filter(order => 
        order.pagesa_statusID === 1
      );
      
      setPayments(clientPayments);
      setPaymentMethods(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
      setPendingOrders(pendingOrdersList);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await paymentAPI.getAll();
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId;
      
      // Filter payments to show only current client's payments
      const clientPayments = Array.isArray(data) 
        ? data.filter(payment => payment.klientiID == clientId)
        : [];
      
      setPayments(clientPayments);
    } catch (error) {
      console.error('Error fetching payments:', error);
      alert('Error fetching payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    // Store the selected order for payment
    setSelectedOrderForPayment(order);
    
    // Set form data with order information and default payment method
    setFormData({
      menyra_pagesesID: defaultPaymentMethod || "",
      shuma_pageses: order.cmimi_total || "0",
      numri_llogarise: ""
    });
    
    // Show the form
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try different possible field names for client ID
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId || user?.klienti_id;
      
      // Validate that we have a client ID
      if (!clientId) {
        alert('Error: Client ID not found. Please log in again.');
        return;
      }

      // Pay for the selected pending order
      const orderId = selectedOrderForPayment.porosiaID;
      
      // Create payment with the order ID
      const paymentData = {
        ...formData,
        porosiaID: orderId,
        klientiID: clientId,
        adminID: null
      };
      await paymentAPI.create(paymentData);
      
      // Update order payment status to "Paid" (2)
      await ordersAPI.update(orderId, { pagesa_statusID: 2 });
      
      await fetchData();
      setShowForm(false);
      setSelectedOrderForPayment(null);
      setFormData({
        menyra_pagesesID: defaultPaymentMethod || "",
        shuma_pageses: "",
        numri_llogarise: ""
      });
      
      alert(`Payment saved successfully for Order #${selectedOrderForPayment.porosiaID}!`);
    } catch (error) {
      console.error('Error saving payment:', error);
      alert(`Error saving payment: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Pagination functions for payments
  const showMorePayments = () => {
    setVisiblePaymentsCount(prev => prev + 5);
  };

  const resetPaymentsPagination = () => {
    setVisiblePaymentsCount(5);
  };

  // Get visible payments based on pagination
  const visiblePayments = payments.slice(0, visiblePaymentsCount);
  const hasMorePayments = payments.length > visiblePaymentsCount;

  if (loading) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 lg:ml-0 flex items-center justify-center">
          <div className="text-lg">Loading payments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

            <div className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: "#808080" }}>
            Payment Management
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-green-600 font-semibold">
              <DollarSign size={24} />
              Total Payments
            </div>
            <p className="text-2xl font-bold mt-2">{payments.length}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-blue-600 font-semibold">
              <CreditCard size={24} />
              Completed
            </div>
            <p className="text-2xl font-bold mt-2">
              {payments.filter(p => p.status === 'completed').length}
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <div className="flex items-center gap-3 text-red-600 font-semibold">
              <Banknote size={24} />
              Pending Orders
            </div>
            <p className="text-2xl font-bold mt-2">
              {pendingOrders.length}
            </p>
          </div>
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div className="bg-white shadow rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-red-600">Pending Orders</h2>
              <div className="text-sm text-gray-600">
                {pendingOrders.length} unpaid orders
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingOrders.map((order, index) => (
                <div 
                  key={order.porosiaID || index} 
                  className="bg-red-50 border border-red-200 rounded-lg p-4 cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => handleOrderClick(order)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-red-800">
                      Order #{order.porosiaID}
                    </div>
                    <div className="text-xs text-red-600 bg-red-200 px-2 py-1 rounded">
                      Pending Payment
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">
                        {order.koha_krijimit ? new Date(order.koha_krijimit).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm font-semibold text-red-800 border-t border-red-200 pt-2">
                      <span>Total Amount:</span>
                      <span>€{order.cmimi_total || '0.00'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-red-600 text-center">
                    Click to pay for this order
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Table */}
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Payment History</h2>
            {payments.length > 0 && (
              <div className="text-sm text-gray-600">
                {payments.length} pagesa total
              </div>
            )}
          </div>
          
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">No payments found</p>
              <p className="text-sm">You haven't made any payments yet. Create your first payment above.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Order ID</th>
                      <th className="text-left py-3 px-4">Payment Method</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">Account Number</th>
                      <th className="text-left py-3 px-4">Payment Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePayments.map((payment, index) => {
                      const paymentMethod = paymentMethods.find(method => method.menyra_pagesesID === payment.menyra_pagesesID);
                      return (
                        <tr key={payment.pagesaID || index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{payment.pagesaID || index + 1}</td>
                          <td className="py-3 px-4">{payment.porosiaID || 'N/A'}</td>
                          <td className="py-3 px-4">{paymentMethod?.menyra_pageses || 'N/A'}</td>
                          <td className="py-3 px-4 font-semibold">${payment.shuma_pageses || '0.00'}</td>
                          <td className="py-3 px-4">{payment.numri_llogarise || 'N/A'}</td>
                          <td className="py-3 px-4">{payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}</td>
                          <td className="py-3 px-4">
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {visiblePayments.map((payment, index) => {
                  const paymentMethod = paymentMethods.find(method => method.menyra_pagesesID === payment.menyra_pagesesID);
                  return (
                    <div key={payment.pagesaID || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium" style={{ color: "#808080" }}>
                            Payment #{payment.pagesaID || index + 1}
                          </div>
                          <div className="text-sm text-gray-500">
                            Order ID: {payment.porosiaID || 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: "#808080" }}>Method:</span>
                          <span className="text-sm">{paymentMethod?.menyra_pageses || 'N/A'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: "#808080" }}>Amount:</span>
                          <span className="font-semibold">${payment.shuma_pageses || '0.00'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: "#808080" }}>Account:</span>
                          <span className="text-sm">{payment.numri_llogarise || 'N/A'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium" style={{ color: "#808080" }}>Date:</span>
                          <span className="text-sm">
                            {payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show More Button */}
              {hasMorePayments && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={showMorePayments}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                  >
                    <DollarSign size={16} />
                    Trego më shumë pagesa
                  </button>
                </div>
              )}

              {/* Show Less Button (when showing all payments) */}
              {!hasMorePayments && payments.length > 5 && (
                <div className="flex justify-center pt-6">
                  <button
                    onClick={resetPaymentsPagination}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  >
                    Fsheh pagesat e tjera
                  </button>
                </div>
              )}

              {/* Pagination Info */}
              {payments.length > 0 && (
                <div className="mt-4 text-center text-sm text-gray-600">
                  Duke shfaqur {visiblePayments.length} nga {payments.length} pagesa
                </div>
              )}
            </>
          )}
        </div>

        {/* Add Payment Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                Add New Payment
              </h2>
              
              {/* Payment Details Display */}
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Order Payment:</h3>
                <div className="text-sm text-red-700">
                  <p><strong>Order ID:</strong> #{selectedOrderForPayment.porosiaID}</p>
                  <p><strong>Order Date:</strong> {selectedOrderForPayment.koha_krijimit ? new Date(selectedOrderForPayment.koha_krijimit).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Total Amount:</strong> €{selectedOrderForPayment.cmimi_total || '0.00'}</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">

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
                         min="0"
                         value={formData.shuma_pageses}
                         onChange={(e) => setFormData({...formData, shuma_pageses: e.target.value})}
                         className="w-full border rounded-lg px-8 py-2 pl-8"
                         placeholder="0.00"
                         required
                       />
                     </div>
                     <p className="text-xs text-gray-500 mt-1">Enter the payment amount</p>
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
                    disabled={isSubmitting}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? 'Creating Payment...' : 'Create Payment'}
                  </button>
                   <button
                     type="button"
                     onClick={() => {
                       setShowForm(false);
                       setSelectedOrderForPayment(null);
                       setFormData({
                         menyra_pagesesID: defaultPaymentMethod || "",
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
      </div>
    </div>
  );
}