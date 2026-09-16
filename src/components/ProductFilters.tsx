'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { Button } from './Button';

export interface FilterState {
  category: string;
  maxPrice: number;
  brands: string[];
  minRating: number;
  inStockOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onReset,
  availableBrands,
  isOpenMobile = false,
  onCloseMobile,
}: ProductFiltersProps) {
  const categories = [
    { label: 'All Products', value: 'all' },
    { label: 'Fashion Apparel & Gear', value: 'fashion' },
    { label: 'Technology & Hardware', value: 'technology' },
  ];

  const handleCategoryChange = (val: string) => {
    onFilterChange({ ...filters, category: val });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: Number(e.target.value) });
  };

  const handleBrandToggle = (brand: string) => {
    const exists = filters.brands.includes(brand);
    const updated = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: updated });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating,
    });
  };

  const handleStockToggle = () => {
    onFilterChange({ ...filters, inStockOnly: !filters.inStockOnly });
  };

  const Content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100 text-base">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Filter Catalog
        </div>
        <button
          onClick={onReset}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Category Section */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                filters.category === cat.value
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-white font-semibold border border-zinc-300 dark:border-zinc-700'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Max Price
          </h4>
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">£{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="3500"
          step="50"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full accent-indigo-600 dark:accent-indigo-500 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-xs text-zinc-400 dark:text-zinc-500 mt-1">
          <span>£50</span>
          <span>£3,500</span>
        </div>
      </div>

      {/* Brand Checkboxes */}
      {availableBrands.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Brands
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => {
              const isChecked = filters.brands.includes(brand);
              return (
                <label
                  key={brand}
                  className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-4 h-4 rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                  />
                  <span>{brand}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          Minimum Rating
        </h4>
        <div className="flex gap-2">
          {[4.0, 4.5, 4.8].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                filters.minRating === rating
                  ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 font-semibold'
                  : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              ★ {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <label className="flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleStockToggle}
            className="w-4 h-4 rounded bg-zinc-100 dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
          />
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 self-start sticky top-24 shadow-sm">
        {Content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 p-6 overflow-y-auto flex flex-col justify-between z-10 animate-slide-up shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Filters</h3>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Content}
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
              <Button variant="primary" className="w-full" onClick={onCloseMobile}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
