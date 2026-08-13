import React from 'react';
import { RatingStars } from './RatingStars';
import { CheckCircle, MessageSquare } from 'lucide-react';

export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string | Date;
}

interface ReviewsProps {
  reviews: ReviewItem[];
  averageRating: number;
  reviewCount: number;
}

export function Reviews({ reviews, averageRating, reviewCount }: ReviewsProps) {
  return (
    <div className="space-y-8 pt-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> Customer Reviews
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Real feedback from verified purchasers (Read-only for Dev Day showcase).
          </p>
        </div>

        {/* Rating Score Box */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto shadow-sm">
          <span className="text-4xl font-black text-zinc-900 dark:text-zinc-100">{averageRating.toFixed(1)}</span>
          <div>
            <RatingStars rating={averageRating} showCount={false} size="md" />
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">Based on {reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 flex flex-col justify-between gap-3 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{rev.userName}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>
                <RatingStars rating={rev.rating} showCount={false} size="sm" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {new Date(rev.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
