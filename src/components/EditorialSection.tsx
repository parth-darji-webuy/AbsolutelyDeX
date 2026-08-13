import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard, ProductCardData } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface EditorialSectionProps {
  featuredProducts: ProductCardData[];
}

export function EditorialSection({ featuredProducts }: EditorialSectionProps) {
  const displayProducts = featuredProducts.slice(0, 3);

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Hero Promo Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl group">
              <Image
                src="/images/editorial/everyday-edit-promo.jpg"
                alt="The Everyday Edit"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/90 dark:bg-zinc-950/85 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block">
                  EDITORIAL FEATURE
                </span>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white">THE EVERYDAY EDIT</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                  "Pieces designed for wherever the day takes you."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column Supporting Product Cards Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
                  Selected Pieces
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  CURATED FOR DAILY MOTION
                </h2>
              </div>

              <Link
                href="/products"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
              >
                View All <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
