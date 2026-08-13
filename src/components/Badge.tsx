import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  variant?: 'new' | 'trending' | 'discount' | 'stock' | 'tech';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'new', children, className }: BadgeProps) {
  const styles = {
    new: 'bg-indigo-600 text-white font-semibold',
    trending: 'bg-amber-500 text-zinc-950 font-bold',
    discount: 'bg-rose-600 text-white font-bold',
    stock: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium',
    tech: 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] tracking-wider uppercase',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs transition-all shadow-sm',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
