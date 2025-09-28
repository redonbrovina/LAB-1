import { ShoppingCart, Heart, Eye, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onViewDetails, 
  addingToCart = false,
  showAddToCart = true 
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const hasVariations = product.variacionet && product.variacionet.length > 0;
  const price = hasVariations ? product.variacionet[0].cmimi : null;
  const stock = product.sasia_ne_stok || 0;
  
  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-24 mx-auto mb-2">
            <img 
              src={(product && product.imazhi) ? product.imazhi : '/src/client/assets/images/default-pill-bottle.svg'} 
              alt={product?.emri || 'Product'}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/src/client/assets/images/default-pill-bottle.svg';
              }}
            />
          </div>
          <span className="text-orange-600 text-xs font-medium">Pharmaceutical Product</span>
        </div>
        
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart 
            size={16} 
            className={isLiked ? 'text-red-500 fill-current' : 'text-gray-400'} 
          />
        </button>

        {/* Quick View Button */}
        <button
          onClick={handleViewDetails}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all opacity-0 group-hover:opacity-100"
        >
          <Eye size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.kategoria && (
          <div className="text-xs text-gray-500 mb-1">
            {product.kategoria.emri || 'Uncategorized'}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.emri}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.pershkrimi || 'No description available'}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center mb-4">
          <div>
            {price ? (
              <span className="text-lg font-bold text-green-600">
                €{(parseFloat(price) * quantity).toFixed(2)}
              </span>
            ) : (
              <span className="text-sm text-gray-500">No price</span>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </div>
        </div>

        {/* Quantity Selector */}
        {stock > 0 && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 text-center font-medium min-w-[3rem]">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= stock}
                className="p-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Variations Info - Hidden since we only want one variation per product */}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !hasVariations || stock === 0}
              className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              title={
                !hasVariations ? 'Product has no variations' :
                stock === 0 ? 'Product is out of stock' :
                'Add to cart'
              }
            >
              <ShoppingCart size={14} />
              {addingToCart ? 'Adding...' : 
               !hasVariations ? 'No variations' :
               stock === 0 ? 'Out of stock' : 
               `Add ${quantity} to Cart`}
            </button>
          )}
          
          <button
            onClick={handleViewDetails}
            className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            title="View details"
          >
            <Eye size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
