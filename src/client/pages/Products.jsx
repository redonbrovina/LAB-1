import ClientNavBar from "../components/ClientNavBar";
import { ShoppingCart, DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { productsAPI, categoriesAPI, cartAPI, cartItemsAPI } from "../utils/api";
import { useAuth } from "../utils/AuthContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      console.log("Loading products for client...");
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
      
      console.log("Products data:", productsData);
      console.log("Categories data:", categoriesData);
      
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      setError('Gabim në ngarkimin e produkteve');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    console.log('=== ADD TO CART DEBUG ===');
    console.log('User object:', user);
    console.log('Product:', product);
    
    if (!user) {
      alert('Duhet të jeni të kyçur për të shtuar produkte në cart');
      return;
    }
    
    const clientId = user.klientiID || user.id || user.clientId || user.userId;
    console.log('Available user fields:', Object.keys(user));
    console.log('Client ID:', clientId);
    
    if (!clientId) {
      alert('Gabim: ID e klientit nuk është e disponueshme. Ju lutemi kyçuni përsëri.');
      console.log('No client ID found in user object');
      return;
    }

    if (!product.variacionet || product.variacionet.length === 0) {
      alert('Produkti nuk ka variacion të disponueshëm. Ju lutemi shtoni variacion në panelin e adminit.');
      console.log('Product has no variations:', product);
      return;
    }

    setAddingToCart(product.produktiID);
    
    try {
      console.log('Getting or creating user cart...');
      // Get or create user's cart
      let userCart;
      try {
        console.log('Fetching all carts...');
        const carts = await cartAPI.getAll();
        console.log('All carts:', carts);
        userCart = carts.find(cart => cart.klientiID === clientId);
        console.log('Found user cart:', userCart);
        
        if (!userCart) {
          console.log('No cart found, creating new cart...');
          // Create new cart for user
          userCart = await cartAPI.create({
            klientiID: clientId,
            cmimi_total: 0
          });
          console.log('Created new cart:', userCart);
        }
      } catch (error) {
        console.error('Error getting/creating cart:', error);
        throw new Error('Gabim në krijimin e cart-it');
      }

      // Add product to cart
      const productVariation = product.variacionet[0];
      console.log('Product variation:', productVariation);
      
      if (!productVariation.produkt_variacioniID) {
        throw new Error('Produkti nuk ka ID të variacionit');
      }
      
      const cartItemData = {
        cartID: userCart.cartID,
        produkt_variacioniID: productVariation.produkt_variacioniID,
        sasia: 1,
        cmimi: productVariation.cmimi
      };
      
      console.log('Adding to cart:', cartItemData);
      const createdItem = await cartItemsAPI.create(cartItemData);
      console.log('Cart item created successfully:', createdItem);

      alert(`Produkti "${product.emri}" u shtua në cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(`Gabim në shtimin e produktit në cart: ${err.message}`);
    } finally {
      setAddingToCart(null);
    }
  };

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.kategoriaID == selectedCategory)
    : products;

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>Shop</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={loadProducts}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              🔄 Refresh Products
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="bell">🔔</span>
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="user">👤</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="">Të gjitha kategoritë</option>
            {categories.map(category => (
              <option key={category.kategoriaID} value={category.kategoriaID}>
                {category.emri}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

               {/* Debug Information */}
               <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
                 <p><strong>Debug Info:</strong></p>
                 <p>Products: {products.length} | Categories: {categories.length}</p>
                 <p>Authentication: {localStorage.getItem('token') ? 'Token present' : 'No token'}</p>
                 <p>Products with variations: {products.filter(p => p.variacionet && p.variacionet.length > 0).length}</p>
                 <p>User: {user ? 'Logged in' : 'Not logged in'}</p>
                 {user && (
                   <div>
                     <p>User fields: {Object.keys(user).join(', ')}</p>
                     <p>Client ID: {user.klientiID || user.id || user.clientId || user.userId || 'Not found'}</p>
                   </div>
                 )}
                 <button 
                   onClick={() => {
                     console.log('=== MANUAL DEBUG ===');
                     console.log('User:', user);
                     console.log('Token:', localStorage.getItem('token'));
                     if (user) {
                       console.log('User fields:', Object.keys(user));
                       console.log('Client ID:', user.klientiID || user.id || user.clientId || user.userId);
                     }
                   }}
                   className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
                 >
                   Debug User
                 </button>
               </div>
               
               {/* Variation Warning */}
               {products.length > 0 && products.filter(p => p.variacionet && p.variacionet.length > 0).length === 0 && (
                 <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
                   <div className="flex items-center">
                     <span className="text-yellow-600 text-xl mr-3">⚠️</span>
                     <div>
                       <h3 className="text-yellow-800 font-semibold">No Product Variations Available</h3>
                       <p className="text-yellow-700 text-sm mt-1">
                         Products need variations (price and stock) to be added to cart. 
                         Please add variations in the admin panel first.
                       </p>
                     </div>
                   </div>
                 </div>
               )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Duke ngarkuar produktet...</div>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.produktiID} className="bg-white shadow rounded-2xl p-4 flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No Image</span>
                </div>
                <h2 className="font-semibold text-gray-700 text-center mb-2">{product.emri}</h2>
                <p className="text-gray-600 text-sm text-center mb-2">{product.pershkrimi || 'Nuk ka përshkrim'}</p>
                <p className="text-green-600 font-bold mb-3">
                  {product.variacionet && product.variacionet.length > 0 
                    ? `€${product.variacionet[0].cmimi}` 
                    : 'Nuk ka çmim'
                  }
                </p>
                       <button 
                         onClick={() => addToCart(product)}
                         disabled={addingToCart === product.produktiID || !product.variacionet || product.variacionet.length === 0}
                         className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                         title={!product.variacionet || product.variacionet.length === 0 ? 'Produkti nuk ka variacion - shtoni variacion në admin' : ''}
                       >
                         <ShoppingCart size={16} /> 
                         {addingToCart === product.produktiID ? 'Adding...' : 
                          (!product.variacionet || product.variacionet.length === 0) ? 'No Variations' : 'Add to Cart'}
                       </button>
              </div>
            ))}
          </div>
        )}

        {/* No Products Message */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            {selectedCategory ? 'Nuk ka produkte në këtë kategori' : 'Nuk ka produkte të disponueshme'}
          </div>
        )}
      </div>
    </div>
  );
}
