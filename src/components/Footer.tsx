import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter } from 'lucide-react';

function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="w-11 h-7 rounded border border-zinc-200 dark:border-zinc-700" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <text x="24" y="21" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fontStyle="italic" fill="#1A1F71">VISA</text>
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="w-11 h-7 rounded border border-zinc-200 dark:border-zinc-700" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <circle cx="20" cy="16" r="9" fill="#EB001B" />
      <circle cx="30" cy="16" r="9" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" className="w-11 h-7 rounded border border-zinc-200 dark:border-zinc-700" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1F72CD" />
      <text x="24" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#fff">AMEX</text>
    </svg>
  );
}

function PaypalIcon() {
  return (
    <svg viewBox="0 0 48 32" className="w-11 h-7 rounded border border-zinc-200 dark:border-zinc-700" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <text x="24" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="#003087">
        Pay<tspan fill="#0070BA">Pal</tspan>
      </text>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                Absolutely<span className="text-indigo-600 dark:text-indigo-500">DeX</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              Curated luxury fashion & high-performance technology for modern creators. Built for Dev Day with a focus on premium aesthetics and responsive engineering.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Fashion & Gear
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products?category=fashion" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Minimal Sneakers
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Weatherproof Jackets
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Technology
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products?category=technology" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  ANC Headphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=technology" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Precision Laptops
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-4">
              Platform & Help
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/signin" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Member Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} AbsolutelyDeX Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <div className="flex items-center gap-1.5">
              <VisaIcon />
              <MastercardIcon />
              <AmexIcon />
              <PaypalIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
