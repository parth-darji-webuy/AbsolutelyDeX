import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from './Button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 py-16 md:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 dark:bg-indigo-600/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" /> Dev Day 2026 Edition
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.08]">
              EXPLORE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-indigo-600 dark:from-white dark:via-zinc-200 dark:to-indigo-400">
                WHAT'S NEXT.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Where high-end technical streetwear meets precision engineering. Built for those who move fast, demand quality, and value modern design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/products?category=fashion">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto shadow-xl">
                  Shop Fashion <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products?category=technology">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Tech
                </Button>
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <span className="text-xl font-extrabold text-zinc-900 dark:text-white block">100%</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Local Real Images</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-zinc-900 dark:text-white block">4.9★</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Customer Rating</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-zinc-900 dark:text-white block">0ms</span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Instant State Sync</span>
              </div>
            </div>
          </div>

          {/* Right Column Editorial Image Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl group">
              <Image
                src="/images/editorial/hero-editorial-fashion.jpg"
                alt="Explore What's Next Editorial"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 block mb-1">
                  Curated Drop
                </span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Monolith & Aura Collection</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">Available now in limited quantities.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
