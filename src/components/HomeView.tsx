import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, X, Heart } from 'lucide-react';
import { Product, BlogPost } from '../types';
import { PRODUCTS, BLOGS } from '../data';

interface HomeViewProps {
  onSelectProduct: (id: string) => void;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
}

export default function HomeView({ onSelectProduct, setView }: HomeViewProps) {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<'audio' | 'video' | null>(null);

  // Retrieve the first 4 products for the New Arrivals section
  const newArrivals = PRODUCTS.filter(p => ['vlt-01-prototype', 'canyon-tech-boot', 'steel-link-wallet', 'core-heavy-hoodie'].includes(p.id));

  // Handle a product click
  const handleProductClick = (id: string) => {
    onSelectProduct(id);
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen selection:bg-orange-600 selection:text-black">
      {/* 1. Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden border-b border-neutral-900">
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1508849789987-4e5333c12b78?q=80&w=1600&auto=format&fit=crop"
            alt="Dark Alley Neon"
            className="w-full h-full object-cover opacity-45 scale-105 filter grayscale contrast-125 transition-all duration-700 hover:scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-[#0d0d0d]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start mt-12 md:mt-0">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs md:text-sm tracking-[0.4em] text-orange-500 mb-4"
          >
            [ DROP 004 / LIMITED ]
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold leading-none text-6xl sm:text-7xl md:text-9xl tracking-tight uppercase mb-8"
          >
            STREET <br />
            <span className="text-outline-thick text-white">LEGACY.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
          >
            <button
              onClick={() => setView('men')}
              className="bg-white text-black font-mono text-xs tracking-[0.25em] py-4 px-10 hover:bg-orange-500 hover:text-black transition-all duration-300 font-bold text-center uppercase cursor-pointer"
              id="hero-shop-now-btn"
            >
              SHOP NOW
            </button>
            <button
              onClick={() => setView('women')}
              className="border border-white/40 text-white hover:border-white hover:bg-white/5 font-mono text-xs tracking-[0.25em] py-4 px-10 transition-all duration-300 text-center uppercase cursor-pointer"
              id="hero-lookbook-btn"
            >
              LOOKBOOK
            </button>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 right-6 hidden md:flex flex-col items-center space-y-2 z-10 text-[10px] font-mono tracking-[0.3em] text-neutral-500 uppercase">
          <span className="transform rotate-90 origin-left mt-16 whitespace-nowrap">SCROLL ARCHIVE</span>
          <div className="w-[1px] h-12 bg-neutral-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-orange-500 animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. New Arrivals Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 uppercase mb-2 block">RECENT RELEASES</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight uppercase">NEW ARRIVALS</h2>
          </div>
          <button
            onClick={() => setView('men')}
            className="text-xs font-mono tracking-widest text-neutral-400 hover:text-white hover:underline transition-colors mt-4 sm:mt-0 uppercase cursor-pointer"
            id="view-all-releases-btn"
          >
            VIEW ALL RELEASES →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => handleProductClick(product.id)}
              className="group cursor-pointer bg-neutral-950 border border-neutral-900 hover:border-neutral-700 transition-all duration-300 p-4 relative"
              id={`product-card-${product.id}`}
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden bg-neutral-900 relative mb-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0d0d]/10 group-hover:bg-transparent transition-colors duration-300" />

                {/* Badges */}
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
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

              {/* Product Info */}
              <div className="flex justify-between items-start pt-2">
                <div>
                  <h3 className="font-display font-medium text-sm tracking-wide group-hover:text-orange-500 transition-colors uppercase">
                    {product.name}
                  </h3>
                  <p className="font-mono text-xs text-neutral-500 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-mono text-xs text-neutral-600">
                  {product.code}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Culture & Ethos Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <span className="text-[10px] font-mono tracking-[0.3em] text-orange-500 uppercase mb-3 block">CULTURE & ETHOS</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight uppercase mb-6">
              BEYOND THE <br />
              HYPE CYCLE.
            </h2>
            <p className="text-neutral-400 text-sm tracking-wide leading-relaxed mb-8">
              VAULT is an exploration of the underground. We don't follow trends; we archive moments. Every piece is a testament to the raw energy of urban subcultures—where architecture meets the street. We believe in high-density construction, aggressive technical specifications, and raw physical expression.
            </p>

            <button
              onClick={() => setManifestoOpen(true)}
              className="flex items-center space-x-4 group cursor-pointer text-xs font-mono tracking-widest uppercase font-bold text-white hover:text-orange-500 transition-colors"
              id="read-manifesto-btn"
            >
              <span className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
              <span>READ THE MANIFESTO</span>
            </button>
          </div>

          {/* Graphical/Atmospheric panels */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel 1: DJ Mix (Audio Archive) */}
            <div
              className="relative aspect-[4/5] overflow-hidden bg-neutral-900 group cursor-pointer border border-neutral-900 hover:border-neutral-800 transition-all duration-300"
              onClick={() => setActiveMedia('audio')}
              id="media-archive-audio"
            >
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop"
                alt="Studio setup"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0d0d0d]/30 group-hover:bg-[#0d0d0d]/10 transition-colors" />
              {/* Label at bottom */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-neutral-900 p-3.5 flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">AUDIO ARCHIVE / 001</span>
                <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
              </div>
            </div>

            {/* Panel 2: Skate Park / Brutalist Study */}
            <div
              className="relative aspect-[4/5] overflow-hidden bg-neutral-900 group cursor-pointer border border-neutral-900 hover:border-neutral-800 transition-all duration-300"
              onClick={() => setActiveMedia('video')}
              id="media-study-video"
            >
              <img
                src="https://images.unsplash.com/photo-1564982722480-e72fc74792d6?q=80&w=600&auto=format&fit=crop"
                alt="Skate park structures"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-[#0d0d0d]/30 group-hover:bg-[#0d0d0d]/10 transition-colors" />
              {/* Highlight card floating top-right */}
              <div className="absolute top-4 right-4 bg-[#F28268] text-black text-[9px] font-mono font-bold py-1 px-3 tracking-[0.2em] uppercase">
                VISUAL STUDY / 042
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-neutral-900 p-3.5 flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">CONCRETE LANDSCAPE</span>
                <span className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center group-hover:bg-orange-500 group-hover:text-black group-hover:border-orange-500 transition-all">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Culture Blogs Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-16">
          <span className="w-12 h-[1px] bg-orange-600 block" />
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight uppercase">THE CULTURE</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {BLOGS.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col justify-between group cursor-pointer border-t border-neutral-900 pt-8 hover:border-orange-500/50 transition-colors duration-300"
              onClick={() => alert(`Opening Vault Editorial: "${blog.title}"`)}
              id={`blog-post-${blog.id}`}
            >
              <div>
                <span className="text-[10px] font-mono text-neutral-500 block mb-3 uppercase tracking-widest">
                  {blog.date} — {blog.category}
                </span>
                <h3 className="font-display font-bold text-lg md:text-xl tracking-wide uppercase leading-snug group-hover:text-orange-500 transition-colors mb-4 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-neutral-500 tracking-wider leading-relaxed line-clamp-3 mb-6 uppercase">
                  {blog.description}
                </p>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase mt-auto">
                ACCESS SYSTEM →
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Manifesto Overlay Modal */}
      <AnimatePresence>
        {manifestoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            id="manifesto-modal"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-neutral-800 p-8 md:p-12 max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setManifestoOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                id="manifesto-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-mono text-xs text-orange-500 tracking-[0.4em] uppercase mb-4">
                VAULT SYSTEM // MANIFESTO 001
              </div>
              <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-8 border-b border-neutral-900 pb-4">
                AUTHENTICITY IS THE ONLY CURRENCY WE ACCEPT.
              </h3>

              <div className="space-y-6 text-sm text-neutral-400 tracking-wide leading-relaxed uppercase">
                <p>
                  1. We operate in the dark, designing for the concrete slabs and sodium floodlights of the night.
                </p>
                <p>
                  2. We deny the transient hype machine. Standard fashion is built on disposability. Vault items are archives — permanent monuments of subculture, built with redundant stress-tested materials.
                </p>
                <p>
                  3. Every stitch must be visible, every seam raw, every cut structural. Form does not follow fashion; form follows friction.
                </p>
                <p>
                  4. The city is our stage. Our designs respond directly to metropolitan density, transit corridors, and subterranean environments.
                </p>
                <p>
                  5. No excess. No vanity labels. Only pure architecture for the body.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-neutral-900 flex justify-between items-center">
                <span className="font-mono text-[10px] text-neutral-600 uppercase">ESTABLISHED FOR THE UNDERGROUND</span>
                <button
                  onClick={() => setManifestoOpen(false)}
                  className="bg-white text-black font-mono text-[10px] font-bold tracking-widest px-6 py-2.5 hover:bg-orange-500 hover:text-black transition-colors"
                  id="manifesto-acknowledge-btn"
                >
                  ESTABLISH PROTOCOL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Media Player Overlay Modal */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            id="media-modal"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-950 border border-neutral-800 p-6 max-w-xl w-full relative"
            >
              <button
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                id="media-close-btn"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="font-mono text-xs text-orange-500 tracking-[0.3em] uppercase mb-2">
                {activeMedia === 'audio' ? 'PLAYING LIVE DEVIATED FREQUENCIES' : 'ESTABLISHING TRANSMISSION STUDY'}
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">
                {activeMedia === 'audio' ? 'VAULT BROADCAST // DEEP INDUSTRIAL SYNTH 09' : 'STUDY 042 // BRUTALIST CONCRETE MOTION'}
              </h3>

              {/* Simulated visualizer */}
              <div className="bg-[#000] border border-neutral-900 h-48 flex items-center justify-center relative overflow-hidden mb-6">
                {activeMedia === 'audio' ? (
                  <div className="flex items-end justify-center space-x-1.5 h-20 w-4/5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((i) => (
                      <div
                        key={i}
                        className="bg-orange-500 w-1.5 rounded-t"
                        style={{
                          height: `${Math.floor(Math.random() * 80) + 15}%`,
                          animation: `bounce 0.8s ease-in-out infinite alternate`,
                          animationDelay: `${i * 0.05}s`
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center grayscale opacity-80" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1564982722480-e72fc74792d6?q=80&w=600&auto=format&fit=crop')` }}>
                    <div className="absolute inset-0 bg-black/60" />
                    <span className="relative z-10 text-[10px] font-mono text-green-500 uppercase animate-pulse">STREAMING FEED: //LIVE_LINK_042</span>
                    <div className="relative z-10 w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center mt-3 animate-spin border-t-transparent" />
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 text-xs text-neutral-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span>SIGNAL ACTIVE // 96KBPS</span>
                </div>
                <button
                  onClick={() => setActiveMedia(null)}
                  className="bg-neutral-900 text-white font-mono text-xs tracking-widest px-6 py-2 hover:bg-orange-600 hover:text-black transition-all"
                  id="media-terminate-btn"
                >
                  TERMINATE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
