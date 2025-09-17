import { useState, useEffect } from 'react';
import { apiGet, apiPut, apiDelete } from '../utils/api';
import { ShoppingCart, Plus, Minus, Trash2, Eye, Calendar, Euro } from 'lucide-react';

export default function CartManagement() {
  const [carts, setCarts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch carts from API
  const fetchCarts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiGet('/carts');
      setCarts(data);
    } catch (err) {
      setError('Gabim në ngarkimin e cart-eve');
      console.error('Error fetching carts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart items for a specific cart
  const fetchCartItems = async (cartId) => {
    try {
      const data = await apiGet(`/produkt-cart`);
      // Filter items for the specific cart
      const filteredItems = data.filter(item => item.cartID === cartId);
      setCartItems(filteredItems);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  // Update cart total
  const updateCartTotal = async (cartId) => {
    try {
      const items = cartItems.filter(item => item.cartID === cartId);
      const total = items.reduce((sum, item) => sum + (item.sasia * item.cmimi), 0);
      
      await apiPut(`/carts/${cartId}`, { cmimi_total: total });
      
      // Update local state
      setCarts(carts.map(cart => 
        cart.cartID === cartId 
          ? { ...cart, cmimi_total: total }
          : cart
      ));
    } catch (err) {
      setError(`Gabim në përditësimin e totalit: ${err.message}`);
      console.error('Error updating cart total:', err);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        await deleteCartItem(itemId);
        return;
      }

      await apiPut(`/produkt-cart/${itemId}`, { sasia: newQuantity });
      
      // Update local state
      setCartItems(cartItems.map(item => 
        item.produkti_cartID === itemId 
          ? { ...item, sasia: newQuantity }
          : item
      ));

      // Update cart total
      const cartId = cartItems.find(item => item.produkti_cartID === itemId)?.cartID;
      if (cartId) {
        updateCartTotal(cartId);
      }
    } catch (err) {
      setError(`Gabim në përditësimin e sasisë: ${err.message}`);
      console.error('Error updating item quantity:', err);
    }
  };

  // Delete cart item
  const deleteCartItem = async (itemId) => {
    try {
      await apiDelete(`/produkt-cart/${itemId}`);
      
      // Update local state
      setCartItems(cartItems.filter(item => item.produkti_cartID !== itemId));
      
      // Update cart total
      const cartId = cartItems.find(item => item.produkti_cartID === itemId)?.cartID;
      if (cartId) {
        updateCartTotal(cartId);
      }
    } catch (err) {
      setError(`Gabim në fshirjen e artikullit: ${err.message}`);
      console.error('Error deleting cart item:', err);
    }
  };

  // Delete entire cart
  const deleteCart = async (cartId) => {
    try {
      await apiDelete(`/carts/${cartId}`);
      setCarts(carts.filter(cart => cart.cartID !== cartId));
      setShowModal(false);
    } catch (err) {
      setError(`Gabim në fshirjen e cart-it: ${err.message}`);
      console.error('Error deleting cart:', err);
    }
  };

  // Filter carts based on search
  const filteredCarts = carts.filter(cart => {
    const matchesSearch = cart.cartID.toString().includes(searchTerm) ||
                         cart.klientiID?.toString().includes(searchTerm);
    return matchesSearch;
  });

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
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Menaxhimi i Carts</h1>
        <div className="text-sm text-gray-500">
          Total: {carts.length} carts
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <ShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Kërko: #1 (cart) ose #1 (klient)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Carts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Cart
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Klienti
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data e Krijimit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shuma Totale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Veprime
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCarts.length > 0 ? (
              filteredCarts.map((cart) => (
                <tr key={cart.cartID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{cart.cartID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="font-medium text-gray-900">#{cart.klientiID}</div>
                      <div className="text-xs text-gray-400">ID Klienti</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(cart.koha_krijimit)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatPrice(cart.cmimi_total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedCart(cart);
                        fetchCartItems(cart.cartID);
                        setShowModal(true);
                      }}
                      className="text-red-600 hover:text-red-900 mr-4"
                    >
                      <Eye size={16} className="inline mr-1" />
                      Shiko
                    </button>
                    <button
                      onClick={() => deleteCart(cart.cartID)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} className="inline mr-1" />
                      Fshi
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Nuk u gjetën cart-e.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cart Detail Modal */}
      {showModal && selectedCart && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Cart #{selectedCart.cartID} - Detajet</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Trash2 size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Cart Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Cart</label>
                  <p className="text-sm text-gray-900">#{selectedCart.cartID}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Klienti</label>
                  <p className="text-sm text-gray-900">#{selectedCart.klientiID}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Data e Krijimit</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedCart.koha_krijimit)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Shuma Totale</label>
                  <p className="text-sm font-medium text-gray-900">{formatPrice(selectedCart.cmimi_total)}</p>
                </div>
              </div>

              {/* Cart Items */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Artikujt në Cart</h4>
                {cartItems.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Produkti</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sasia</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Çmimi</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Totali</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Veprime</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.produkti_cartID}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              Variacioni #{item.produkt_variacioniID}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateItemQuantity(item.produkti_cartID, item.sasia - 1)}
                                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-2 py-1 bg-gray-100 rounded">{item.sasia}</span>
                                <button
                                  onClick={() => updateItemQuantity(item.produkti_cartID, item.sasia + 1)}
                                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">{formatPrice(item.cmimi)}</td>
                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                              {formatPrice(item.sasia * item.cmimi)}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <button
                                onClick={() => deleteCartItem(item.produkti_cartID)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Ky cart është bosh</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Mbyll
              </button>
              <button
                onClick={() => deleteCart(selectedCart.cartID)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              >
                Fshi Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
