import { useState, useEffect } from 'react';
import { apiGet, apiPut, apiPost, apiDelete } from '../utils/api';
import AdminNavbar from '../admin/AdminNavbar';
import { CheckCircle, XCircle, Clock, Package, Search, Filter, Edit3, Trash2 } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // States for CRUD operations
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [clients, setClients] = useState([]);
  const [availableOrderStatuses, setAvailableOrderStatuses] = useState([]);
  const [availablePaymentStatuses, setAvailablePaymentStatuses] = useState([]);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet('/porosite');
      setOrders(data);
    } catch (err) {
      setError('Error loading orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients for dropdown
  const fetchClients = async () => {
    try {
      const data = await apiGet('/klienti');
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  // Fetch order statuses for dropdown
  const fetchOrderStatuses = async () => {
    try {
      const data = await apiGet('/porosia-status');
      setAvailableOrderStatuses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching order statuses:', err);
      setAvailableOrderStatuses([]);
    }
  };

  // Fetch payment statuses for dropdown
  const fetchPaymentStatuses = async () => {
    try {
      const data = await apiGet('/pagesa-status');
      setAvailablePaymentStatuses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching payment statuses:', err);
      setAvailablePaymentStatuses([]);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchClients();
    fetchOrderStatuses();
    fetchPaymentStatuses();
  }, []);



  // UPDATE - Update existing order
  const updateOrder = async (orderId, orderData) => {
    try {
      setLoading(true);
      
      // Only send status updates, not client or total amount
      const updateData = {
        porosia_statusID: orderData.porosia_statusID,
        pagesa_statusID: orderData.pagesa_statusID
      };
      
      console.log('Frontend: Updating order ID:', orderId);
      console.log('Frontend: Update data:', updateData);
      console.log('Frontend: Full order data:', orderData);
      
      const response = await apiPut(`/porosite/${orderId}`, updateData);
      console.log('✅ Frontend: Order updated successfully:', response);
      
      // Refresh orders list
      await fetchOrders();
      setShowEditModal(false);
      setEditingOrder(null);
    } catch (err) {
      setError(`Error updating order: ${err.message}`);
      console.error('❌ Frontend: Error updating order:', err);
      console.error('❌ Frontend: Error details:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // DELETE - Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      setLoading(true);
      console.log('Frontend: Deleting order ID:', orderId);
      
      const response = await apiDelete(`/porosite/${orderId}`);
      console.log('Frontend: Order deleted successfully:', response);
      
      // Refresh orders list
      await fetchOrders();
    } catch (err) {
      setError(`Error deleting order: ${err.message}`);
      console.error('❌ Frontend: Error deleting order:', err);
      console.error('❌ Frontend: Error details:', err.response?.data);
      console.error('❌ Frontend: Full error object:', err);
    } finally {
      setLoading(false);
    }
  };


  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.porosiaID.toString().includes(searchTerm) ||
                         order.klientiID?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.porosia_statusID.toString() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Core order status styling (these have specific colors)
  const coreOrderStatusStyles = {
    1: { text: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    2: { text: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    3: { text: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  // Function to get order status styling (core statuses get specific colors, others get gray)
  const getStatusBadge = (statusId) => {
    // First check if it's a core status with specific styling
    if (coreOrderStatusStyles[statusId]) {
      return coreOrderStatusStyles[statusId];
    }
    
    // For new/custom statuses, get the actual name from availableOrderStatuses
    const statusItem = availableOrderStatuses.find(status => status.porosia_statusID == statusId);
    if (statusItem) {
      return { 
        text: statusItem.statusi, 
        color: 'bg-gray-100 text-gray-800', 
        icon: Clock 
      };
    }
    
    // Fallback for unknown statuses
    return { text: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: Clock };
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('sq-AL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format price
  const formatPrice = (price) => {
    return `€${parseFloat(price).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
        <button 
          onClick={fetchOrders}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Provo Përsëri
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold" style={{ color: "#808080" }}>Orders Management</h1>
            <p className="text-gray-600 mt-1">Manage orders in the system</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Total: {orders.length} orders
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for specific order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">All statuses</option>
              {availableOrderStatuses.map((statusItem) => (
                <option key={statusItem.porosia_statusID} value={statusItem.porosia_statusID}>
                  {getStatusBadge(statusItem.porosia_statusID).text}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const status = getStatusBadge(order.porosia_statusID);
                  const StatusIcon = status.icon;
                  
                  return (
                    <tr key={order.porosiaID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.porosiaID}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="font-medium text-gray-900">#{order.klientiID}</div>
                          <div className="text-xs text-gray-400">ID</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.koha_krijimit)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatPrice(order.cmimi_total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon size={12} />
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingOrder(order);
                              setShowEditModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="View/Edit Order"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.porosiaID)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden">
            {filteredOrders.length > 0 ? (
              <div className="space-y-4 p-4">
                {filteredOrders.map((order) => {
                  const status = getStatusBadge(order.porosia_statusID);
                  const StatusIcon = status.icon;
                  
                  return (
                    <div key={order.porosiaID} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      {/* First Row - Order ID and Status */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium text-gray-900">Order #{order.porosiaID}</div>
                          <div className="text-sm text-gray-500">Client #{order.klientiID}</div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon size={12} />
                          {status.text}
                        </span>
                      </div>
                      
                      {/* Second Row - Date and Amount */}
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="text-sm font-medium text-gray-700">Date:</div>
                          <div className="text-sm text-gray-600">{formatDate(order.koha_krijimit)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">Amount:</div>
                          <div className="text-sm font-bold text-gray-900">{formatPrice(order.cmimi_total)}</div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingOrder(order);
                            setShowEditModal(true);
                          }}
                          className="flex-1 text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                          title="View/Edit Order"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteOrder(order.porosiaID)}
                          className="flex-1 text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors duration-200 flex items-center justify-center"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No orders found matching the search criteria.
              </div>
            )}
          </div>
        </div>


      {/* View/Edit Order Modal */}
      {showEditModal && editingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Order Details #{editingOrder.porosiaID}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {formatDate(editingOrder.koha_krijimit)}
                  </p>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                updateOrder(editingOrder.porosiaID, editingOrder);
              }} className="space-y-6">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Order ID</label>
                    <p className="text-sm text-gray-900">#{editingOrder.porosiaID}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                    <p className="text-sm text-gray-900">{formatDate(editingOrder.koha_krijimit)}</p>
                  </div>
                </div>

                {/* Read-only Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                      {clients.find(client => client.klientiID == editingOrder.klientiID)?.emri_kompanise || `Client #${editingOrder.klientiID}`}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
                      {formatPrice(editingOrder.cmimi_total)}
                    </div>
                  </div>
                </div>

                {/* Status Updates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
                    <select
                      value={editingOrder.porosia_statusID}
                      onChange={(e) => setEditingOrder({...editingOrder, porosia_statusID: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {availableOrderStatuses.map((statusItem) => (
                        <option key={statusItem.porosia_statusID} value={statusItem.porosia_statusID}>
                          {getStatusBadge(statusItem.porosia_statusID).text}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <select
                      value={editingOrder.pagesa_statusID}
                      onChange={(e) => setEditingOrder({...editingOrder, pagesa_statusID: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {availablePaymentStatuses.map((statusItem) => (
                        <option key={statusItem.pagesa_statusID} value={statusItem.pagesa_statusID}>
                          {statusItem.statusi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Current Status Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
                  {(() => {
                    const status = getStatusBadge(editingOrder.porosia_statusID);
                    const StatusIcon = status.icon;
                    return (
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        <StatusIcon size={16} />
                        {status.text}
                      </span>
                    );
                  })()}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Update Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
