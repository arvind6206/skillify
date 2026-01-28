import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ 
  rating = 0, 
  maxRating = 5, 
  size = 'medium', // small, medium, large
  interactive = false,
  onRatingChange,
  showValue = true,
  readonly = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const getStarSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className={`${getSizeClasses()} text-yellow-400 ${interactive && !readonly ? 'cursor-pointer hover:text-yellow-300' : ''} transition-colors`}
          onClick={() => interactive && !readonly && onRatingChange && onRatingChange(i + 1)}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className={`${getSizeClasses()} text-yellow-400 ${interactive && !readonly ? 'cursor-pointer hover:text-yellow-300' : ''} transition-colors`}
          onClick={() => interactive && !readonly && onRatingChange && onRatingChange(fullStars + 0.5)}
        />
      );
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar
          key={`empty-${i}`}
          className={`${getSizeClasses()} text-gray-300 ${interactive && !readonly ? 'cursor-pointer hover:text-yellow-400' : ''} transition-colors`}
          onClick={() => interactive && !readonly && onRatingChange && onRatingChange(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
        />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {renderStars()}
      </div>
      {showValue && (
        <span className={`text-gray-600 font-medium ${getStarSize()}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {interactive && !readonly && (
        <span className="text-xs text-gray-500 ml-2">
          Click to rate
        </span>
      )}
    </div>
  );
};

export default StarRating;
