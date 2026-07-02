import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, CreditCard, Lock, RefreshCw } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      setTimeout(() => {
        setCheckoutComplete(false);
        onClearCart();
        onClose();
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            id="cart-backdrop"
          />

          {/* Drawer Body */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-screen max-w-md bg-[#090909] border-l border-neutral-900 text-white flex flex-col justify-between"
              id="cart-drawer-panel"
            >
              {/* Header */}
              <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                  <h2 className="text-sm font-mono font-bold tracking-[0.2em] uppercase">
                    SHOPPING BAG // {cart.reduce((sum, item) => sum + item.quantity, 0)} ITEMS
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  id="close-cart-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <span className="text-orange-500 font-mono text-xs tracking-widest uppercase animate-pulse">
                      SECURE BAG EMPTY
                    </span>
                    <p className="text-xs font-sans tracking-widest text-neutral-500 max-w-xs uppercase leading-relaxed">
                      NO ACTIVE ARTIFACTS CURRENTLY LOCKED IN SESSION MEMORY. ACCESS SNEAKER GRIDS TO SOURCE DESIGNS.
                    </p>
                    <button
                      onClick={onClose}
                      className="border border-neutral-800 hover:border-white px-6 py-2.5 text-xs font-mono tracking-widest uppercase transition-colors"
                      id="cart-empty-browse-btn"
                    >
                      BROWSE SNEAKERS
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex items-start space-x-4 pb-6 border-b border-neutral-950"
                      id={`cart-item-${item.product.id}-${item.size}`}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-24 bg-neutral-900 border border-neutral-900 overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover filter grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-display font-bold text-xs tracking-wide uppercase truncate pr-2">
                            {item.product.name}
                          </h3>
                          <span className="font-mono text-xs text-orange-500 font-bold whitespace-nowrap">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        {/* Config: size and code */}
                        <div className="flex flex-wrap gap-2 text-[9px] font-mono text-neutral-500">
                          <span className="bg-neutral-950 border border-neutral-900 py-0.5 px-2 uppercase">
                            SIZE: US {item.size}
                          </span>
                          <span className="bg-neutral-950 border border-neutral-900 py-0.5 px-2 uppercase">
                            CODE: {item.product.code}
                          </span>
                        </div>

                        {/* Adjust qty and Delete row */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-neutral-900 bg-neutral-950 text-neutral-400">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                              className="px-2.5 py-1 hover:text-white transition-colors"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-mono text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                              className="px-2.5 py-1 hover:text-white transition-colors"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-neutral-500 hover:text-red-500 transition-colors py-1 pl-2"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer pricing / checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-900 bg-black/80 space-y-4">
                  {/* Pricing line items */}
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span className="uppercase">VALUATION SUB-TOTAL</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500">
                      <span className="uppercase">AIR COURIER SHIPPING</span>
                      <span className="text-green-500">FREE PROTOCOL</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-sm pt-2.5 border-t border-neutral-950">
                      <span className="uppercase">TOTAL SUM</span>
                      <span className="text-orange-500">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut || checkoutComplete}
                      className="w-full bg-[#efefef] hover:bg-orange-500 text-black font-mono font-bold text-xs tracking-[0.25em] py-4 uppercase transition-all duration-300 flex items-center justify-center space-x-2 border-b-4 border-neutral-300 hover:border-orange-600 cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-transparent"
                      id="cart-checkout-btn"
                    >
                      {isCheckingOut ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>SYNCHRONIZING SECURE WALLET...</span>
                        </>
                      ) : checkoutComplete ? (
                        <span>TRANSMISSION PROTOCOL EXECUTED</span>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>INITIATE CHECKOUT PROTOCOL</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={onClose}
                      className="w-full text-center text-[10px] font-mono text-neutral-500 hover:text-white transition-colors uppercase py-2 tracking-widest cursor-pointer"
                    >
                      CONTINUE ARCHIVING SNEAKERS
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
