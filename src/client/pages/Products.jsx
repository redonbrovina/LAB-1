import ClientNavBar from "../components/ClientNavBar";
import { ShoppingCart, DollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { productsAPI, categoriesAPI } from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const [productsData, categoriesData] = await Promise.all([
        productsAPI.getAll(),
        categoriesAPI.getAll()
      ]);
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
    try {
      // TODO: Implement add to cart functionality
      console.log('Adding to cart:', product);
      alert(`Produkti "${product.emri}" u shtua në cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Gabim në shtimin e produktit në cart');
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
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <ShoppingCart size={16} /> Add to Cart
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
