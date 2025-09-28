import ClientNavBar from "../components/ClientNavBar";
import { 
  ShoppingCart, 
  Package, 
  CreditCard, 
  TrendingUp, 
  Clock,
  Eye,
  Trash2,
  Plus,
  Minus,
  Calendar,
  Euro
} from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiRequest } from "../utils/api";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State management
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [thisMonthPayments, setThisMonthPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullPaymentHistory, setShowFullPaymentHistory] = useState(false);
  
  // Pagination state for orders
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(5);

  // Load dashboard data
  useEffect(() => {
    if (user?.klientiID) {
      loadDashboardData();
    }
  }, [user?.klientiID]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [cartData, ordersData, paymentsData, thisMonthData] = await Promise.all([
        loadCartItems(),
        loadOrders(),
        loadPayments(),
        loadThisMonthPayments()
      ]);
      
      setCartItems(cartData || []);
      setOrders(ordersData || []);
      setPayments(paymentsData || []);
      setThisMonthPayments(thisMonthData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartItems = async () => {
    try {
      const response = await apiRequest(`/carts/klienti/${user?.klientiID}`);
      return response?.produktet || [];
    } catch (error) {
      console.error('Error loading cart items:', error);
      return [];
    }
  };

  const loadOrders = async () => {
    try {
      const response = await apiRequest(`/porosite/klienti/${user?.klientiID}`);
      return response || [];
    } catch (error) {
      console.error('Error loading orders:', error);
      return [];
    }
  };

  const loadPayments = async () => {
    try {
      const response = await apiRequest(`/pagesa/klienti/${user?.klientiID}`);
      return response || [];
    } catch (error) {
      console.error('Error loading payments:', error);
      return [];
    }
  };

  const loadThisMonthPayments = async () => {
    try {
      const response = await apiRequest(`/pagesa/klienti/${user?.klientiID}/this-month`);
      return response || [];
    } catch (error) {
      console.error('Error loading this month payments:', error);
      return [];
    }
  };

  const updateCartQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await apiRequest(`/api/produkt-cart/${cartItemId}`, {
        method: 'PUT',
        body: { sasia: newQuantity }
      });
      loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await apiRequest(`/api/produkt-cart/${cartItemId}`, {
        method: 'DELETE'
      });
      loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sq-AL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `€${parseFloat(amount || 0).toFixed(2)}`;
  };

  const translateStatus = (status) => {
    if (!status) return 'Pending';
    
    switch (status.toLowerCase()) {
      // Order statuses
      case 'në proces':
        return 'In Process';
      case 'përfunduar':
        return 'Completed';
      case 'anuluar':
        return 'Cancelled';
      // Payment statuses
      case 'në pritje':
        return 'Pending';
      case 'e paguar':
        return 'Paid';
      case 'e refuzuar':
        return 'Rejected';
      // English fallbacks
      case 'completed':
      case 'delivered':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      case 'paid':
        return 'Paid';
      case 'rejected':
        return 'Rejected';
      default:
        return status; // Return original if no translation found
    }
  };

  const getStatusColor = (status) => {
    const translatedStatus = translateStatus(status)?.toLowerCase();
    
    switch (translatedStatus) {
      case 'completed':
      case 'delivered':
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
      case 'in process':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Pagination functions for orders
  const showMoreOrders = () => {
    setVisibleOrdersCount(prev => prev + 5);
  };

  const resetOrdersPagination = () => {
    setVisibleOrdersCount(5);
  };

  // Get visible orders based on pagination
  const visibleOrders = orders.slice(0, visibleOrdersCount);
  const hasMoreOrders = orders.length > visibleOrdersCount;

  // Calculate stats
  const totalCartValue = cartItems.reduce((sum, item) => sum + (item.cmimi * item.sasia), 0);
  const totalOrdersValue = orders.reduce((sum, order) => sum + parseFloat(order.cmimi_total || 0), 0);
  const totalPaymentsThisMonth = thisMonthPayments.reduce((sum, payment) => sum + parseFloat(payment.shuma_pageses || 0), 0);
  const totalPaymentsAllTime = payments.reduce((sum, payment) => sum + parseFloat(payment.shuma_pageses || 0), 0);

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ClientNavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      <ClientNavBar />

      <div className="flex-1 pt-16 lg:pt-0 overflow-y-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b" style={{ borderColor: "#808080" }}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
                  Dashboard
                </h1>
                <p style={{ color: "#808080" }}>
                  Welcome, Client!
                </p>
              </div>
              <button
                onClick={loadDashboardData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b" style={{ borderColor: "#808080" }}>
          <div className="px-4 lg:px-6">
            {/* Mobile Grid Layout */}
            <div className="lg:hidden grid grid-cols-2 gap-2 py-2">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'cart', label: 'Cart', icon: ShoppingCart },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'payments', label: 'Payments', icon: CreditCard }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg font-medium transition-colors ${
                    activeTab === id
                      ? 'bg-green-100 text-green-600 border-2 border-green-600'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Icon size={16} />
                    {id === 'cart' && cartItems.length > 0 && (
                      <span className="bg-green-600 text-white text-xs rounded-full px-1.5 py-0.5">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>

            {/* Desktop Horizontal Layout */}
            <nav className="hidden lg:flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'cart', label: 'Cart', icon: ShoppingCart },
                { id: 'orders', label: 'Orders', icon: Package },
                { id: 'payments', label: 'Payments', icon: CreditCard }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors ${
                    activeTab === id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent hover:text-gray-700'
                  }`}
                  style={{
                    color: activeTab === id ? '#059669' : '#808080'
                  }}
                >
                  <Icon size={18} />
                  {label}
                  {id === 'cart' && cartItems.length > 0 && (
                    <span className="bg-green-600 text-white text-xs rounded-full px-2 py-1">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: "#808080" }}>
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium" style={{ color: "#808080" }}>Items in cart</p>
                      <p className="text-2xl font-bold" style={{ color: "#808080" }}>{cartItems.length}</p>
                      <p className="text-sm text-green-600">{formatCurrency(totalCartValue)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: "#808080" }}>
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium" style={{ color: "#808080" }}>Total orders</p>
                      <p className="text-2xl font-bold" style={{ color: "#808080" }}>{orders.length}</p>
                      <p className="text-sm text-green-600">{formatCurrency(totalOrdersValue)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: "#808080" }}>
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Calendar className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium" style={{ color: "#808080" }}>Payments this month</p>
                      <p className="text-2xl font-bold" style={{ color: "#808080" }}>{thisMonthPayments.length}</p>
                      <p className="text-sm text-green-600">{formatCurrency(totalPaymentsThisMonth)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6" style={{ borderColor: "#808080" }}>
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Euro className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium" style={{ color: "#808080" }}>Total payments</p>
                      <p className="text-2xl font-bold" style={{ color: "#808080" }}>{payments.length}</p>
                      <p className="text-sm text-green-600">{formatCurrency(totalPaymentsAllTime)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
                  <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                    <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>Recent orders</h3>
                  </div>
                  <div className="p-6">
                    {orders.slice(0, 3).length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.porosiaID} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{ color: "#808080" }}>Order #{order.porosiaID}</p>
                              <p className="text-sm" style={{ color: "#808080" }}>{formatDate(order.koha_krijimit)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium" style={{ color: "#808080" }}>{formatCurrency(order.cmimi_total)}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.porosiaStatus?.statusi)}`}>
                                {translateStatus(order.porosiaStatus?.statusi)}
                              </span>
                            </div>
                          </div>
                        ))}
                        {orders.length > 3 && (
                          <div className="pt-2">
                            <button
                              onClick={() => setActiveTab('orders')}
                              className="text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                              View all orders ({orders.length})
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-center py-4" style={{ color: "#808080" }}>No recent orders</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
                  <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                    <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>Recent payments</h3>
                  </div>
                  <div className="p-6">
                    {payments.slice(0, 3).length > 0 ? (
                      <div className="space-y-4">
                        {payments.slice(0, 3).map((payment) => (
                          <div key={payment.pagesaID} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium" style={{ color: "#808080" }}>Payment #{payment.pagesaID}</p>
                              <p className="text-sm" style={{ color: "#808080" }}>{formatDate(payment.koha_pageses)}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium" style={{ color: "#808080" }}>{formatCurrency(payment.shuma_pageses)}</p>
                              <p className="text-sm" style={{ color: "#808080" }}>{payment.menyraPageses?.menyra_pageses}</p>
                            </div>
                          </div>
                        ))}
                        {payments.length > 3 && (
                          <div className="pt-2">
                            <button
                              onClick={() => setActiveTab('payments')}
                              className="text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                              View all payments ({payments.length})
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-center py-4" style={{ color: "#808080" }}>No recent payments</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
              <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>
                  Shopping cart ({cartItems.length} items)
                </h3>
                {totalCartValue > 0 && (
                  <p className="text-green-600 font-medium">
                    Total: {formatCurrency(totalCartValue)}
                  </p>
                )}
              </div>
              <div className="p-6">
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.produkti_cartID} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#808080" }}>
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.produkti?.imazhi || '/src/client/assets/images/default-pill-bottle.svg'}
                            alt={item.produkti?.emri}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-medium" style={{ color: "#808080" }}>
                              {item.produkti?.emri}
                            </h4>
                            <p className="text-sm" style={{ color: "#808080" }}>
                              {formatCurrency(item.cmimi)} per unit
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg" style={{ borderColor: "#808080" }}>
                            <button
                              onClick={() => updateCartQuantity(item.produkti_cartID, item.sasia - 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-medium" style={{ color: "#808080" }}>{item.sasia}</span>
                            <button
                              onClick={() => updateCartQuantity(item.produkti_cartID, item.sasia + 1)}
                              className="p-2 hover:bg-gray-100"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <p className="font-medium w-20 text-right" style={{ color: "#808080" }}>
                            {formatCurrency(item.cmimi * item.sasia)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.produkti_cartID)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: "#808080" }}>
                      <button
                        onClick={() => navigate('/cart')}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        View full cart
                      </button>
                      <div className="text-right">
                        <p className="text-lg font-bold" style={{ color: "#808080" }}>
                          Total: {formatCurrency(totalCartValue)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2" style={{ color: "#808080" }}>Cart is empty</h3>
                    <p className="mb-4" style={{ color: "#808080" }}>Add products to start shopping</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      View products
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
              <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>
                  Order history ({orders.length} orders)
                </h3>
                {orders.length > 0 && (
                  <p className="text-sm mt-1" style={{ color: "#808080" }}>
                    Showing {visibleOrders.length} of {orders.length} orders
                  </p>
                )}
              </div>
              <div className="p-6">
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {visibleOrders.map((order) => (
                      <div key={order.porosiaID} className="border rounded-lg p-4" style={{ borderColor: "#808080" }}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium" style={{ color: "#808080" }}>
                              Order #{order.porosiaID}
                            </h4>
                            <p className="text-sm flex items-center gap-2" style={{ color: "#808080" }}>
                              <Clock size={14} />
                              {formatDate(order.koha_krijimit)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: "#808080" }}>
                              {formatCurrency(order.cmimi_total)}
                            </p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.porosiaStatus?.statusi)}`}>
                              {order.porosiaStatus?.statusi || 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        {order.produktet && order.produktet.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="font-medium" style={{ color: "#808080" }}>Products:</h5>
                            {order.produktet.map((product, index) => (
                              <div key={index} className="flex justify-between text-sm" style={{ color: "#808080" }}>
                                <span>
                                  {product.produkti?.emri} x{product.sasia}
                                </span>
                                <span>{formatCurrency(product.cmimi * product.sasia)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Show More Button */}
                    {hasMoreOrders && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={showMoreOrders}
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                        >
                          <Package size={16} />
                          Show more orders
                        </button>
                      </div>
                    )}
                    
                    {/* Show Less Button (when showing all orders) */}
                    {!hasMoreOrders && orders.length > 5 && (
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={resetOrdersPagination}
                          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                          Hide other orders
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2" style={{ color: "#808080" }}>No orders</h3>
                    <p className="mb-4" style={{ color: "#808080" }}>Your orders will appear here</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Buy products
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              {/* This Month Payments */}
              <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
                <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                  <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>
                    Payments this month ({thisMonthPayments.length} payments)
                  </h3>
                  <p className="text-green-600 font-medium">
                    Total: {formatCurrency(totalPaymentsThisMonth)}
                  </p>
                </div>
                <div className="p-6">
                  {thisMonthPayments.length > 0 ? (
                    <div className="space-y-4">
                      {thisMonthPayments.map((payment) => (
                        <div key={payment.pagesaID} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#808080" }}>
                          <div>
                            <h4 className="font-medium" style={{ color: "#808080" }}>
                              Payment #{payment.pagesaID}
                            </h4>
                            <p className="text-sm flex items-center gap-2" style={{ color: "#808080" }}>
                              <Clock size={14} />
                              {formatDate(payment.koha_pageses)}
                            </p>
                            <p className="text-sm" style={{ color: "#808080" }}>
                              {payment.menyraPageses?.menyra_pageses}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold" style={{ color: "#808080" }}>
                              {formatCurrency(payment.shuma_pageses)}
                            </p>
                            {payment.numri_llogarise && (
                              <p className="text-sm" style={{ color: "#808080" }}>
                                Account: {payment.numri_llogarise}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4" style={{ color: "#808080" }}>No payments this month</p>
                  )}
                </div>
              </div>

              {/* Full Payment History */}
              <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: "#808080" }}>
                <div className="p-6 border-b" style={{ borderColor: "#808080" }}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold" style={{ color: "#808080" }}>
                      Full payment history ({payments.length} payments)
                    </h3>
                    <button
                      onClick={() => setShowFullPaymentHistory(!showFullPaymentHistory)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {showFullPaymentHistory ? 'Hide' : 'View all'}
                    </button>
                  </div>
                  <p className="text-green-600 font-medium">
                    Total: {formatCurrency(totalPaymentsAllTime)}
                  </p>
                </div>
                {showFullPaymentHistory && (
                  <div className="p-6">
                    {payments.length > 0 ? (
                      <div className="space-y-4">
                        {payments.map((payment) => (
                          <div key={payment.pagesaID} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: "#808080" }}>
                            <div>
                              <h4 className="font-medium" style={{ color: "#808080" }}>
                                Payment #{payment.pagesaID}
                              </h4>
                              <p className="text-sm flex items-center gap-2" style={{ color: "#808080" }}>
                                <Clock size={14} />
                                {formatDate(payment.koha_pageses)}
                              </p>
                              <p className="text-sm" style={{ color: "#808080" }}>
                                {payment.menyraPageses?.menyra_pageses}
                              </p>
                              {payment.porosia && (
                                <p className="text-sm" style={{ color: "#808080" }}>
                                  Order: #{payment.porosia.porosiaID}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold" style={{ color: "#808080" }}>
                                {formatCurrency(payment.shuma_pageses)}
                              </p>
                              {payment.numri_llogarise && (
                                <p className="text-sm" style={{ color: "#808080" }}>
                                  Account: {payment.numri_llogarise}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4" style={{ color: "#808080" }}>No payments</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}