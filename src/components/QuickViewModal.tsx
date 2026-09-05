'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Heart, ArrowRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Badge } from './Badge';
import { Button } from './Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { ProductCardData } from './ProductCard';

interface QuickViewModalProps {
  isOpen: boolean;
  product: ProductCardData | null;
  onClose: () => void;
}

export function QuickViewModal({ isOpen, product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset transient state whenever a different product is opened
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setActiveImage(0);
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) {
    return null;
  }

  let parsedImages: string[] = [];
  try {
    parsedImages = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
  } catch (e) {
    parsedImages = [];
  }
  if (!parsedImages || parsedImages.length === 0) {
    parsedImages = ['/images/products/fashion-sneakers-apex.jpg'];
  }

  const primaryImage = parsedImages[activeImage] || parsedImages[0];
  const isSaved = isInWishlist(product.id);
  const hasDiscount = !!(product.discount && product.discount > 0);
  const hasOriginalPrice = !!(product.originalPrice && product.originalPrice > product.price);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      brand: product.brand,
      price: product.price,
      image: primaryImage,
      quantity,
    });
  };

  const thumbnailsRow = (
    <div className="flex items-center gap-3 overflow-x-auto">
      {parsedImages.map((img, idx) => (
        <button
          key={img + idx}
          type="button"
          onClick={() => setActiveImage(idx)}
          className={`relative w-16 h-16 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all shrink-0 ${
            idx === activeImage
              ? 'border-indigo-600 ring-2 ring-indigo-500/30 opacity-100'
              : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
          }`}
        >
          <img
            alt={`${product.name} thumbnail ${idx + 1}`}
            className="object-cover object-center w-full h-full"
            src={img}
          />
        </button>
      ))}
    </div>
  );

  const trustBadgesRow = (
    <div className="grid grid-cols-3 gap-3 text-center">
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
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close quick view"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative flex flex-col w-[92vw] h-[88vh] sm:w-[75vw] sm:h-[75vh] max-w-[1200px] rounded-sm bg-white shadow-2xl dark:bg-zinc-900 overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-20 rounded-full p-1.5 bg-white/80 dark:bg-zinc-900/80 backdrop-blur transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white cursor-pointer"
          aria-label="Close quick view"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-y-auto p-5 sm:p-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 md:gap-10 items-stretch flex-col md:flex-row min-h-full">
            {/* Image Column */}
            <div className="w-full md:w-1/2 shrink-0 flex flex-col">
              <div className="flex-1 min-h-[260px] bg-slate-100 dark:bg-zinc-800 p-4 flex justify-center items-center rounded-sm">
                <img
                  alt={product.name}
                  className="object-contain object-center transition-all duration-300 max-h-[320px] md:max-h-full max-w-full rounded-sm"
                  src={primaryImage}
                />
              </div>
              {/* Thumbnail strip, generated from the product's own images. */}
              <div className="mt-4">{thumbnailsRow}</div>
            </div>

            {/* Details Column */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex items-center flex-wrap gap-3 mb-4 sm:mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {product.brand}
                </p>
                <Badge variant="stock">{product.stockStatus || 'In Stock'}</Badge>
              </div>

              <h2
                id="quick-view-title"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3"
              >
                {product.name}
              </h2>

              <RatingStars rating={product.rating} count={product.reviewCount} size="md" />

              {product.description && (
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mt-4">
                  {product.description}
                </p>
              )}

              <div className="flex items-center flex-wrap gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 my-5 sm:my-6">
                <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                  £{product.price.toFixed(2)}
                </span>
                {hasOriginalPrice && (
                  <span className="text-base sm:text-lg text-zinc-400 dark:text-zinc-500 line-through">
                    £{product.originalPrice!.toFixed(2)}
                  </span>
                )}
                {hasDiscount && <Badge variant="discount">-{product.discount}% OFF</Badge>}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 p-1 w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors font-bold text-lg"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 sm:w-12 text-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors font-bold text-lg"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  className="flex-1 text-sm sm:text-base font-bold shadow-xl"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart
                </Button>
              </div>

              {/* Wishlist + Product Detail, aligned left/right */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => toggleWishlist(product.id, product.name)}
                  className={`flex-1 ${
                    isSaved
                      ? 'border-rose-500/50 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} /> Wishlist
                </Button>

                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold px-6 py-3.5 text-sm sm:text-base hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.98]"
                >
                  Product Detail <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust & Guarantee Badges */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-6 pb-1 border-t border-zinc-200 dark:border-zinc-800/80 text-center">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
                  <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
                  <RefreshCw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
