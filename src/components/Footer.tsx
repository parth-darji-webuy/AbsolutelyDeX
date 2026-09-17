import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Row: Logo, Nav Links, Payment Icons */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
          <Logo imgClassName="h-16 sm:h-20 w-auto" />

          <nav className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2">
            <Link
              href="/products?category=fashion"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Fashion & Gear
            </Link>
            <Link
              href="/products?category=technology"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Technology
            </Link>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Platform & Help
            </Link>
          </nav>

          <div className="flex items-center gap-1.5">
            <VisaIcon />
            <MastercardIcon />
            <AmexIcon />
            <PaypalIcon />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-500 dark:text-zinc-500">
          <span>© {new Date().getFullYear()} AbsolutelyDeX Inc. All rights reserved.</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
