import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, Zap, ShieldCheck, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from './Button';
import { ProductCardData } from './ProductCard';

interface TechSpotlightProps {
  spotlightProduct?: ProductCardData;
}

export function TechSpotlight({ spotlightProduct }: TechSpotlightProps) {
  const bgImage = spotlightProduct
    ? (typeof spotlightProduct.images === 'string' ? JSON.parse(spotlightProduct.images)[0] : spotlightProduct.images[0])
    : '/images/products/tech-headphones-studio.jpg';

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden transition-colors duration-200">
      {/* Background Cyan Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-300 text-xs font-mono tracking-wider uppercase">
                <Cpu className="w-3.5 h-3.5" /> TECH SPOTLIGHT HARDWARE
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                RESONANCE PRO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-zinc-900 dark:from-cyan-400 dark:via-indigo-300 dark:to-white">
                  ANC HEADPHONES
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                Precision-engineered 45mm beryllium drivers deliver ultra-low distortion spatial sound. Adaptive active noise cancellation blocks up to 42dB of environmental noise.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <Volume2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mb-1" />
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">45mm Beryllium</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Hi-Res Transducers</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-1" />
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">45h Battery Life</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Fast Charge USB-C</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1" />
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Hybrid ANC 42dB</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Quad Microphone Array</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800">
                  <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-1" />
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">LDAC & Lossless</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Bluetooth 5.3 Codec</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Link href="/products/resonance-pro-wireless-anc-headphones">
                  <Button variant="secondary" size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20">
                    View Hardware Specs <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">$399.00</span>
              </div>
            </div>

            {/* Right Large Product Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-950">
                <Image
                  src={bgImage}
                  alt="Resonance Pro Hardware Spotlight"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
