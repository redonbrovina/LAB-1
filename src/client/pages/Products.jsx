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

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12,
    hasNextPage: false,
    hasPrevPage: false
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (page = pagination.currentPage) => {
    try {
      setLoading(true);
      setError('');
      console.log("Loading products for client...", new Date().toISOString());
      
      // Only load paginated products if no search results are active
      if (!searchResults) {
        const [productsResponse, categoriesData] = await Promise.all([
          productsAPI.getPaginated(page, pagination.itemsPerPage),
          categoriesAPI.getAll()
        ]);
        
        console.log("Products response:", productsResponse);
        console.log("Categories data:", categoriesData);
        
        setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
        setPagination(productsResponse.pagination);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } else {
        // If search results are active, just load categories
        const categoriesData = await categoriesAPI.getAll();
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      }
    } catch (err) {
      setError('Error loading products');
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
      alert('You must be logged in to add products to cart');
      return;
    }
    
    const clientId = user.klientiID || user.id || user.clientId || user.userId;
    console.log('Available user fields:', Object.keys(user));
    console.log('Client ID:', clientId);
    
    if (!clientId) {
      alert('Error: Client ID is not available. Please log in again.');
      console.log('No client ID found in user object');
      return;
    }

    if (!product.variacionet || product.variacionet.length === 0) {
      alert('Product has no available variation. Please add variation in admin panel.');
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
        throw new Error('Error creating cart');
      }

      // Add product to cart
      const productVariation = product.variacionet[0];
      console.log('Product variation:', productVariation);
      
      if (!productVariation.produkt_variacioniID) {
        throw new Error('Product has no variation ID');
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

      alert(`Product "${product.emri}" (${quantity} pieces) added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert(`Error adding product to cart: ${err.message}`);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
    // Reset pagination when searching
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
      totalPages: 1,
      totalItems: results ? results.length : 0,
      hasNextPage: false,
      hasPrevPage: false
    }));
  };

  const handleSearchClear = () => {
    setSearchResults(null);
    // Reload products with pagination when clearing search
    loadProducts(1);
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
      console.log('🔍 In Stock filter is ACTIVE');
      console.log('Products before filter:', filtered.map(p => ({ name: p.emri, stock: p.sasia_ne_stok })));
      
      filtered = filtered.filter(p => {
        const hasStock = p.sasia_ne_stok > 0;
        console.log(`Checking ${p.emri}: stock=${p.sasia_ne_stok}, hasStock=${hasStock}`);
        return hasStock;
      });
      
      console.log('Products after filter:', filtered.map(p => ({ name: p.emri, stock: p.sasia_ne_stok })));
    } else {
      console.log('🔍 In Stock filter is INACTIVE');
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

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      loadProducts(newPage);
    }
  };

  const displayProducts = searchResults ? searchResults : products;
  const filteredProducts = applyFilters(displayProducts);


  return (
    <div className="flex h-screen" style={{ backgroundColor: "#ECFAEA" }}>
      {/* Sidebar */}
      <ClientNavBar />

      {/* Main Content */}
            <div className="flex-1 pt-16 lg:pt-0 p-4 lg:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: "#808080" }}>
            {searchResults ? `Search Results (${searchResults.length})` : `Shop (${pagination.totalItems} products)`}
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* View Mode Toggle */}
            <div className="flex border rounded-lg bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
              >
                <List size={16} />
              </button>
            </div>
            
            <button 
              onClick={() => loadProducts(1)}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              🔄 <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <ProductSearch
            onSearchResults={handleSearchResults}
            onSearchClear={handleSearchClear}
            placeholder="Search products by name or description..."
          />
        </div>

        {/* Filters and Products Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <ProductFilter
              categories={categories}
              onFilterChange={handleFilterChange}
              currentFilters={filters}
              showAdvanced={true}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1 min-w-0">

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
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6"
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

        {/* Pagination - Only show when not searching */}
        {!searchResults && !loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
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
                        ? 'bg-green-500 text-white'
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
