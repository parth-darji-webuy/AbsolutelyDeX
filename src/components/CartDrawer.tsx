'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ShoppingBag, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from './Button';
import { EmptyState } from './EmptyState';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    totalItems,
  } = useCart();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-full z-10 shadow-2xl animate-slide-up">
        {/* Drawer Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
             
              <p className="text-md text-zinc-500 dark:text-zinc-400">
                {totalItems} {totalItems === 1 ? 'item' : 'Items in your Basket'}  
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              description="Explore our fashion apparel and high-performance tech hardware to add items to your cart."
              actionText="Browse Products"
              onAction={() => setIsCartOpen(false)}
            />
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-4 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 items-center justify-between shadow-sm"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 shrink-0 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    {item.brand}
                  </span>
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate block"
                  >
                    {item.name}
                  </Link>
{/* 
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {item.selectedSize && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300">
                        {item.selectedSize}
                      </span>
                    )}
                    {item.selectedColor && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300">
                        {item.selectedColor}
                      </span>
                    )}
                  </div> */}

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Quantity controls */}
                    {/* <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-950">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      >
                        +
                      </button>
                    </div> */}
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.cartId)}
                  className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors self-start"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md space-y-4">
            <div className="space-y-2 text-sm">
              {/* <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
              </div> */}
              {/* <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Express Shipping</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div> */}
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-zinc-100 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total</span>
                <span className="text-indigo-600 dark:text-indigo-400">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="w-full text-base font-bold shadow-xl flex items-center justify-center gap-2"
              onClick={() => setCheckoutModalOpen(true)}
            >
              <Lock className="w-4 h-4" /> Proceed to Checkout
            </Button>

            {/* <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dev Day Demo Mode • No real payments processed</span>
            </div> */}
          </div>
        )}

        {/* Disabled Checkout Placeholder Modal */}
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-2xl animate-slide-up">
              <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Checkout Scope</h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                As per Section 11 of the Dev Day project rules, payment processing and checkout flow are disabled. Your cart state is preserved client-side!
              </p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setCheckoutModalOpen(false)}
              >
                Back to Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
