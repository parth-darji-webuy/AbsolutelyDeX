'use client';

import Link from 'next/link';
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import { ProductGrid } from '@/components/ProductGrid';

interface RelatedProductsProps {
    products: any[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
    const enableRelatedProducts = useFeatureIsOn('enable-quality-assurance');
    if (!enableRelatedProducts || products.length === 0) {
        return null;
    }

    return (
        <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
                    YOU MAY ALSO LIKE
                </h3>

                <Link
                    href="/products"
                    className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                    View Full Catalog →
                </Link>
            </div>

            <ProductGrid products={products} />
        </div>
    );
}