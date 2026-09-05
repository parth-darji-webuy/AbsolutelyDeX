import { prisma } from '@/lib/prisma';
import { Hero } from '@/components/Hero';
import { EditorialSection } from '@/components/EditorialSection';
import { TechSpotlight } from '@/components/TechSpotlight';
import { ProductGrid } from '@/components/ProductGrid';
import { ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Dynamic fetch for demo accuracy

export default async function HomePage() {
  // Fetch products from SQLite DB via Prisma
  const [newArrivals, trendingProducts, featuredProducts, recommendedProducts] = await Promise.all([
    prisma.product.findMany({
      where: { isNewArrival: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.findMany({
      where: { isTrending: true },
      take: 4,
      orderBy: { rating: 'desc' },
    }),
    prisma.product.findMany({
      where: { isFeatured: true },
      take: 3,
    }),
    prisma.product.findMany({
      take: 4,
      orderBy: { reviewCount: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. New Arrivals */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
                Fresh Drops
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                NEW ARRIVALS
              </h2>
            </div>
            <Link
              href="/products?filter=new"
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </Link>
          </div>

          <ProductGrid products={newArrivals} />
        </div>
      </section>

      {/* 3. Editorial / Promotional Section */}
      <EditorialSection featuredProducts={featuredProducts} />

      {/* 4. Trending Now */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                High Demand
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                TRENDING NOW
              </h2>
            </div>
            <Link
              href="/products?filter=trending"
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              View All <ArrowRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>
          </div>

          <ProductGrid products={trendingProducts} />
        </div>
      </section>

      {/* 5. Tech Spotlight */}
      <TechSpotlight />

      {/* 6. Recommendations ("Picked for you") */}
      <section className="py-20 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
              Hand-Selected
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              PICKED FOR YOU
            </h2>
          </div>

          <ProductGrid products={recommendedProducts} />
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:via-zinc-900/90 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
              JOIN THE ABSOLUTELYDEX CLUB
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Get exclusive priority access to limited hardware drops, seasonal apparel editorials, and Dev Day special releases.
            </p>

            <form
              action="#"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Subscribe
              </button>
            </form>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-4">
              No spam ever. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
