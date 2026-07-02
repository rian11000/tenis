import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Check, X, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface MensViewProps {
  onSelectProduct: (id: string) => void;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
}

export default function MensView({ onSelectProduct, setView }: MensViewProps) {
  // Filters state
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'release' | 'price-asc' | 'price-desc'>('release');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [itemsLimit, setItemsLimit] = useState(8);

  // Filter options available
  const sizes = ['7', '8', '9', '10', '11', '12'];
  const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#121212', border: 'border-neutral-800' },
    { name: 'Grey', hex: '#6B7280' },
    { name: 'Orange', hex: '#F97316' }
  ];

  const priceRanges = [
    { label: '$100 - $250', id: '100-250', min: 100, max: 250 },
    { label: '$250 - $500', id: '250-500', min: 250, max: 500 },
    { label: '$500+', id: '500-plus', min: 500, max: 9999 }
  ];

  // Filter and sort the men's products catalog
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => p.category === 'men');

    // 1. Size filter
    if (selectedSize) {
      result = result.filter(p => p.sizes.includes(selectedSize));
    }

    // 2. Color filter
    if (selectedColor) {
      result = result.filter(p =>
        p.color.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    // 3. Price filter
    if (selectedPriceRange) {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        result = result.filter(p => p.price >= range.min && p.price < range.max);
      }
    }

    // 4. Sort
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedSize, selectedColor, selectedPriceRange, sortBy]);

  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedPriceRange(null);
  };

  const hasActiveFilters = selectedSize !== null || selectedColor !== null || selectedPriceRange !== null;

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-16 px-6 md:px-12 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="text-[10px] font-mono tracking-widest text-neutral-500 mb-6 uppercase flex items-center space-x-2">
          <button onClick={() => setView('home')} className="hover:text-white cursor-pointer">HOME</button>
          <span>/</span>
          <span className="text-neutral-300">MEN SNEAKERS</span>
        </div>

        {/* Headline */}
        <div className="border-b border-neutral-900 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase mb-3">
              MENS SNEAKERS
            </h1>
            <p className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase">
              HIGH-PERFORMANCE BRUTALIST FOOTWEAR / UNDERGROUND ARCHIVE
            </p>
          </div>

          {/* Sorting toggles */}
          <div className="flex items-center space-x-6 text-xs font-mono">
            <span className="text-neutral-500 uppercase tracking-wider">SORTING:</span>
            <div className="flex space-x-4">
              <button
                onClick={() => setSortBy('release')}
                className={`pb-1 transition-colors relative cursor-pointer ${
                  sortBy === 'release' ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
                id="sort-btn-release"
              >
                RELEASE DATE
                {sortBy === 'release' && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-600" />}
              </button>
              <button
                onClick={() => setSortBy(sortBy === 'price-asc' ? 'price-desc' : 'price-asc')}
                className={`pb-1 transition-colors relative flex items-center space-x-1 cursor-pointer ${
                  sortBy.startsWith('price') ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
                id="sort-btn-price"
              >
                <span>PRICE {sortBy === 'price-asc' ? '▲' : sortBy === 'price-desc' ? '▼' : ''}</span>
                {sortBy.startsWith('price') && <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-orange-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block space-y-10">
            {/* Filter Group: Size */}
            <div className="border-b border-neutral-900 pb-8">
              <h3 className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 mb-6 flex justify-between items-center">
                <span>SIZE</span>
                <span className="text-[10px] text-neutral-600 font-normal">US MEN</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`font-mono text-xs py-3 border tracking-widest hover:border-white transition-colors duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-orange-500 border-orange-500 text-black font-bold'
                        : 'border-neutral-850 bg-neutral-950 text-neutral-400'
                    }`}
                    id={`filter-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Color */}
            <div className="border-b border-neutral-900 pb-8">
              <h3 className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 mb-6">
                COLOR
              </h3>
              <div className="flex items-center space-x-3">
                {colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                    className={`w-8 h-8 rounded-none border transition-transform relative flex items-center justify-center group cursor-pointer ${
                      selectedColor === color.name ? 'scale-110 border-orange-500 ring-1 ring-orange-500' : 'border-neutral-800'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    id={`filter-color-${color.name.toLowerCase()}`}
                  >
                    {selectedColor === color.name && (
                      <Check className={`w-4 h-4 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Price */}
            <div className="border-b border-neutral-900 pb-8">
              <h3 className="text-xs font-mono font-bold tracking-[0.25em] uppercase text-neutral-400 mb-6">
                PRICE RANGE
              </h3>
              <div className="space-y-3.5">
                {priceRanges.map(range => (
                  <label
                    key={range.id}
                    className="flex items-center space-x-3 text-xs tracking-wider font-mono text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPriceRange === range.id}
                      onChange={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                      className="accent-orange-500 w-3.5 h-3.5 bg-neutral-900 border-neutral-800 rounded-none focus:ring-0 cursor-pointer"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full bg-neutral-900 border border-neutral-800 hover:border-orange-500 text-xs font-mono tracking-widest uppercase font-bold py-3.5 text-center transition-colors cursor-pointer"
                id="clear-filters-btn"
              >
                CLEAR FILTERS
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle bar */}
          <div className="lg:hidden flex justify-between items-center bg-neutral-950 p-4 border border-neutral-900">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center space-x-2 text-xs font-mono tracking-widest text-neutral-400 hover:text-white"
              id="mobile-filters-trigger"
            >
              <SlidersHorizontal className="w-4 h-4 text-orange-500" />
              <span>FILTERS {hasActiveFilters && `(${[selectedSize, selectedColor, selectedPriceRange].filter(Boolean).length})`}</span>
            </button>
            <span className="text-xs font-mono text-neutral-500">
              {filteredProducts.length} ARCHIVES
            </span>
          </div>

          {/* Main Content: Products Grid */}
          <div className="lg:col-span-3 space-y-12">
            {filteredProducts.length === 0 ? (
              <div className="bg-neutral-950 border border-neutral-900 p-12 text-center">
                <span className="text-orange-500 font-mono text-xs tracking-widest block mb-4 uppercase">SEARCH DEVIATION</span>
                <p className="text-sm font-sans tracking-wide text-neutral-500 uppercase">
                  NO VAULT RECORDS FOUND MATCHING THE ACTIVE SECURE FILTER COEFFICIENTS.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 border border-neutral-800 hover:border-white px-6 py-2.5 text-xs font-mono tracking-widest uppercase"
                  id="empty-clear-filters-btn"
                >
                  RESET GRID SYSTEM
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, itemsLimit).map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                      onClick={() => onSelectProduct(product.id)}
                      className="group cursor-pointer bg-neutral-950 border border-neutral-900 hover:border-neutral-700 p-4 relative flex flex-col justify-between transition-all duration-300"
                      id={`mens-product-card-${product.id}`}
                    >
                      {/* Product Image */}
                      <div>
                        <div className="aspect-square w-full overflow-hidden bg-neutral-900 relative mb-4">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-[#0d0d0d]/10 group-hover:bg-transparent transition-colors duration-300" />
                          
                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                              {product.tags.map(tag => (
                                <span
                                  key={tag}
                                  className={`text-[8px] font-mono font-bold px-2 py-0.5 tracking-widest uppercase ${
                                    tag === 'SOLD OUT' ? 'bg-red-500 text-white' : 'bg-orange-500 text-black'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Title and pricing line */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="font-display font-bold text-sm tracking-wide leading-tight group-hover:text-orange-500 transition-colors uppercase">
                            {product.name}
                          </h3>
                          <span className="font-mono text-sm text-white font-bold whitespace-nowrap">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Subtitle details */}
                      <div className="mt-2 pt-2 border-t border-neutral-950 flex justify-between items-center text-[10px] font-mono">
                        <span className="text-neutral-500 uppercase tracking-widest truncate max-w-[150px]">
                          {product.color}
                        </span>
                        <span className="text-neutral-600">
                          {product.code}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Show pagination / Load More */}
                {filteredProducts.length > itemsLimit && (
                  <div className="pt-12 border-t border-neutral-900 flex flex-col items-center justify-center space-y-4">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      SHOWING {Math.min(itemsLimit, filteredProducts.length)} OF {filteredProducts.length} SNEAKERS
                    </span>
                    <button
                      onClick={() => setItemsLimit(prev => prev + 6)}
                      className="border border-white hover:bg-white hover:text-black font-mono text-xs tracking-widest uppercase font-bold py-4 px-10 transition-all duration-300 cursor-pointer"
                      id="load-more-btn"
                    >
                      LOAD MORE ARCHIVE
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex justify-end"
            id="mobile-filters-modal"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="bg-neutral-950 w-full max-w-sm h-full p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-center border-b border-neutral-900 pb-4 mb-8">
                  <span className="text-xs font-mono tracking-widest uppercase text-orange-500 font-bold">GRID ARCHIVE FILTERS</span>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sizes filter block */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4">SELECT US SIZE</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={`font-mono text-xs py-2.5 border tracking-widest transition-colors ${
                          selectedSize === size
                            ? 'bg-orange-500 border-orange-500 text-black font-bold'
                            : 'border-neutral-900 bg-neutral-900 text-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4">SELECT CORE COLOR</h4>
                  <div className="flex space-x-3">
                    {colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                        className={`w-8 h-8 rounded-none border transition-all ${
                          selectedColor === color.name ? 'scale-110 border-orange-500 ring-2 ring-orange-500/50' : 'border-neutral-800'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price checkbox */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4">SELECT PRICE BRACKET</h4>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center space-x-3 font-mono text-xs text-neutral-400 uppercase">
                        <input
                          type="checkbox"
                          checked={selectedPriceRange === range.id}
                          onChange={() => setSelectedPriceRange(selectedPriceRange === range.id ? null : range.id)}
                          className="accent-orange-500 w-4 h-4 bg-neutral-900 border-neutral-800 rounded-none focus:ring-0"
                        />
                        <span>{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons at bottom */}
              <div className="space-y-3 border-t border-neutral-900 pt-6">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full border border-neutral-800 hover:border-red-500 hover:text-red-500 font-mono text-xs py-3.5 tracking-widest uppercase"
                  >
                    RESET SYSTEMS
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-white text-black font-mono font-bold text-xs py-4 tracking-widest uppercase"
                >
                  APPLY FILTERS ({filteredProducts.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
