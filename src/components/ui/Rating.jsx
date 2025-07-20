import React from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

const Rating = ({ rating, maxRating = 5, onRatingChange, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-[var(--icon-sm)] w-[var(--icon-sm)]',
    md: 'h-[var(--icon-md)] w-[var(--icon-md)]',
    lg: 'h-[var(--icon-lg)] w-[var(--icon-lg)]',
  };

  return (
    <div className="flex items-center">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={`cursor-pointer ${sizeClasses[size]} ${starValue <= rating ? 'text-[var(--green-primary)]' : 'text-[var(--text-muted)]'}`}
            onClick={() => onRatingChange(starValue)}
            fill={starValue <= rating ? 'currentColor' : 'none'}
          />
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  maxRating: PropTypes.number,
  onRatingChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Rating;