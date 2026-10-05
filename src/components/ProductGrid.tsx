'use client';
import React from 'react';
import { useFeatureValue, useFeatureIsOn } from '@growthbook/growthbook-react';
import { ProductCard, ProductCardData } from './ProductCard';
import { SkeletonCard } from './SkeletonCard';

interface ProductGridProps {
  products: ProductCardData[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({
  products,
  isLoading = false,
  skeletonCount = 8,
}: ProductGridProps) {

      /*
       * GrowthBook evaluates the quick-view feature
       * for the current user.
       *
       * Expected values:
       *   control
       *   treatment
       */
    const quickViewVariant = useFeatureValue('quick-view-enabled', false);
    const quickViewVariant1 = useFeatureValue("quick-view-style","text");

    console.log('GrowthBook variant:', quickViewVariant1);
     console.log('GrowthBook variant:', quickViewVariant);

    const isTreatment = quickViewVariant === true;
    const quickViewStyleTreatment = quickViewVariant1 === "text" ? "text" : "icon";


  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(skeletonCount)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isEnabled={isTreatment} quickViewStyle={quickViewStyleTreatment}/>
      ))}
    </div>
  );
}
