import ClientNavBar from "../components/ClientNavBar"; 
import React, { useState, useEffect } from "react";
import { cartAPI, cartItemsAPI, productsAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight } from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get user's cart
      const clientId = user.klientiID || user.id || user.clientId || user.userId;
      
      if (!clientId) {
        throw new Error('Client ID not found in user object');
      }
      
      const carts = await cartAPI.getAll();
      const cartsArray = Array.isArray(carts) ? carts : [];
      const userCart = cartsArray.find(c => c.klientiID === clientId);
      
      if (userCart) {
        setCart(userCart);
        console.log('User cart found:', userCart);
        
        const items = await cartItemsAPI.getAll();
        console.log('All cart items from API:', items);
        const itemsArray = Array.isArray(items) ? items : [];
        console.log('Items array:', itemsArray);
        
              // Try different ways to match cart items
              const userCartItems = itemsArray.filter(item => {
                console.log('Checking item:', item);
                console.log('Item cartID:', item.cartID, 'User cartID:', userCart.cartID);
                console.log('Item produkt_variacioniID:', item.produkt_variacioniID);
                console.log('Match:', item.cartID === userCart.cartID);
                
                // Only include items that belong to this cart AND have a valid product variation ID
                return item.cartID === userCart.cartID && item.produkt_variacioniID !== null;
              });
        
        console.log('Filtered user cart items:', userCartItems);
        console.log('Looking for cartID:', userCart.cartID);
        console.log('Available cartIDs in items:', itemsArray.map(item => item.cartID));
        
        setCartItems(userCartItems);
      } else {
        console.log('No user cart found');
        setCart(null);
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError(`Gabim në ngarkimin e cart-it: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      console.log('Updating quantity for item:', itemId, 'to:', newQuantity);
      if (newQuantity <= 0) {
        await removeItem(itemId);
        return;
      }

      console.log('Calling cartItemsAPI.update with:', itemId, { sasia: newQuantity });
      await cartItemsAPI.update(itemId, { sasia: newQuantity });
      console.log('Quantity updated successfully, reloading cart...');
      await loadCart(); // Reload cart to get updated totals
    } catch (err) {
      console.error('Error updating quantity:', err);
      console.error('Error details:', err.message);
      alert(`Gabim në përditësimin e sasisë: ${err.message}`);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await cartItemsAPI.delete(itemId);
      await loadCart(); // Reload cart
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Gabim në heqjen e produktit');
    }
  };

  const clearCart = async () => {
    if (!cart) return;
    
    try {
      // Remove all items from cart
      for (const item of cartItems) {
        await cartItemsAPI.delete(item.produkti_cartID);
      }
      await loadCart();
    } catch (err) {
      console.error('Error clearing cart:', err);
      alert('Gabim në pastrimin e cart-it');
    }
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Duhet të jeni të kyçur për të vazhduar me checkout.');
      return;
    }

    if (!cart || cartItems.length === 0) {
      alert('Cart-i është bosh. Shtoni produkte për të vazhduar me checkout.');
      return;
    }

    // Filter out items without valid product variation ID
    const validCartItems = cartItems.filter(item => item.produkt_variacioniID !== null);
    
    if (validCartItems.length === 0) {
      alert('Nuk ka produkte të vlefshëm në cart. Ju lutemi shtoni produkte me variacion të vlefshëm.');
      return;
    }

    // Redirect to Payments page
    navigate('/payments');
  };

  if (!user) {
    return (
      <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
        <ClientNavBar />
        <div className="flex-1 p-8 overflow-y-auto flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" style={{ color: "#808080" }}>
              Duhet të jeni të kyçur për të parë cart-in tuaj
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
      <div className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
               <div className="flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
                   Your Cart
                 </h1>
                 <div className="flex gap-3">
                   <button
                     onClick={loadCart}
                     className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                   >
                     🔄 Refresh Cart
                   </button>
                   {cartItems.length > 0 && (
                     <button
                       onClick={clearCart}
                       className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                     >
                       <Trash2 size={16} />
                       Clear Cart
                     </button>
                   )}
                 </div>
               </div>

               {/* Error Message */}
               {error && (
                 <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                   {error}
                 </div>
               )}


        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Duke ngarkuar cart-in...</div>
          </div>
        ) : (
          <>
            {/* Your Current Cart */}
            <div className="bg-white shadow rounded-2xl p-6 mb-8">
              <h2 className="font-semibold mb-4" style={{ color: "#808080" }}>
                Your Current Cart
              </h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Add some products from the Products page
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full border border-gray-200">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left p-2 border-b">Product</th>
                          <th className="text-left p-2 border-b">Quantity</th>
                          <th className="text-left p-2 border-b">Price</th>
                          <th className="text-left p-2 border-b">Total</th>
                          <th className="text-left p-2 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item.produkti_cartID} className="hover:bg-gray-50">
                            <td className="p-2 border-b" style={{ color: "#808080" }}>
                              <div>
                                <div className="font-medium">Product #{item.produkt_variacioniID}</div>
                                <div className="text-sm text-gray-500">Variation ID: {item.produkt_variacioniID}</div>
                              </div>
                            </td>
                            <td className="p-2 border-b" style={{ color: "#808080" }}>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.produkti_cartID, item.sasia - 1)}
                                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-2 py-1 bg-gray-100 rounded min-w-[2rem] text-center">{item.sasia}</span>
                                <button
                                  onClick={() => updateQuantity(item.produkti_cartID, item.sasia + 1)}
                                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </td>
                            <td className="p-2 border-b" style={{ color: "#808080" }}>
                              €{item.cmimi}
                            </td>
                            <td className="p-2 border-b" style={{ color: "#808080" }}>
                              €{(item.sasia * item.cmimi).toFixed(2)}
                            </td>
                            <td className="p-2 border-b">
                              <button
                                onClick={() => removeItem(item.produkti_cartID)}
                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.produkti_cartID} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-medium" style={{ color: "#808080" }}>
                              Product #{item.produkt_variacioniID}
                            </div>
                            <div className="text-sm text-gray-500">
                              Variation ID: {item.produkt_variacioniID}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.produkti_cartID)}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: "#808080" }}>Price:</span>
                            <span className="font-medium" style={{ color: "#808080" }}>€{item.cmimi}</span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: "#808080" }}>Quantity:</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.produkti_cartID, item.sasia - 1)}
                                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-2 py-1 bg-gray-100 rounded min-w-[2rem] text-center">{item.sasia}</span>
                              <button
                                onClick={() => updateQuantity(item.produkti_cartID, item.sasia + 1)}
                                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                            <span className="font-medium" style={{ color: "#808080" }}>Total:</span>
                            <span className="font-bold text-lg" style={{ color: "#808080" }}>
                              €{(item.sasia * item.cmimi).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart Total */}
                  {cart && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-lg font-bold text-green-600">
                          €{cartItems.filter(item => item.produkt_variacioniID !== null).reduce((sum, item) => sum + (item.sasia * item.cmimi), 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Checkout Button */}
                  {cartItems.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                          Ready to Checkout?
                        </h3>
                        <p className="text-blue-600 mb-4">
                          Review your items and proceed to payment
                        </p>
                        <button
                          onClick={handleCheckout}
                          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg shadow-lg transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
                        >
                          <CreditCard size={20} />
                          Checkout
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
