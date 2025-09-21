import ClientNavBar from "../components/ClientNavBar";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";
import ProductFilter from "../components/ProductFilter";
import { ShoppingCart, DollarSign, Grid, List } from "lucide-react";
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
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    inStock: false,
    sortBy: 'name'
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
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

  const addToCart = async (product, quantity = 1) => {
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
        sasia: quantity,
        cmimi: productVariation.cmimi
      };
      
      console.log('Adding to cart:', cartItemData);
      const createdItem = await cartItemsAPI.create(cartItemData);
      console.log('Cart item created successfully:', createdItem);

      alert(`Produkti "${product.emri}" (${quantity} copë) u shtua në cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(`Gabim në shtimin e produktit në cart: ${err.message}`);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
  };

  const handleSearchClear = () => {
    setSearchResults(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = (productList) => {
    let filtered = [...productList];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(p => p.kategoriaID == filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(p => {
        if (!p.variacionet || p.variacionet.length === 0) return false;
        const price = p.variacionet[0].cmimi;
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          return price >= min && price <= max;
        } else {
          return price >= min;
        }
      });
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(p => {
        return p.sasia_ne_stok > 0;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.emri.localeCompare(b.emri);
        case 'name-desc':
          return b.emri.localeCompare(a.emri);
        case 'price-low':
          const priceA = a.variacionet && a.variacionet.length > 0 ? a.variacionet[0].cmimi : 0;
          const priceB = b.variacionet && b.variacionet.length > 0 ? b.variacionet[0].cmimi : 0;
          return priceA - priceB;
        case 'price-high':
          const priceA2 = a.variacionet && a.variacionet.length > 0 ? a.variacionet[0].cmimi : 0;
          const priceB2 = b.variacionet && b.variacionet.length > 0 ? b.variacionet[0].cmimi : 0;
          return priceB2 - priceA2;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const displayProducts = searchResults ? searchResults : products;
  const filteredProducts = applyFilters(displayProducts);

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#808080" }}>
            {searchResults ? `Rezultatet e kërkimit (${searchResults.length})` : 'Shop'}
          </h1>
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
              >
                <List size={18} />
              </button>
            </div>
            
            <button 
              onClick={loadProducts}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="bell">🔔</span>
            </button>
            <button className="p-2 rounded-full bg-white shadow">
              <span role="img" aria-label="user">👤</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch
            onSearchResults={handleSearchResults}
            onSearchClear={handleSearchClear}
            placeholder="Kërko produkte sipas emrit ose përshkrimit..."
          />
        </div>

        {/* Filters and Products Layout */}
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <ProductFilter
              categories={categories}
              onFilterChange={handleFilterChange}
              currentFilters={filters}
              showAdvanced={true}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

               
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
              /* Products Display */
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.produktiID}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={(product) => {
                      console.log('View details for:', product);
                      // You can add navigation to product details here
                    }}
                    addingToCart={addingToCart === product.produktiID}
                    showAddToCart={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

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
