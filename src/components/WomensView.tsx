import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, Star, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface WomensViewProps {
  onSelectProduct: (id: string) => void;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
}

export default function WomensView({ onSelectProduct, setView }: WomensViewProps) {
  const [activeTag, setActiveTag] = useState<string>('ALL');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [registered, setRegistered] = useState(false);

  const tags = [
    'ALL',
    'PLATFORM CHUNKY',
    'AERODYNAMIC SILHOUETTES',
    'DECONSTRUCTED CANVAS',
    'METAL HARDWARE'
  ];

  // Map tag to filter condition
  const filteredProducts = useMemo(() => {
    const womensProducts = PRODUCTS.filter(p => p.category === 'women');

    if (activeTag === 'ALL') {
      return womensProducts;
    } else if (activeTag === 'PLATFORM CHUNKY') {
      return womensProducts.filter(p => ['v-brutalist-high', 'onyx-glass-sock'].includes(p.id));
    } else if (activeTag === 'AERODYNAMIC SILHOUETTES') {
      return womensProducts.filter(p => ['aero-01-chrome', 'iris-velocity'].includes(p.id));
    } else if (activeTag === 'DECONSTRUCTED CANVAS') {
      return womensProducts.filter(p => ['raw-stitch-09'].includes(p.id));
    } else if (activeTag === 'METAL HARDWARE') {
      return womensProducts.filter(p => ['buckle-m01-red'].includes(p.id));
    }

    return womensProducts;
  }, [activeTag]);

  const handleRegisterNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setRegistered(true);
      setNewsletterEmail('');
      setTimeout(() => setRegistered(false), 6000);
    }
  };

  return (
    <div className="bg-[#090909] min-h-screen text-white py-16 px-6 md:px-12 selection:bg-orange-500 selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <div className="text-[10px] font-mono tracking-widest text-neutral-500 mb-6 uppercase flex items-center space-x-2">
          <button onClick={() => setView('home')} className="hover:text-white cursor-pointer">HOME</button>
          <span>/</span>
          <span className="text-neutral-300">WOMEN SNEAKERS</span>
        </div>

        {/* Header - Filled/Outlined dual typography */}
        <div className="text-center mb-16 border-b border-neutral-900 pb-12">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-extrabold tracking-tighter uppercase leading-none mb-4">
            WOMENS <br className="sm:hidden" />
            <span className="text-outline-thick text-white">SNEAKERS</span>
          </h1>
          <p className="text-xs font-mono tracking-[0.3em] text-orange-500 uppercase max-w-xl mx-auto">
            A MANIFESTO OF SYMMETRY AND INDUSTRIAL DESTRUCTION
          </p>
        </div>

        {/* Filter Navigation Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-4xl mx-auto">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-[9px] sm:text-xs font-mono tracking-widest py-2.5 px-5 transition-all duration-300 relative cursor-pointer border ${
                activeTag === tag
                  ? 'bg-orange-500 text-black border-orange-500 font-bold'
                  : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:border-neutral-700 hover:text-white'
              }`}
              id={`filter-tag-${tag.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => onSelectProduct(product.id)}
              className="group cursor-pointer bg-neutral-950 border border-neutral-900 hover:border-neutral-750 p-5 relative flex flex-col justify-between transition-all duration-300"
              id={`womens-product-card-${product.id}`}
            >
              {/* Product Visual */}
              <div>
                <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative mb-5">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#0d0d0d]/10 group-hover:bg-transparent transition-colors duration-300" />
                  
                  {/* Badges */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-col gap-1">
                      {product.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[8px] font-mono font-bold bg-white text-black px-2 py-0.5 tracking-widest uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Code badge at bottom-right */}
                  <span className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm border border-neutral-900 text-[9px] font-mono tracking-widest text-neutral-400 py-1 px-2.5 uppercase">
                    SYS: {product.code}
                  </span>
                </div>

                {/* Meta details */}
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="font-display font-bold text-base tracking-wide group-hover:text-orange-500 transition-colors uppercase leading-tight">
                    {product.name}
                  </h3>
                  <span className="font-mono text-base text-white font-bold whitespace-nowrap">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Specs footer */}
              <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-500">
                <span className="uppercase truncate max-w-[200px]">{product.color}</span>
                <span className="text-orange-500 uppercase hover:underline cursor-pointer">ACQUIRE ARTIFACT →</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded beautiful Drop Registry Newsletter Block */}
        <div className="bg-neutral-950 border border-neutral-900 p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute -top-12 -left-12 w-32 h-32 border border-neutral-900 transform rotate-45 pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 border border-neutral-900 transform rotate-45 pointer-events-none" />

          <div className="max-w-md space-y-2 relative z-10">
            <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 uppercase block">DROP ACCESS TELEMETRY</span>
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
              NEVER MISS A RESTORATION drop
            </h3>
            <p className="text-xs text-neutral-500 tracking-wide leading-relaxed uppercase">
              Configure your secure notification profile to receive cryptographically stamped invitations to upcoming micro-production iterations.
            </p>
          </div>

          <form onSubmit={handleRegisterNewsletter} className="w-full md:w-auto min-w-[280px] sm:min-w-[340px] flex items-stretch relative z-10">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="ENTER SECURE EMAIL..."
              className="bg-[#050505] border border-neutral-850 text-xs font-mono tracking-widest text-white py-4 px-4 w-full focus:outline-none focus:border-orange-500 uppercase"
              required
            />
            <button
              type="submit"
              className="bg-white hover:bg-orange-500 text-black font-mono text-xs font-bold px-6 uppercase transition-all duration-300 flex items-center justify-center cursor-pointer"
              id="womens-newsletter-submit"
            >
              {registered ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            </button>
          </form>

          {registered && (
            <div className="absolute bottom-2 left-12 right-12 text-center text-[10px] font-mono text-orange-500 uppercase tracking-widest">
              REGISTRATION DEPLOYED. KEY ENCRYPTED IN EMAIL SENTINEL.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
