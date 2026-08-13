import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function RatingStars({ rating, count, size = 'sm', showCount = true }: RatingStarsProps) {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars || (i === fullStars && hasHalf);
          return (
            <Star
              key={i}
              className={clsx(
                iconSizes[size],
                isFilled ? 'fill-amber-400 text-amber-400' : 'text-zinc-600 fill-zinc-800'
              )}
            />
          );
        })}
      </div>
      {showCount && (
        <span className="text-xs font-medium text-zinc-400">
          {rating.toFixed(1)} {count !== undefined && `(${count})`}
        </span>
      )}
    </div>
  );
}
