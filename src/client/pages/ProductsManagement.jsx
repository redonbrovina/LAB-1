import { useState, useEffect } from 'react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    ProductName: '',
    Price: '',
    StoreId: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/products/with-stores/all');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stores');
      if (response.ok) {
        const data = await response.json();
        setStores(data);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.ProductName.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (!formData.Price) {
      setError('Price is required');
      return;
    }
    
    if (!formData.StoreId) {
      setError('Please select a store');
      return;
    }
    
    // Validate price
    const price = parseFloat(formData.Price);
    if (price < 0) {
      setError('Price must be greater than or equal to 0');
      return;
    }
    
    try {
      const url = editingProduct 
        ? `http://localhost:5000/api/products/${editingProduct.ProductId}`
        : 'http://localhost:5000/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Price: price,
          StoreId: parseInt(formData.StoreId)
        }),
      });

      if (response.ok) {
        await fetchProducts();
        resetForm();
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ProductName: product.ProductName,
      Price: product.Price.toString(),
      StoreId: product.StoreId.toString()
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchProducts();
          setError('');
        } else {
          setError('Failed to delete product');
        }
      } catch (error) {
        setError('Error deleting product');
      }
    }
  };

  const resetForm = () => {
    setFormData({ ProductName: '', Price: '', StoreId: '' });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={formData.ProductName}
                onChange={(e) => setFormData({ ...formData, ProductName: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.Price}
                onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Store</label>
              <select
                value={formData.StoreId}
                onChange={(e) => setFormData({ ...formData, StoreId: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="">Select a store</option>
                {stores.map((store) => (
                  <option key={store.StoreId} value={store.StoreId}>
                    {store.StoreName} - {store.Location}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {editingProduct ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Products List</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage all products in the system
          </p>
        </div>
        <ul className="divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.ProductId}>
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {product.ProductName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.ProductName}
                    </div>
                    <div className="text-sm text-gray-500">
                      💰 ${product.Price}
                    </div>
                    <div className="text-sm text-gray-500">
                      🏪 {product.store?.StoreName} - {product.store?.Location}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.ProductId)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {products.length === 0 && (
          <div className="px-4 py-5 text-center text-gray-500">
            No products found. Add your first product!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;
