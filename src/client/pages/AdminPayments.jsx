import { useEffect, useState } from "react";
import { DollarSign, CreditCard, Banknote, Plus, Eye, Package, Truck } from "lucide-react";
import { paymentAPI, paymentMethodsAPI, furnitoriAPI, productsAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState('all'); // 'all', 'client', 'admin'
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  });

  const [formData, setFormData] = useState({
    menyra_pagesesID: "",
    shuma_pageses: "",
    numri_llogarise: "",
    furnitoriID: "",
    produktiID: "",
    sasia: "",
    cmimiPerNjesi: "",
    pershkrimi: ""
  });

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async (page = pagination.currentPage) => {
    setLoading(true);
    try {
      console.log("Fetching data for admin payments...");
      
      // Check if user is authenticated
      if (!user) {
        console.error("User not authenticated");
        alert("Please log in to access admin payments");
        return;
      }
      
      // Fetch all data in parallel
      const [paymentsData, paymentMethodsData, suppliersData, productsData] = await Promise.all([
        paymentAPI.getPaginated(page, pagination.itemsPerPage).catch(() => paymentAPI.getAll()),
        paymentMethodsAPI.getAll(),
        furnitoriAPI.getAll(),
        productsAPI.getAll()
      ]);
      
      // Handle paginated response
      if (paymentsData.data) {
        setPayments(paymentsData.data);
        setPagination(paymentsData.pagination);
      } else {
        setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: paymentsData.length,
          itemsPerPage: paymentsData.length,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
      
      // Also fetch all payments for accurate counting
      const allPaymentsData = await paymentAPI.getAll();
      setAllPayments(Array.isArray(allPaymentsData) ? allPaymentsData : []);
      
      setPaymentMethods(Array.isArray(paymentMethodsData) ? paymentMethodsData : []);
      setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
      setProducts(Array.isArray(productsData) ? productsData : []);
      
      
    } catch (error) {
      console.error("Error fetching data:", error);
      alert(`Error fetching data: ${error.message}`);
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
    const clientCount = allPayments.filter(payment => payment.klientiID).length;
    const adminCount = allPayments.filter(payment => !payment.klientiID).length;
    return {
      all: allPayments.length,
      client: clientCount,
      admin: adminCount
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const adminId = user?.adminID || user?.id || user?.adminId || user?.userId;
      
      // Create new admin payment for supplier purchases
      const paymentData = {
        ...formData,
        klientiID: null, // This will be an admin payment
        adminID: adminId,
        furnitoriID: formData.furnitoriID || null,
        produktiID: formData.produktiID || null,
        sasia: formData.sasia || null
      };
      
      await paymentAPI.create(paymentData);
      
      // If this is a supplier purchase, update stock directly
      if (formData.furnitoriID && formData.produktiID && formData.sasia) {
        try {
          // Update product stock using existing API
          await productsAPI.increaseStock(formData.produktiID, parseInt(formData.sasia));
          alert(`Payment created successfully! Stock updated: Added ${formData.sasia} units to product stock.`);
        } catch (stockError) {
          console.error("Error updating stock:", stockError);
          alert("Payment created but stock update failed. Please update stock manually.");
        }
      } else {
        alert("Payment created successfully!");
      }
      
      setPagination(prev => ({ ...prev, currentPage: 1 }));
      await fetchData(1);
      setShowForm(false);
      setFormData({ 
        menyra_pagesesID: "", 
        shuma_pageses: "", 
        numri_llogarise: "",
        furnitoriID: "",
        produktiID: "",
        sasia: "",
        cmimiPerNjesi: "",
        pershkrimi: ""
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      alert(`Error creating payment: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Authentication Required</h2>
          <p className="text-gray-500">Please log in as admin to access payments</p>
        </div>
      </div>
    );
  }

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
          <p className="text-gray-600 mt-1">Manage supplier payments and track expenses</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setPagination(prev => ({ ...prev, currentPage: 1 }));
              fetchData(1);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            🔄 Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} />
            New Payment
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-2xl p-6">
          <div className="flex items-center gap-3 text-red-600 font-semibold">
            <DollarSign size={24} />
            Total Payments
          </div>
          <p className="text-2xl font-bold mt-2">{allPayments.length}</p>
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
            <Truck size={24} />
            Supplier Payments
          </div>
          <p className="text-2xl font-bold mt-2">{getFilterCounts().admin}</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Payment History</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
            <p className="text-sm text-blue-700">
              <strong>Note:</strong> Admin can only CREATE and VIEW payments. All payments are permanent for audit trail.
            </p>
          </div>
        </div>

        {getFilteredPayments().length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {payments.length === 0 
              ? "No payments found. Create your first supplier payment."
              : `No ${paymentFilter} payments found. Try a different filter.`
            }
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Payment Method</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Details</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredPayments().map((payment, index) => {
                  const paymentMethod = paymentMethods.find(method => method.menyra_pagesesID === payment.menyra_pagesesID);
                  const supplier = suppliers.find(s => s.furnitoriID === payment.furnitoriID);
                  const product = products.find(p => p.produktiID === payment.produktiID);
                  
                  return (
                    <tr key={payment.pagesaID || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-center">{payment.pagesaID || index + 1}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.klientiID ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {payment.klientiID ? 'Client Payment' : 'Supplier Payment'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-center">${payment.shuma_pageses || '0.00'}</td>
                      <td className="py-3 px-4 text-center">{paymentMethod?.menyra_pageses || 'N/A'}</td>
                      <td className="py-3 px-4 text-center">
                        {payment.koha_pageses ? new Date(payment.koha_pageses).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {payment.klientiID ? (
                          <span className="text-blue-600">Client Order</span>
                        ) : (
                          <div className="text-sm">
                            {supplier && <div className="text-green-600">{supplier.emri}</div>}
                            {product && <div className="text-gray-600">{product.emri}</div>}
                            {payment.sasia && <div className="text-gray-500">Qty: {payment.sasia}</div>}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
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
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Create Supplier Payment</h2>
            <p className="text-sm text-gray-600 mb-4">
              Create a payment for purchasing products from suppliers. Stock will be automatically updated.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method *</label>
                  <select
                    value={formData.menyra_pagesesID}
                    onChange={(e) => setFormData({...formData, menyra_pagesesID: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.menyra_pagesesID} value={method.menyra_pagesesID}>
                        {method.menyra_pageses}
                      </option>
                    ))}
                  </select>
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

                <div>
                  <label className="block text-sm font-medium mb-2">Supplier</label>
                  <select
                    value={formData.furnitoriID}
                    onChange={(e) => {
                      const selectedSupplierId = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        furnitoriID: selectedSupplierId,
                        produktiID: "", // Reset product when supplier changes
                        cmimiPerNjesi: "", // Reset price when supplier changes
                        sasia: "", // Reset quantity when supplier changes
                        shuma_pageses: "" // Reset amount when supplier changes
                      }));
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="">Select supplier (optional)</option>
                    {suppliers.map((supplier) => {
                      const supplierProducts = products.filter(p => p.furnitoriID == supplier.furnitoriID);
                      return (
                        <option key={supplier.furnitoriID} value={supplier.furnitoriID}>
                          {supplier.emri} ({supplierProducts.length} products)
                        </option>
                      );
                    })}
                  </select>
                  {formData.furnitoriID && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                      <p className="font-medium text-gray-700">Products from this supplier:</p>
                      {products.filter(p => p.furnitoriID == formData.furnitoriID).map(product => (
                        <div key={product.produktiID} className="text-gray-600">
                          • {product.emri} - €{product.variacionet && product.variacionet.length > 0 ? product.variacionet[0].cmimi || 'N/A' : 'N/A'} (Stock: {product.sasia_ne_stok || 0})
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Product</label>
                  <select
                    value={formData.produktiID}
                    onChange={(e) => {
                      const selectedProductId = e.target.value;
                      const selectedProduct = products.find(p => p.produktiID == selectedProductId);
                      
                      if (selectedProduct && selectedProduct.variacionet && selectedProduct.variacionet.length > 0) {
                        const price = selectedProduct.variacionet[0].cmimi;
                        setFormData(prev => ({
                          ...prev,
                          produktiID: selectedProductId,
                          cmimiPerNjesi: price ? price.toString() : "",
                          sasia: "", // Reset quantity when product changes
                          shuma_pageses: "" // Reset amount when product changes
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          produktiID: selectedProductId,
                          cmimiPerNjesi: "",
                          sasia: "",
                          shuma_pageses: ""
                        }));
                      }
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    disabled={!formData.furnitoriID}
                  >
                    <option value="">
                      {formData.furnitoriID ? "Select product" : "Select supplier first"}
                    </option>
                    {formData.furnitoriID && products
                      .filter(p => p.furnitoriID == formData.furnitoriID)
                      .map((product) => (
                        <option key={product.produktiID} value={product.produktiID}>
                          {product.emri} - €{product.variacionet && product.variacionet.length > 0 ? product.variacionet[0].cmimi || 'N/A' : 'N/A'} (Stock: {product.sasia_ne_stok || 0})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity to Add to Stock</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.sasia}
                    onChange={(e) => {
                      const newSasia = e.target.value;
                      
                      // Auto-calculate amount if both quantity and price are set
                      if (newSasia && formData.cmimiPerNjesi) {
                        const totalAmount = parseFloat(newSasia) * parseFloat(formData.cmimiPerNjesi);
                        setFormData(prev => ({
                          ...prev, 
                          sasia: newSasia, 
                          shuma_pageses: totalAmount.toFixed(2)
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          sasia: newSasia,
                          shuma_pageses: ""
                        }));
                      }
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Quantity to add to stock"
                    disabled={!formData.produktiID}
                  />
                  {formData.produktiID && formData.sasia && (
                    <div className="mt-1 text-sm text-green-600">
                      This will add {formData.sasia} units to the current stock
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price per Unit (€)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.cmimiPerNjesi || ''}
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                    placeholder="Select product to see price"
                    readOnly
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium mb-2">Payment Amount (€) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={formData.shuma_pageses}
                      onChange={(e) => setFormData({...formData, shuma_pageses: e.target.value})}
                      className="w-full border rounded-lg px-8 py-2 pl-8 bg-gray-100"
                      placeholder="0.00"
                      required
                      readOnly={formData.sasia && formData.cmimiPerNjesi}
                    />
                  </div>
                  {formData.sasia && formData.cmimiPerNjesi ? (
                    <div className="mt-1 text-sm text-green-600">
                      Amount automatically calculated from quantity × price per unit
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-gray-500">
                      Select product and enter quantity to auto-calculate amount
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.pershkrimi}
                    onChange={(e) => setFormData({...formData, pershkrimi: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2"
                    rows="3"
                    placeholder="Payment description (optional)"
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
                    setFormData({ 
                      menyra_pagesesID: "", 
                      shuma_pageses: "", 
                      numri_llogarise: "",
                      furnitoriID: "",
                      produktiID: "",
                      sasia: "",
                      cmimiPerNjesi: "",
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