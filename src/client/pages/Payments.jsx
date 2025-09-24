import ClientNavBar from "../components/ClientNavBar";
import { DollarSign, Plus, CreditCard, Banknote } from "lucide-react";
import { useState, useEffect } from "react";
import { paymentAPI, paymentMethodsAPI, cartAPI, cartItemsAPI, ordersAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProductForPayment, setSelectedProductForPayment] = useState(null);
  const { user, defaultPaymentMethod } = useAuth();

  // Pagination state for payments
  const [visiblePaymentsCount, setVisiblePaymentsCount] = useState(5);

  const [formData, setFormData] = useState({
    menyra_pagesesID: defaultPaymentMethod || "",
    shuma_pageses: "",
    numri_llogarise: ""
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [paymentsData, paymentMethodsData, cartItemsData] = await Promise.all([
        paymentAPI.getAll(),
        paymentMethodsAPI.getAll(),
        cartItemsAPI.getAll()
      ]);
      
      // Filter payments to show only current client's data
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId || user?.klienti_id;
      
      // Filter payments to show only current client's payments
      const clientPayments = Array.isArray(paymentsData) 
        ? paymentsData.filter(payment => payment.klientiID == clientId)
        : [];

      // Get user's cart and filter cart items
      const carts = await cartAPI.getAll();
      const cartsArray = Array.isArray(carts) ? carts : [];
      const userCart = cartsArray.find(c => c.klientiID === clientId);
      
      const clientCartItems = userCart 
        ? Array.isArray(cartItemsData) 
          ? cartItemsData.filter(item => item.cartID === userCart.cartID)
          : []
        : [];
      
      setPayments(clientPayments);
      setPaymentMethods(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
      setCartItems(clientCartItems);
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

  const handleCartItemClick = (cartItem) => {
    // Calculate total price for this cart item
    const totalPrice = cartItem.sasia * cartItem.cmimi;
    
    // Store the selected cart item for later removal
    setSelectedProductForPayment(cartItem);
    
    // Set form data with cart item information and default payment method
    setFormData({
      menyra_pagesesID: defaultPaymentMethod || "",
      shuma_pageses: totalPrice.toString(),
      numri_llogarise: ""
    });
    
    // Show the form
    setShowForm(true);
  };

  const handlePayAllCartItems = () => {
    // Calculate total price for all cart items
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.sasia * item.cmimi), 0);
    
    // Set form data with total cart amount and default payment method
    setFormData({
      menyra_pagesesID: defaultPaymentMethod || "",
      shuma_pageses: totalPrice.toString(),
      numri_llogarise: ""
    });
    
    // Clear selected product since we're paying for all
    setSelectedProductForPayment(null);
    
    // Show the form
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Try different possible field names for client ID
      const clientId = user?.klientiID || user?.id || user?.clientId || user?.userId || user?.klienti_id;
      
      // Validate that we have a client ID
      if (!clientId) {
        alert('Error: Client ID not found. Please log in again.');
        return;
      }

      // First, create an order with the cart items
      let orderId = null;
      if (selectedProductForPayment) {
        // Single item payment - create order for this item
        const orderData = {
          klientiID: clientId,
          cmimi_total: (selectedProductForPayment.sasia * selectedProductForPayment.cmimi).toString(),
          produktet: [{
            produkt_variacioniID: selectedProductForPayment.produkt_variacioniID,
            sasia: selectedProductForPayment.sasia,
            cmimi: selectedProductForPayment.cmimi
          }]
        };
        const order = await ordersAPI.create(orderData);
        orderId = order.porosiaID;
      } else {
        // Pay all - create order for all cart items
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.sasia * item.cmimi), 0);
        const orderData = {
          klientiID: clientId,
          cmimi_total: totalAmount.toString(),
          produktet: cartItems.map(item => ({
            produkt_variacioniID: item.produkt_variacioniID,
            sasia: item.sasia,
            cmimi: item.cmimi
          }))
        };
        const order = await ordersAPI.create(orderData);
        orderId = order.porosiaID;
      }
      
      // Now create payment with the order ID
      const paymentData = {
        ...formData,
        porosiaID: orderId,
        klientiID: clientId,
        adminID: null
      };
      await paymentAPI.create(paymentData);
      
      // Remove cart items after payment
      if (selectedProductForPayment && selectedProductForPayment.produkti_cartID) {
        // Remove single cart item
        try {
          await cartItemsAPI.delete(selectedProductForPayment.produkti_cartID);
          console.log('Cart item removed after payment');
        } catch (deleteError) {
          console.error('Error removing cart item:', deleteError);
          // Don't fail the payment if cart item deletion fails
        }
      } else {
        // Remove all cart items (pay all)
        try {
          for (const cartItem of cartItems) {
            await cartItemsAPI.delete(cartItem.produkti_cartID);
          }
          console.log('All cart items removed after payment');
        } catch (deleteError) {
          console.error('Error removing cart items:', deleteError);
          // Don't fail the payment if cart item deletion fails
        }
      }
      
      await fetchData();
      setShowForm(false);
      setSelectedProductForPayment(null);
      setFormData({
        menyra_pagesesID: defaultPaymentMethod || "",
        shuma_pageses: "",
        numri_llogarise: ""
      });
      if (selectedProductForPayment) {
        alert("Payment saved successfully! Item removed from cart.");
      } else {
        alert("Payment saved successfully! All items removed from cart.");
      }
    } catch (error) {
      console.error('Error saving payment:', error);
      alert(`Error saving payment: ${error.message}`);
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
            <div className="flex items-center gap-3 text-yellow-600 font-semibold">
              <Banknote size={24} />
              Pending
            </div>
            <p className="text-2xl font-bold mt-2">
              {cartItems.length}
            </p>
          </div>
        </div>

         {/* Pending Cart Items */}
         {cartItems.length > 0 && (
           <div className="bg-white shadow rounded-2xl p-6 mb-8">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold text-yellow-600">Pending Payments (Cart Items)</h2>
               <div className="flex items-center gap-4">
                 <div className="text-sm text-gray-600">
                   {cartItems.length} items in cart
                 </div>
                 <button
                   onClick={handlePayAllCartItems}
                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                 >
                   <DollarSign size={16} />
                   Pay All ({cartItems.reduce((sum, item) => sum + (item.sasia * item.cmimi), 0).toFixed(2)}€)
                 </button>
               </div>
             </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartItems.map((item, index) => (
                <div 
                  key={item.produkti_cartID || index} 
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => handleCartItemClick(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-yellow-800">
                      Product #{item.produkt_variacioniID}
                    </div>
                    <div className="text-xs text-yellow-600 bg-yellow-200 px-2 py-1 rounded">
                      Pending
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{item.sasia}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">€{item.cmimi}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm font-semibold text-yellow-800 border-t border-yellow-200 pt-2">
                      <span>Total:</span>
                      <span>€{(item.sasia * item.cmimi).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-yellow-600 text-center">
                    Click to add payment
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
              
              {/* Product Details Display */}
              {selectedProductForPayment ? (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Produkti për Pagesë:</h3>
                  <div className="text-sm text-green-700">
                    <p><strong>Produkt:</strong> Product #{selectedProductForPayment.produkt_variacioniID}</p>
                    <p><strong>Sasia:</strong> {selectedProductForPayment.sasia}</p>
                    <p><strong>Çmimi për njësi:</strong> {selectedProductForPayment.cmimi}€</p>
                    <p><strong>Totali:</strong> {(selectedProductForPayment.sasia * selectedProductForPayment.cmimi).toFixed(2)}€</p>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Të Gjitha Produktet në Cart:</h3>
                  <div className="text-sm text-blue-700">
                    <p><strong>Numri i produkteve:</strong> {cartItems.length}</p>
                    <p><strong>Totali i cart-it:</strong> {cartItems.reduce((sum, item) => sum + (item.sasia * item.cmimi), 0).toFixed(2)}€</p>
                  </div>
                </div>
              )}
              
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
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Create Payment
                  </button>
                   <button
                     type="button"
                     onClick={() => {
                       setShowForm(false);
                       setSelectedProductForPayment(null);
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