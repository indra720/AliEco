import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function RatingStars({ rating, count, size = "sm", showCount = true }: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1.5 text-amber-500">
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={`${iconSizes[size]} fill-amber-400 text-amber-400`} />
        ))}
        {hasHalfStar && (
          <StarHalf className={`${iconSizes[size]} fill-amber-400 text-amber-400`} />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${iconSizes[size]} text-gray-300`} />
        ))}
      </div>
      {showCount && (
        <span className="text-xs font-semibold text-ink-secondary">
          {rating.toFixed(1)} {count !== undefined && <span className="font-normal text-ink-tertiary">({count})</span>}
        </span>
      )}
    </div>
  );
}
