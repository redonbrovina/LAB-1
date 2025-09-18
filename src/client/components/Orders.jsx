import { useState, useEffect } from 'react';
import { apiGet, apiPut } from '../utils/api';
import AdminNavbar from './admin/AdminNavbar';
import { Eye, CheckCircle, XCircle, Clock, Package, Search, Filter } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet('/porosite');
      setOrders(data);
    } catch (err) {
      setError('Gabim në ngarkimin e porosive');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log('Updating order:', orderId, 'to status:', newStatus);
      const response = await apiPut(`/porosite/${orderId}`, { porosia_statusID: newStatus });
      console.log('Update response:', response);
      
      setOrders(orders.map(order => 
        order.porosiaID === orderId 
          ? { ...order, porosia_statusID: newStatus }
          : order
      ));
      setShowModal(false);
    } catch (err) {
      setError(`Gabim në përditësimin e statusit: ${err.message}`);
      console.error('Error updating order:', err);
    }
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.porosiaID.toString().includes(searchTerm) ||
                         order.klientiID?.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.porosia_statusID.toString() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (statusId) => {
    const statusMap = {
      1: { text: 'Në proces', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      2: { text: 'Përfunduar', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      3: { text: 'Anuluar', color: 'bg-red-100 text-red-800', icon: XCircle }
    };
    return statusMap[statusId] || { text: 'E panjohur', color: 'bg-gray-100 text-gray-800', icon: Clock };
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
    <div className="space-y-6">
      <AdminNavbar />
      {/* Header */}
      <div className="flex justify-between items-center ml-64">
        <h1 className="text-2xl font-bold text-gray-800">Menaxhimi i Porosive</h1>
        <div className="text-sm text-gray-500">
          Total: {orders.length} porosi
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 ml-64">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Kërko: #5 (porosi) ose #1 (klient)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 ml-64">
            <Filter className="text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="all">Të gjitha statuset</option>
              <option value="1">Në proces</option>
              <option value="2">Përfunduar</option>
              <option value="3">Anuluar</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden ml-64">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Porosie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klienti
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shuma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statusi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veprime
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
                        <div className="text-xs text-gray-400">ID Klienti</div>
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
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowModal(true);
                        }}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1"
                      >
                        <Eye size={16} />
                        Shiko
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nuk u gjetën porosi që përputhen me kriteret e kërkimit.
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Detajet e Porosisë #{selectedOrder.porosiaID}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Order Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID Porosie</label>
                    <p className="text-sm text-gray-900">#{selectedOrder.porosiaID}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID Klienti</label>
                    <p className="text-sm text-gray-900">#{selectedOrder.klientiID}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data e Krijimit</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedOrder.koha_krijimit)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Shuma Totale</label>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(selectedOrder.cmimi_total)}</p>
                  </div>
                </div>

                {/* Current Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statusi Aktual</label>
                  {(() => {
                    const status = getStatusBadge(selectedOrder.porosia_statusID);
                    const StatusIcon = status.icon;
                    return (
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                        <StatusIcon size={16} />
                        {status.text}
                      </span>
                    );
                  })()}
                </div>

                {/* Status Update */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ndrysho Statusin</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 1, label: 'Në proces', color: 'bg-yellow-500 hover:bg-yellow-600' },
                      { id: 2, label: 'Përfunduar', color: 'bg-green-500 hover:bg-green-600' },
                      { id: 3, label: 'Anuluar', color: 'bg-red-500 hover:bg-red-600' }
                    ].map((status) => (
                      <button
                        key={status.id}
                        onClick={() => {
                          console.log('Button clicked:', status.label, 'for order:', selectedOrder.porosiaID);
                          updateOrderStatus(selectedOrder.porosiaID, status.id);
                        }}
                        disabled={selectedOrder.porosia_statusID === status.id}
                        className={`px-3 py-1 rounded text-white text-sm font-medium transition-colors ${
                          selectedOrder.porosia_statusID === status.id 
                            ? 'opacity-50 cursor-not-allowed' 
                            : status.color
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Mbyll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
