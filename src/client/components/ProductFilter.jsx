import { Filter, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ProductFilter({ 
  categories = [], 
  onFilterChange, 
  currentFilters = {},
  showAdvanced = false 
}) {
  const [isExpanded, setIsExpanded] = useState(showAdvanced);
  const [filters, setFilters] = useState({
    category: currentFilters.category || '',
    priceRange: currentFilters.priceRange || '',
    inStock: currentFilters.inStock || false,
    sortBy: currentFilters.sortBy || 'name'
  });

  const priceRanges = [
    { value: '', label: 'Të gjitha çmimet' },
    { value: '0-10', label: '€0 - €10' },
    { value: '10-25', label: '€10 - €25' },
    { value: '25-50', label: '€25 - €50' },
    { value: '50-100', label: '€50 - €100' },
    { value: '100+', label: 'Mbi €100' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Emri (A-Z)' },
    { value: 'name-desc', label: 'Emri (Z-A)' },
    { value: 'price-low', label: 'Çmimi (më i ulët)' },
    { value: 'price-high', label: 'Çmimi (më i lartë)' },
    { value: 'newest', label: 'Më të rinjtë' },
    { value: 'oldest', label: 'Më të vjetrit' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: '',
      inStock: false,
      sortBy: 'name'
    };
    setFilters(clearedFilters);
    
    if (onFilterChange) {
      onFilterChange(clearedFilters);
    }
  };

  const hasActiveFilters = filters.category || filters.priceRange || filters.inStock || filters.sortBy !== 'name';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="font-medium text-gray-700">Filtrat</span>
          {hasActiveFilters && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Aktive
            </span>
          )}
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategoria
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Të gjitha kategoritë</option>
              {categories.map(category => (
                <option key={category.kategoriaID} value={category.kategoriaID}>
                  {category.emri}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gama e Çmimit
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Filter */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Vetëm në stok</span>
            </label>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rendit sipas
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <X size={14} />
                Pastro Filtrat
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
