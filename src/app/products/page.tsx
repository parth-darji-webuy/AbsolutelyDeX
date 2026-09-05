'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, ArrowUpDown, ChevronRight } from 'lucide-react';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilters, FilterState } from '@/components/ProductFilters';
import { Pagination } from '@/components/Pagination';
import { EmptyState } from '@/components/EmptyState';
import { ProductCardData } from '@/components/ProductCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  const searchParam = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter') || '';

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: categoryParam,
    maxPrice: 3500,
    brands: [],
    minRating: 0,
    inStockOnly: false,
  });

  // Sync categoryParam from URL if changed
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  // Fetch products from database API or server route
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error('Failed to fetch products', e);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Compute available brands
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet);
  }, [products]);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      // Category filter
      if (filters.category !== 'all') {
        let catName = '';
        try {
          catName = (product as any).category?.slug || '';
        } catch (e) {}
        if (filters.category === 'fashion' && catName !== 'fashion') {
          if (!product.slug.includes('fashion') && !['AURA Studio', 'DE-X Technical', 'Structure Lab', 'Chronos Atelier'].includes(product.brand)) {
            return false;
          }
        }
        if (filters.category === 'technology' && catName !== 'technology') {
          if (!['Acoustica', 'Nexus Hardware', 'Horizon Compute', 'Aperture Optics', 'CyberBoard'].includes(product.brand)) {
            return false;
          }
        }
      }

      // Special Filter Param from URL (new / trending)
      if (filterParam === 'new' && !product.isNewArrival) return false;
      if (filterParam === 'trending' && !product.isTrending) return false;

      // Price filter
      if (product.price > filters.maxPrice) return false;

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) return false;

      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) return false;

      // Stock filter
      if (filters.inStockOnly && product.stockStatus !== 'In Stock') return false;

      return true;
    });
  }, [products, searchQuery, filters, filterParam]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => (a.isNewArrival ? -1 : 1));
      case 'featured':
      default:
        return list.sort((a, b) => (a.isFeatured ? -1 : 1));
    }
  }, [filteredProducts, sortBy]);

  // Pagination (8 items per page)
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Dynamic page heading based on active category / URL filter / search
  const pageMeta = useMemo(() => {
    const categoryLabels: Record<string, { title: string; crumb: string; noun: string }> = {
      fashion: { title: 'SHOP FASHION', crumb: 'Fashion Apparel', noun: 'fashion apparel & gear' },
      technology: { title: 'SHOP TECHNOLOGY', crumb: 'Technology Hardware', noun: 'technology & hardware' },
    };

    if (searchQuery.trim()) {
      return {
        title: `SEARCH: ${searchQuery.trim().toUpperCase()}`,
        crumb: 'Search Results',
        noun: 'matching products',
      };
    }

    if (filterParam === 'new') {
      return { title: "WHAT'S NEW", crumb: "What's New", noun: 'newly launched products' };
    }
    if (filterParam === 'trending') {
      return { title: 'SHOP TRENDING', crumb: 'Trending Now', noun: 'trending products' };
    }

    return (
      categoryLabels[filters.category] || {
        title: 'SHOP CATALOG',
        crumb: 'Catalog Products',
        noun: 'curated products across Fashion & Technology',
      }
    );
  }, [filters.category, filterParam, searchQuery]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      maxPrice: 3500,
      brands: [],
      minRating: 0,
      inStockOnly: false,
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
              Catalog
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{pageMeta.crumb}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {pageMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Showing {filteredProducts.length} {pageMeta.noun}.
              </p>
            </div>

            {/* Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Filters
              </button>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-zinc-900 dark:text-white focus:outline-none cursor-pointer font-semibold"
                >
                  <option value="featured" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Sort: Featured</option>
                  <option value="price-asc" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Price: Low to High</option>
                  <option value="price-desc" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Price: High to Low</option>
                  <option value="rating" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Highest Rated</option>
                  <option value="newest" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">What&apos;s New</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            filters={filters}
            onFilterChange={(f) => {
              setFilters(f);
              setCurrentPage(1);
            }}
            onReset={handleResetFilters}
            availableBrands={availableBrands}
            isOpenMobile={mobileFiltersOpen}
            onCloseMobile={() => setMobileFiltersOpen(false)}
          />

          {/* Product Listing Main View */}
          <div className="flex-1 space-y-6">
            {/* Active Category Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-200/80 dark:border-zinc-800/80 pb-4 overflow-x-auto">
              {[
                { label: 'All Catalog', value: 'all' },
                { label: 'Fashion Apparel', value: 'fashion' },
                { label: 'Technology Hardware', value: 'technology' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: tab.value }));
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    filters.category === tab.value
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-zinc-100/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Product Grid / Empty State */}
            {loading ? (
              <ProductGrid products={[]} isLoading={true} skeletonCount={8} />
            ) : paginatedProducts.length === 0 ? (
              <EmptyState
                title="No products matched your criteria"
                description="Try adjusting your filters, price slider, or search query to explore more items."
                actionText="Reset Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
