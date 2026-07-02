import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Plus, Minus, Info, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailViewProps {
  productId: string;
  onAddToCart: (product: Product, size: string) => void;
  onSelectProduct: (id: string) => void;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
}

export default function ProductDetailView({
  productId,
  onAddToCart,
  onSelectProduct,
  setView
}: ProductDetailViewProps) {
  // Find current product in the catalog
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'materials' | 'shipping'>('materials');
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Reset states on product change
  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedSize('');
    setAddedSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Find other items in same category as related
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('PLEASE SELECT A SIZE BEFORE INITIATING INVENTORY LOCK.');
      return;
    }

    setIsAdding(true);
    setTimeout(() => {
      onAddToCart(product, selectedSize);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }, 800);
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="bg-[#0c0c0c] text-white py-12 px-6 md:px-12 selection:bg-orange-500 selection:text-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb Navigation */}
        <div className="text-[10px] font-mono tracking-widest text-neutral-500 mb-8 uppercase flex flex-wrap items-center gap-2">
          <button onClick={() => setView('home')} className="hover:text-white cursor-pointer">HOME</button>
          <span>/</span>
          <button onClick={() => setView(product.category === 'women' ? 'women' : 'men')} className="hover:text-white cursor-pointer">
            {product.category === 'women' ? 'WOMEN SNEAKERS' : 'MEN SNEAKERS'}
          </button>
          <span>/</span>
          <span className="text-neutral-300 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Core Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Block: Image Gallery (Span 7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/5] bg-neutral-950 border border-neutral-900 overflow-hidden group">
              {/* Product Main Frame */}
              <img
                src={product.images[activeImageIdx]}
                alt={`${product.name} perspective`}
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />

              {/* Navigation Arrows for Multi-image */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-orange-500 hover:text-black border border-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                    id="prev-image-btn"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-orange-500 hover:text-black border border-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
                    id="next-image-btn"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Float Indicator */}
              <span className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-sm border border-neutral-900 text-[10px] font-mono tracking-widest text-neutral-400 py-1 px-3">
                PERSPECTIVE {activeImageIdx + 1} / {product.images.length}
              </span>
            </div>

            {/* Thumbnail Carousel Row */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square bg-neutral-950 border overflow-hidden transition-all duration-200 cursor-pointer ${
                      activeImageIdx === idx ? 'border-orange-500 ring-1 ring-orange-500' : 'border-neutral-900 hover:border-neutral-700'
                    }`}
                    id={`thumb-btn-${idx}`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Block: Configuration & Details (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header Identity */}
            <div className="border-b border-neutral-900 pb-6 relative">
              <span className="absolute -top-4 right-0 font-mono text-3xl font-extrabold text-neutral-800">
                {product.code}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono tracking-[0.34em] text-orange-500 uppercase">VAULT PROTOCOL COMPLIANT</span>
                <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight uppercase">
                  {product.name}
                </h1>
              </div>
              
              {/* Price Line */}
              <div className="flex items-baseline space-x-4 mt-4">
                {product.originalPrice && (
                  <span className="text-neutral-500 font-mono text-sm line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-orange-500 font-mono text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-neutral-600 bg-neutral-950 border border-neutral-900 py-0.5 px-2 uppercase">
                  DUTY INCLUDED
                </span>
              </div>
            </div>

            {/* Sizes Grid Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400 tracking-wider uppercase">SELECT ARCHIVE SIZE</span>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-neutral-500 hover:text-white underline transition-colors uppercase"
                  id="size-chart-btn"
                >
                  SIZE SYSTEM CHART
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3.5 border font-mono text-xs tracking-widest transition-all duration-200 cursor-pointer ${
                      selectedSize === size
                        ? 'bg-white border-white text-black font-bold ring-2 ring-orange-500/30'
                        : 'border-neutral-900 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                    }`}
                    id={`detail-size-btn-${size}`}
                  >
                    US {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to bag Action button */}
            <div className="pt-2">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-mono font-extrabold text-xs tracking-[0.3em] py-5 uppercase flex items-center justify-center space-x-3 transition-all duration-300 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500"
                id="add-to-cart-btn"
              >
                {isAdding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>MUTATING INVENTORY DATA...</span>
                  </>
                ) : addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>BAG SECURED SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>
            </div>

            {/* Tabs for materials, details, shipping */}
            <div className="border border-neutral-900 bg-neutral-950/50">
              <div className="flex border-b border-neutral-900 font-mono text-[10px] tracking-widest">
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`flex-1 py-3 text-center uppercase border-r border-neutral-900 transition-colors ${
                    activeTab === 'materials' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  id="tab-btn-materials"
                >
                  SPECIFICATIONS & MATERIALS
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`flex-1 py-3 text-center uppercase transition-colors ${
                    activeTab === 'shipping' ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  id="tab-btn-shipping"
                >
                  SHIPPING & OPERATIONS
                </button>
              </div>

              <div className="p-5 text-xs text-neutral-400 tracking-wider leading-relaxed uppercase">
                {activeTab === 'materials' ? (
                  <div className="space-y-4">
                    <p className="text-neutral-300 mb-2">
                      {product.details || 'Technical specifications generated for limited runs. Fully weatherproofed structural panels.'}
                    </p>
                    {product.materials && (
                      <ul className="space-y-2.5 list-disc pl-4 text-neutral-400">
                        {product.materials.map((mat, i) => (
                          <li key={i}>{mat}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <p className="text-neutral-400">
                    {product.shipping || 'Orders are securely processed within 24-48 business hours. Members gain immediate priority air transport access.'}
                  </p>
                )}
              </div>
            </div>

            {/* Editorial quote block */}
            <div className="border-l-2 border-orange-500 pl-4 py-1 text-xs text-neutral-500 font-mono tracking-wider italic leading-relaxed uppercase">
              "THE SILHOUETTE SPEAKS FOR ITSELF. A MANIFESTO OF STREET ARCHITECTURE TRANSLATED INTO REDUNDANT COMFORT AND SHOCK ABSORPTION."
            </div>
          </div>
        </div>

        {/* Bottom Section: Related Complements Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-neutral-900 pt-16">
            <div className="flex items-center space-x-3 mb-10">
              <span className="w-10 h-[1.5px] bg-orange-600 block" />
              <h2 className="text-2xl font-display font-extrabold uppercase tracking-tight">
                ARCHIVE COMPLEMENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <div
                  key={relProduct.id}
                  onClick={() => onSelectProduct(relProduct.id)}
                  className="bg-neutral-950 border border-neutral-900 hover:border-neutral-700 p-4 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
                  id={`related-product-card-${relProduct.id}`}
                >
                  <div>
                    <div className="aspect-square overflow-hidden bg-neutral-900 relative mb-4">
                      <img
                        src={relProduct.images[0]}
                        alt={relProduct.name}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="font-display font-bold text-xs tracking-wide group-hover:text-orange-500 transition-colors uppercase">
                        {relProduct.name}
                      </h3>
                      <span className="font-mono text-xs text-white">
                        ${relProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-neutral-600 pt-2 border-t border-neutral-950 mt-2 uppercase">
                    SYS CODE: {relProduct.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Chart Modal Overlay */}
      <AnimatePresence>
        {showSizeChart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            id="size-chart-modal"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-neutral-800 p-6 md:p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setShowSizeChart(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                id="size-chart-close"
              >
                ✕
              </button>

              <span className="text-[10px] font-mono tracking-widest text-orange-500 uppercase block mb-2">SIZE MATRIX PROTOCOL</span>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-6 border-b border-neutral-900 pb-3">
                US / EU FOOTWEAR MATRIX
              </h3>

              <div className="space-y-3 font-mono text-xs uppercase">
                <div className="flex justify-between py-2 border-b border-neutral-950 text-neutral-500 font-bold">
                  <span>US SIZING</span>
                  <span>EU CONVERSION</span>
                </div>
                {[
                  { us: 'US 5', eu: 'EU 37.5' },
                  { us: 'US 6', eu: 'EU 39' },
                  { us: 'US 7', eu: 'EU 40' },
                  { us: 'US 8', eu: 'EU 41' },
                  { us: 'US 9', eu: 'EU 42.5' },
                  { us: 'US 10', eu: 'EU 44' },
                  { us: 'US 11', eu: 'EU 45' },
                  { us: 'US 12', eu: 'EU 46.5' },
                  { us: 'US 13', eu: 'EU 48' }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-neutral-950 text-neutral-300">
                    <span>{row.us}</span>
                    <span className="text-orange-500">{row.eu}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowSizeChart(false)}
                className="w-full bg-white text-black font-mono font-bold text-xs py-3.5 tracking-widest uppercase mt-6 hover:bg-orange-500 transition-colors"
              >
                CONFIRM SIZING COEFFICIENT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
