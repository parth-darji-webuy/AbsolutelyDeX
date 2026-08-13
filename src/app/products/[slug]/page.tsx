import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { Reviews } from '@/components/Reviews';
import { ProductGrid } from '@/components/ProductGrid';
import { ChevronRight, Cpu } from 'lucide-react';

export const revalidate = 0;

interface PDPProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailPage({ params }: PDPProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Parse images JSON string
  let imageList: string[] = [];
  try {
    imageList = JSON.parse(product.images);
  } catch (e) {
    imageList = ['/images/products/fashion-sneakers-apex.jpg'];
  }

  // Parse Specifications JSON object
  let specsObj: Record<string, string> = {};
  try {
    specsObj = product.specifications ? JSON.parse(product.specifications) : {};
  } catch (e) {}

  // Related products from same category or random
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
  });

  return (
    <div className="py-10 bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 dark:text-zinc-200 font-semibold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </div>

        {/* Top 2-Column Section (Gallery + Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6">
            <ProductGallery images={imageList} productName={product.name} />
          </div>
          <div className="lg:col-span-6">
            <ProductInfo
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                brand: product.brand,
                price: product.price,
                originalPrice: product.originalPrice,
                discount: product.discount,
                description: product.description,
                rating: product.rating,
                reviewCount: product.reviewCount,
                stockStatus: product.stockStatus,
                sizes: product.sizes,
                colors: product.colors,
                specifications: product.specifications,
                images: product.images,
                categoryName: product.category?.name,
              }}
            />
          </div>
        </div>

        {/* Specifications Table Section */}
        {Object.keys(specsObj).length > 0 && (
          <div className="pt-10 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Technical Specifications</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">Detailed component breakdown and material attributes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
              {Object.entries(specsObj).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 shadow-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Read-Only Reviews Section */}
        <Reviews
          reviews={product.reviews.map((r) => ({
            id: r.id,
            userName: r.userName,
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt,
          }))}
          averageRating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">YOU MAY ALSO LIKE</h3>
              <Link href="/products" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                View Full Catalog →
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
