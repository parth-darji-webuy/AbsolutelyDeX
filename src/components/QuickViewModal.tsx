'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface QuickViewModalProps {
  isOpen: boolean;
  productName: string;
  price: number;
  onClose: () => void;
}

export function QuickViewModal({ isOpen, productName, price, onClose }: QuickViewModalProps) {
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

  if (!isOpen) {
    return null;
  }

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
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label="Close quick view"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Quick View
        </p>
        <h2 id="quick-view-title" className="pr-10 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {productName}
        </h2>
        <p className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">${price.toFixed(2)}</p>
      </section>
    </div>
  );
}
