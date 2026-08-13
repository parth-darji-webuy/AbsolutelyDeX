import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 animate-pulse">
      <div className="w-full aspect-[4/3] bg-zinc-800/60 rounded-xl mb-4" />
      <div className="h-4 bg-zinc-800/60 rounded w-1/3 mb-2" />
      <div className="h-5 bg-zinc-800/80 rounded w-3/4 mb-3" />
      <div className="flex items-center justify-between mt-4">
        <div className="h-6 bg-zinc-800/80 rounded w-1/4" />
        <div className="w-8 h-8 bg-zinc-800/60 rounded-full" />
      </div>
    </div>
  );
}
