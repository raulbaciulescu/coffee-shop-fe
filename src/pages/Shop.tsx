import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Coffee, ChevronDown, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Product } from "../data/products.ts";
import { useProducts } from "../../hooks/useProducts.ts";
import { Footer } from "../components/Footer.tsx";

type RoastLevel = 'Light' | 'Medium' | 'Dark';
type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoastLevels, setSelectedRoastLevels] = useState<RoastLevel[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const { dispatch } = useCart();
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
    document.title = 'Shop | Daily Brew';
    return () => {
      document.title = 'Daily Brew';
    };
  }, []);

  const toggleRoastLevel = (level: RoastLevel) => {
    setSelectedRoastLevels(prev =>
        prev.includes(level)
            ? prev.filter(l => l !== level)
            : [...prev, level]
    );
  };

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.origin.toLowerCase().includes(query) ||
          product.flavorNotes.some(note => note.toLowerCase().includes(query))
      );
    }

    // Apply roast level filter
    if (selectedRoastLevels.length > 0) {
      filtered = filtered.filter(product =>
          selectedRoastLevels.includes(product.roastLevel as RoastLevel)
      );
    }

    // Apply price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [products, searchQuery, selectedRoastLevels, priceRange, sortBy]);

  // Find max price for range input
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 10;
    return Math.ceil(Math.max(...products.map(p => p.price)));
  }, [products]);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  if (loading) {
    return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <Coffee className="w-12 h-12 animate-spin mx-auto mb-4 text-[#6F4E37]" />
            <p className="text-[#2C1810]">Loading products...</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
                onClick={fetchProducts}
                className="text-[#6F4E37] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen pt-16">
        {/* Mobile Filters Button */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="bg-[#6F4E37] text-white p-4 rounded-full shadow-lg"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className={`
            md:w-72 flex-shrink-0
            ${showMobileFilters
                ? 'fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:relative md:bg-transparent'
                : 'hidden md:block'}
          `}>
              {showMobileFilters && (
                  <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button
                        onClick={() => setShowMobileFilters(false)}
                        className="text-gray-500"
                    >
                      ×
                    </button>
                  </div>
              )}

              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-100">
                  <Coffee className="w-6 h-6 text-[#6F4E37]" />
                  <h2 className="text-xl font-bold text-[#2C1810]">Filters</h2>
                </div>

                {/* Search */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#2C1810]">Search</h3>
                  <div className="relative">
                    <input
                        type="text"
                        placeholder="Search coffee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#f8f3e9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6F4E37] placeholder-gray-400"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Roast Level Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#2C1810]">Roast Level</h3>
                  <div className="space-y-3">
                    {['Light', 'Medium', 'Dark'].map((level) => (
                        <label key={level} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative">
                            <input
                                type="checkbox"
                                checked={selectedRoastLevels.includes(level as RoastLevel)}
                                onChange={() => toggleRoastLevel(level as RoastLevel)}
                                className="w-5 h-5 rounded border-2 border-[#6F4E37] text-[#6F4E37] focus:ring-[#6F4E37] focus:ring-offset-0"
                            />
                          </div>
                          <span className="text-gray-700 group-hover:text-[#6F4E37] transition-colors">
                        {level}
                      </span>
                        </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#2C1810]">Price Range</h3>
                  <div className="space-y-4">
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="0.5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                        className="w-full accent-[#6F4E37]"
                    />
                    <div className="flex justify-between items-center">
                    <span className="px-3 py-1.5 bg-[#f8f3e9] rounded-lg text-sm text-[#6F4E37] font-medium">
                      ${priceRange[0].toFixed(2)}
                    </span>
                      <span className="text-sm text-gray-400">to</span>
                      <span className="px-3 py-1.5 bg-[#f8f3e9] rounded-lg text-sm text-[#6F4E37] font-medium">
                      ${priceRange[1].toFixed(2)}
                    </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Sort Dropdown */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {filteredAndSortedProducts.length} products
                </p>
                <div className="relative">
                  <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none bg-white pl-4 pr-10 py-2.5 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F4E37] text-gray-700 cursor-pointer"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {filteredAndSortedProducts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-xl shadow-md">
                    <Coffee className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms</p>
                  </div>
              ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                        <div key={product.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                          <Link to={`/product/${product.id}`} className="block">
                            <div className="aspect-square">
                              <img
                                  src={product.mainImage}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2 text-[#2C1810]">{product.name}</h3>
                              <p className="text-[#6F4E37] font-bold">{product.price}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {product.flavorNotes.slice(0, 2).map((note, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-[#f8f3e9] rounded-full text-xs text-[#6F4E37]"
                                    >
                              {note}
                            </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                          <div className="px-4 pb-4">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-[#6F4E37] text-white py-2 px-4 rounded-lg hover:bg-[#5D3D2B] transition-colors flex items-center justify-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
  );
}