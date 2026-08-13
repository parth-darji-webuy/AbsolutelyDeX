import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function CategorySection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-2">
              Catalog Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              CURATED CATEGORIES
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
            Explore two distinct realms of design: luxury technical apparel and precision hardware engineered for high performance.
          </p>
        </div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FASHION CATEGORY CARD */}
          <div className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between min-h-[480px] shadow-2xl hover:border-zinc-700 transition-all duration-500">
            {/* Background Image */}
            <Image
              src="/images/products/fashion-jacket-cyber.jpg"
              alt="Fashion Category"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

            {/* Top Label */}
            <div className="relative z-10 flex justify-between items-start">
              <span className="px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-white text-xs font-bold tracking-wider uppercase border border-zinc-800">
                FASHION
              </span>
              <Link
                href="/products?category=fashion"
                className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xl"
                aria-label="View Fashion Catalog"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Bottom Content & Sub-categories */}
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl font-extrabold text-white">Techno Apparel & Accessories</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                Handcrafted footwear, 3-layer GoreTech outerwear, organic heavy cottons, and architectural eyewear.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Sneakers', 'Outerwear', 'Hoodies & Tees', 'Backpacks', 'Watches'].map((sub) => (
                  <Link
                    key={sub}
                    href="/products?category=fashion"
                    className="px-3 py-1.5 rounded-xl bg-zinc-950/90 text-xs font-semibold text-zinc-200 border border-zinc-800 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* TECHNOLOGY CATEGORY CARD */}
          <div className="group relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between min-h-[480px] shadow-2xl hover:border-zinc-700 transition-all duration-500">
            {/* Background Image */}
            <Image
              src="/images/products/tech-headphones-studio.jpg"
              alt="Technology Category"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

            {/* Top Label */}
            <div className="relative z-10 flex justify-between items-start">
              <span className="px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-cyan-300 text-xs font-bold tracking-wider uppercase border border-cyan-500/30 font-mono">
                TECHNOLOGY
              </span>
              <Link
                href="/products?category=technology"
                className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl"
                aria-label="View Tech Catalog"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Bottom Content & Sub-categories */}
            <div className="relative z-10 space-y-4">
              <h3 className="text-3xl font-extrabold text-white">Hardware & Audio Engineering</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md">
                Beryllium wireless headphones, titanium mobile flagships, 8K cameras, and custom mechanical keyboards.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Audio & Headphones', 'Mobile Flagships', 'Computers', 'Smartwatches', 'Keyboards'].map((sub) => (
                  <Link
                    key={sub}
                    href="/products?category=technology"
                    className="px-3 py-1.5 rounded-xl bg-zinc-950/90 text-xs font-semibold text-zinc-200 border border-zinc-800 hover:border-cyan-500 hover:text-cyan-300 transition-colors"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
