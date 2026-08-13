'use client';

import React, { useState } from 'react';
import { RatingStars } from './RatingStars';
import { Badge } from './Badge';
import { Button } from './Button';
import { ShoppingBag, Heart, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface ProductInfoData {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice?: number | null;
  discount?: number | null;
  description: string;
  rating: number;
  reviewCount: number;
  stockStatus: string;
  sizes?: string | null;
  colors?: string | null;
  specifications?: string | null;
  images: string;
  categoryName?: string;
}

export function ProductInfo({ product }: { product: ProductInfoData }) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  let sizesList: string[] = [];
  try {
    sizesList = product.sizes ? JSON.parse(product.sizes) : [];
  } catch (e) {}

  let colorsList: string[] = [];
  try {
    colorsList = product.colors ? JSON.parse(product.colors) : [];
  } catch (e) {}

  const [selectedSize, setSelectedSize] = useState<string>(sizesList[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(colorsList[0] || '');
  const [quantity, setQuantity] = useState<number>(1);

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch (e) {
    parsedImages = ['/images/products/fashion-sneakers-apex.jpg'];
  }

  const primaryImage = parsedImages[0] || '/images/products/fashion-sneakers-apex.jpg';
  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      price: product.price,
      image: primaryImage,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      quantity,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Brand & Title */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {product.brand}
          </span>
          <div className="flex items-center gap-2">
            {product.discount && product.discount > 0 && (
              <Badge variant="discount">-{product.discount}% OFF</Badge>
            )}
            <Badge variant="stock">{product.stockStatus || 'In Stock'}</Badge>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 text-sm">
          <RatingStars rating={product.rating} count={product.reviewCount} size="md" />
          <span className="text-zinc-400">•</span>
          <span className="text-zinc-600 dark:text-zinc-400">{product.reviewCount} Verified Customer Reviews</span>
        </div>
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
        <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
          ${product.price.toFixed(2)}
        </span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="text-lg text-zinc-400 dark:text-zinc-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{product.description}</p>

      {/* Size Selector */}
      {sizesList.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5">
            Select Size / Configuration
          </label>
          <div className="flex flex-wrap gap-2.5">
            {sizesList.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedSize === sz
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-md font-bold'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selector */}
      {colorsList.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5">
            Select Color / Finish
          </label>
          <div className="flex flex-wrap gap-2.5">
            {colorsList.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedColor(col)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedColor === col
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {/* Quantity selector */}
        <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-1 w-fit sm:w-auto">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors font-bold text-lg"
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <Button
          variant="secondary"
          size="lg"
          className="flex-1 text-base font-bold shadow-xl"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="w-5 h-5" /> Add to Cart
        </Button>

        {/* Wishlist */}
        <Button
          variant="outline"
          size="lg"
          onClick={() => toggleWishlist(product.id, product.name)}
          className={`p-3.5 ${
            isSaved
              ? 'border-rose-500/50 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
              : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
        </Button>
      </div>

      {/* Trust & Guarantee Badges */}
      <div className="grid grid-cols-3 gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 text-center">
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
          <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Free Express Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">Official Brand Warranty</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
          <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">30-Day Free Returns</span>
        </div>
      </div>
    </div>
  );
}
