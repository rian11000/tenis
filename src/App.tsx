import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import MensView from './components/MensView';
import WomensView from './components/WomensView';
import ProductDetailView from './components/ProductDetailView';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';

export default function App() {
  const [currentView, setView] = useState<'home' | 'men' | 'women' | 'login' | 'product-detail'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('vault-v1-nocturnal');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; loggedIn: boolean } | null>(null);

  // Load state from local storage on mount (optional persistent system drop registry)
  useEffect(() => {
    const cachedCart = localStorage.getItem('vault_cart_v1');
    const cachedUser = localStorage.getItem('vault_user_v1');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Error loading vault cart cache', e);
      }
    }
    if (cachedUser) {
      try {
        setUser(JSON.parse(cachedUser));
      } catch (e) {
        console.error('Error loading vault auth connection', e);
      }
    }
  }, []);

  // Save cart modifications to local cache
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('vault_cart_v1', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, size: string) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updateCartState(updated);
    } else {
      updateCartState([...cart, { product, size, quantity: 1 }]);
    }

    // Interactive immediate drawer slide-out confirmation
    setTimeout(() => {
      setIsCartOpen(true);
    }, 150);
  };

  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === productId && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + change;

      if (newQty <= 0) {
        updated.splice(existingIndex, 1);
      } else {
        updated[existingIndex].quantity = newQty;
      }
      updateCartState(updated);
    }
  };

  const handleRemoveItem = (productId: string, size: string) => {
    const updated = cart.filter(
      (item) => !(item.product.id === productId && item.size === size)
    );
    updateCartState(updated);
  };

  const handleClearCart = () => {
    updateCartState([]);
  };

  const handleLoginSuccess = (email: string) => {
    const userSession = { email, loggedIn: true };
    setUser(userSession);
    localStorage.setItem('vault_user_v1', JSON.stringify(userSession));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vault_user_v1');
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setView('product-detail');
  };

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-black">
      {/* Header element */}
      <Header
        currentView={currentView}
        setView={setView}
        cart={cart}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main viewport transition hub */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            onSelectProduct={handleSelectProduct}
            setView={setView}
          />
        )}
        {currentView === 'men' && (
          <MensView
            onSelectProduct={handleSelectProduct}
            setView={setView}
          />
        )}
        {currentView === 'women' && (
          <WomensView
            onSelectProduct={handleSelectProduct}
            setView={setView}
          />
        )}
        {currentView === 'product-detail' && (
          <ProductDetailView
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            setView={setView}
          />
        )}
        {currentView === 'login' && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            setView={setView}
          />
        )}
      </main>

      {/* Footer element */}
      <Footer />

      {/* Slide-over cart bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
