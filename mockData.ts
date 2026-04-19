import React from 'react';
import { Star } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}
export function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onChange
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };
  const iconSize = sizeClasses[size];
  return (
    <div className="flex items-center space-x-1 space-x-reverse">
      {[...Array(maxStars)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= rating;
        const isHalf = !isFilled && starValue - 0.5 <= rating;
        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}>
            
            <Star
              className={`${iconSize} ${isFilled ? 'fill-accent text-accent' : isHalf ? 'fill-accent/50 text-accent' : 'fill-transparent text-gray-300'}`} />
            
          </button>);

      })}
    </div>);

}