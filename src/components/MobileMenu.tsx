'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Search, Sparkles, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { wishlistIds } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between h-full z-10 shadow-2xl animate-slide-up">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/" onClick={onClose} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
                Absolutely<span className="text-indigo-600 dark:text-indigo-500">DeX</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 pl-10 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
            />
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3 top-3" />
          </form>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 font-medium text-sm">
            <Link
              href="/products"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <span>Shop All Products</span>
              <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
            </Link>
            <Link
              href="/products?category=fashion"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <span>Fashion Apparel</span>
              <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
            </Link>
            <Link
              href="/products?category=technology"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <span>Technology Hardware</span>
              <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
            </Link>
            <Link
              href="/products?filter=new"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-indigo-600 dark:text-indigo-400 font-semibold transition-colors"
            >
              <span>New Arrivals</span>
              <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-indigo-500" />
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Saved Wishlist ({wishlistIds.length})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600" />
            </Link>
          </nav>
        </div>

        {/* Footer Auth Section */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-600/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-200 dark:border-indigo-500/40">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/signin"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 text-center shadow-md shadow-indigo-600/20"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 text-center"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
