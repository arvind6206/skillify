import { FaClock, FaCheckCircle } from 'react-icons/fa';

const ProgressBar = ({ 
  progress = 0, 
  showPercentage = true, 
  showTime = false, 
  timeSpent = 0, 
  totalTime = 0,
  size = 'medium' // small, medium, large
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'large':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  const getPercentage = () => {
    if (progress > 100) return 100;
    if (progress < 0) return 0;
    return Math.round(progress);
  };

  const getTimeRemaining = () => {
    const remaining = totalTime - timeSpent;
    const hours = Math.floor(remaining / 60);
    const minutes = remaining % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getColorClass = () => {
    const percentage = getPercentage();
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full">
      {/* Progress Info */}
      {(showPercentage || showTime) && (
        <div className="flex justify-between items-center mb-2 text-sm">
          {showPercentage && (
            <div className="flex items-center gap-2">
              {getPercentage() === 100 && (
                <FaCheckCircle className="text-green-500" />
              )}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {getPercentage()}% Complete
              </span>
            </div>
          )}
          {showTime && totalTime > 0 && (
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <FaClock className="text-xs" />
              <span className="text-xs">
                {timeSpent}m / {getTotalTimeDisplay()}m
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Progress Bar */}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${getSizeClasses()}`}>
        <div
          className={`${getColorClass()} ${getSizeClasses()} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${getPercentage()}%` }}
        />
      </div>
      
      {/* Time Remaining */}
      {showTime && totalTime > 0 && getPercentage() < 100 && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {getTimeRemaining()} remaining
        </div>
      )}
    </div>
  );
};

const getTotalTimeDisplay = (time) => {
  if (time >= 60) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  return `${time}m`;
};

export default ProgressBar;
