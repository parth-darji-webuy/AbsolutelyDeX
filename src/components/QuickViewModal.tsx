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
        className="relative w-full max-w-[840px] rounded-sm bg-white p-6 m-0 md:m-0 shadow-2xl dark:bg-zinc-900"
      > 
         <div     
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full p-1 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white cursor-pointer"
          aria-label="Close quick view"
        >      <X className="w-4 h-4" />
        </div>
            <div className="flex gap-10 items-start md:flex-nowrap flex-wrap">
                <div className="w-1/2">
                  <div className='bg-slate-100 p-4 md:p-0 flex justify-center'>
                    <img alt="Aperture R4 Mirrorless 8K Camera" data-nimg="fill" class="object-cover object-center transition-all duration-300 max-h-[160px] md:max-h-[380px] h-full rounded-sm " src="/images/products/tech-camera-mirrorless.jpg" />
                  </div>
                  <div className="md:flex items-center gap-4 overflow-x-auto mt-4 hidden">
                    <button className="relative w-16 h-16 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all shrink-0 border-indigo-600 ring-2 ring-indigo-500/30 opacity-60 hover:opacity-100">
                      <img alt="Resonance Pro Wireless ANC Headphones thumbnail 1" class="object-cover object-center w-full h-full" src="/images/products/tech-headphones-studio.jpg" />
                    </button>
                    <button className="relative w-16 h-16 rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all shrink-0 border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100">
                      <img alt="Resonance Pro Wireless ANC Headphones thumbnail 2" class="object-cover object-center w-full h-full" src="/images/editorial/tech-spotlight-banner.jpg" />
                    </button>
                  </div>
                </div>
                <div className="">                  
                   <div className="flex items-center mb-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Aperture Optics</p>
                      <p className="flex items-center ml-6 gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-all shadow-sm bg-rose-600 text-white font-bold">-8% OFF</span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-all shadow-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">Low Stock</span>
                      </p>
                  </div>
                  <h2 id="quick-view-title" className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
                    {productName}
                  </h2>
                  <div class="flex items-center gap-3 text-sm">
                    <div class="flex items-center gap-1.5">
                      <div class="flex items-center gap-0.5 text-amber-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-4 h-4 fill-amber-400 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                      </div>
                        <span class="text-xs font-medium text-zinc-400">4.9 (88)</span>
                    </div>
                    <div class="text-zinc-600 dark:text-zinc-400"><span class="text-xs font-medium text-zinc-400">88</span> Verified Customer Reviews</div>
                  </div>
                  <div class="flex items-baseline gap-3 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 my-6"><span class="text-3xl font-black text-zinc-900 dark:text-zinc-100">£3299.00</span><span class="text-lg text-zinc-400 dark:text-zinc-500 line-through">£3599.00</span></div>
                  
                  <div><button class="w-full inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] bg-indigo-600 text-white hover:bg-indigo-500 focus:ring-indigo-600 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500 dark:focus:ring-indigo-600 shadow-md shadow-indigo-600/20 px-6 py-3.5 text-base gap-2.5 font-semibold flex-1 text-base font-bold shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag w-5 h-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg> Add to Cart</button></div>
                  <div class="my-6 flex items-center">
                    <button class="inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] border border-zinc-300 dark:border-zinc-700 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 px-6 py-3.5 text-base gap-2.5 font-semibold p-3.5 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white" aria-label="Wishlist"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-5 h-5 "><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg> Wishlist</button>
                    <a href="" class="ml-auto inline-block flex-1 text-center underline">View full Product Details</a>
                  </div>
                </div>
              </div>       
      </section>
    </div>
  );
}
