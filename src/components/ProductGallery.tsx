'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const imageList = images.length > 0 ? images : ['/images/products/fashion-sneakers-apex.jpg'];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = imageList[selectedIndex] || imageList[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-cover object-center transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnail Bar */}
      {imageList.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={clsx(
                'relative w-20 aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all shrink-0',
                selectedIndex === idx
                  ? 'border-indigo-600 ring-2 ring-indigo-500/30 opacity-100 scale-105'
                  : 'border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
