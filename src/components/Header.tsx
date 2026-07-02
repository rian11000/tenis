import React, { useState } from 'react';
import { Search, ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: 'home' | 'men' | 'women' | 'login' | 'product-detail') => void;
  cart: CartItem[];
  toggleCart: () => void;
  user: { email: string; loggedIn: boolean } | null;
  onLogout: () => void;
}

export default function Header({
  currentView,
  setView,
  cart,
  toggleCart,
  user,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: 'HOME', view: 'home' as const },
    { label: 'MEN', view: 'men' as const },
    { label: 'WOMEN', view: 'women' as const },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-900 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { setView('home'); setMobileMenuOpen(false); }}
          className="text-2xl font-display font-bold tracking-widest text-white cursor-pointer hover:opacity-80 transition-opacity"
          id="header-logo-btn"
        >
          VAULT
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-sans tracking-[0.2em] text-neutral-400">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setView(link.view)}
              className={`hover:text-white transition-colors duration-200 cursor-pointer relative py-1 ${
                currentView === link.view ? 'text-white font-medium' : ''
              }`}
              id={`nav-btn-${link.label.toLowerCase()}`}
            >
              {link.label}
              {currentView === link.view && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-orange-600" />
              )}
            </button>
          ))}
          <button
            onClick={() => alert('Accessing vault collections archives... Coming soon.')}
            className="hover:text-white transition-colors duration-200 cursor-pointer py-1"
            id="nav-btn-collections"
          >
            COLLECTIONS
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-6 text-white">
          {/* Search trigger */}
          <div className="relative flex items-center">
            {searchOpen && (
              <input
                type="text"
                placeholder="SEARCH VAULT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-widest text-white py-1.5 px-3 mr-2 w-48 focus:outline-none focus:border-orange-600 transition-all duration-300"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    alert(`Searching archives for: "${searchQuery}"`);
                    setSearchOpen(false);
                  }
                }}
              />
            )}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-orange-500 transition-colors p-1"
              title="Search Archives"
              id="search-trigger-btn"
            >
              <Search className="w-4 h-4 text-neutral-400 hover:text-white" />
            </button>
          </div>

          {/* User authentication portal status */}
          {user?.loggedIn ? (
            <div className="flex items-center space-x-2 text-xs font-mono bg-neutral-900 border border-neutral-800 py-1 px-2.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-neutral-400 hidden sm:inline">{user.email.split('@')[0].toUpperCase()}</span>
              <button
                onClick={onLogout}
                className="text-neutral-500 hover:text-red-500 transition-colors ml-1"
                title="Disconnect Connection"
                id="header-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setView('login')}
              className={`hover:text-orange-500 transition-colors p-1 ${
                currentView === 'login' ? 'text-orange-500' : 'text-neutral-400 hover:text-white'
              }`}
              title="Enter the Vault Portal"
              id="header-login-btn"
            >
              <User className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={toggleCart}
            className="relative p-1 hover:text-orange-500 transition-colors cursor-pointer"
            id="header-cart-btn"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-neutral-400 hover:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-orange-600 text-black text-[9px] font-mono font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#0d0d0d]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 hover:text-orange-500 transition-colors"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-neutral-900 flex flex-col space-y-4 pb-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setView(link.view);
                setMobileMenuOpen(false);
              }}
              className={`text-left text-xs font-sans tracking-[0.25em] py-2 border-b border-neutral-950 hover:text-white transition-colors ${
                currentView === link.view ? 'text-white font-medium pl-2 border-l-2 border-orange-600' : 'text-neutral-400'
              }`}
              id={`mobile-nav-btn-${link.label.toLowerCase()}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              alert('Accessing vault collections archives... Coming soon.');
              setMobileMenuOpen(false);
            }}
            className="text-left text-xs font-sans tracking-[0.25em] text-neutral-400 py-2 border-b border-neutral-950 hover:text-white"
            id="mobile-nav-btn-collections"
          >
            COLLECTIONS
          </button>
        </div>
      )}
    </header>
  );
}
