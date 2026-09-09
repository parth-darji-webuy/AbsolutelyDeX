'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Badge } from './Badge';
import { useWishlist } from '@/context/WishlistContext';
import { QuickViewModal } from './QuickViewModal';

export interface ProductCardData {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  description?: string;
  images: string;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  stockStatus?: string;
  sizes?: string | null;
  colors?: string | null;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch (e) {
    parsedImages = ['/images/products/fashion-sneakers-apex.jpg'];
  }

  const primaryImage = parsedImages[0] || '/images/products/fashion-sneakers-apex.jpg';
  const isSaved = isInWishlist(product.id);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  return (
    <div className="group relative bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl dark:hover:shadow-indigo-500/5">
      {/* Top Badges & Wishlist */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          {product.discount && product.discount > 0 && (
            <Badge variant="discount">-{product.discount}%</Badge>
          )}
          {product.isTrending && <Badge variant="trending">Trending</Badge>}
          {product.isNewArrival && <Badge variant="new">New</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 z-10 ${
            isSaved
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
              : 'bg-white/80 dark:bg-zinc-900/70 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-900 shadow-sm'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
          <button
            onClick={handleQuickView}
            className="flex-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 active:scale-[0.98] transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Quick View
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="p-2.5 bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center shadow-md"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
            <span className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <RatingStars rating={product.rating} count={product.reviewCount} size="sm" />
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-200/80 dark:border-zinc-800/60">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              £{product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-zinc-400 dark:text-zinc-500 line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
            {product.stockStatus || 'In Stock'}
          </span>
        </div>
      </div>
      <QuickViewModal
        isOpen={isQuickViewOpen}
        product={product}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
