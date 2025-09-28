import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { productsAPI } from '../utils/api';

export default function ProductSearch({ 
  onSearchResults, 
  onSearchClear,
  placeholder = "Kërko produkte...",
  showResults = true 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery.trim());
      } else if (searchQuery.trim().length === 0 && hasSearched) {
        clearSearch();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, hasSearched]);

  const performSearch = async (query) => {
    if (!query || query.length < 3) return;

    setIsSearching(true);
    try {
      const results = await productsAPI.search(query);
      setSearchResults(results);
      setHasSearched(true);
      
      if (onSearchResults) {
        onSearchResults(results, query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
    
    if (onSearchClear) {
      onSearchClear();
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim().length > 2) {
        performSearch(searchQuery.trim());
      }
    }
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
        
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {showResults && hasSearched && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-500 px-3 py-2 border-b">
                {searchResults.length} rezultat{searchResults.length !== 1 ? 'e' : ''} për "{searchQuery}"
              </div>
              {searchResults.map((product) => (
                <div
                  key={product.produktiID}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  onClick={() => {
                    // You can add navigation or selection logic here
                    console.log('Selected product:', product);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-400 text-xs">📦</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-sm">
                        {product.emri}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {product.kategoria?.emri || 'Uncategorized'}
                      </p>
                      {product.cmimi && (
                        <p className="text-xs text-green-600 font-medium">
                          €{product.cmimi}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <div className="text-sm">Nuk u gjetën rezultate për "{searchQuery}"</div>
              <div className="text-xs mt-1">Provo me terma të tjerë</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
