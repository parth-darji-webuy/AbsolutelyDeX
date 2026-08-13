'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ChevronRight, ShoppingBag } from 'lucide-react';
import { ProductGrid } from '@/components/ProductGrid';
import { EmptyState } from '@/components/EmptyState';
import { ProductCardData } from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistPage() {
  const { user } = useAuth();
  const { wishlistIds } = useWishlist();

  const [wishlistProducts, setWishlistProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlistProducts() {
      if (!user) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch('/api/wishlist');
        if (res.ok) {
          const data = await res.json();
          if (data.wishlists) {
            const productsList = data.wishlists.map((w: any) => w.product);
            setWishlistProducts(productsList);
          }
        }
      } catch (e) {
        console.error('Failed to load wishlist items', e);
      } finally {
        setLoading(false);
      }
    }

    loadWishlistProducts();
  }, [user, wishlistIds]);

  return (
    <div className="py-10 bg-zinc-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-200 font-semibold">Saved Wishlist</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" /> YOUR SAVED WISHLIST
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                {user ? `Welcome back ${user.name}. Here are your saved catalog favorites.` : 'Sign in to sync your wishlist across sessions.'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {!user ? (
          <EmptyState
            title="Sign in to view your wishlist"
            description="Your saved wishlist items are securely linked to your account. Sign in to view and save products."
            actionText="Sign In Now"
            onAction={() => (window.location.href = '/signin')}
            icon={<Heart className="w-8 h-8 text-rose-400" />}
          />
        ) : loading ? (
          <ProductGrid products={[]} isLoading={true} skeletonCount={4} />
        ) : wishlistProducts.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Click the heart icon on any product in our catalog to save items for later."
            actionText="Explore Catalog"
            onAction={() => (window.location.href = '/products')}
            icon={<Heart className="w-8 h-8 text-zinc-500" />}
          />
        ) : (
          <ProductGrid products={wishlistProducts} />
        )}
      </div>
    </div>
  );
}
