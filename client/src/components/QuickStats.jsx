import { FaClock, FaBookOpen, FaTrophy, FaBullseye } from 'react-icons/fa';

const QuickStats = ({ stats = {} }) => {
  const defaultStats = {
    todayMinutes: 45,
    weekMinutes: 320,
    completedCourses: 3,
    currentGoal: 5
  };

  const finalStats = { ...defaultStats, ...stats };

  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const getProgressPercentage = () => {
    return Math.min((finalStats.completedCourses / finalStats.currentGoal) * 100, 100);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Today's Study Time */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <FaClock className="text-blue-600 w-4 h-4" />
          <span className="text-xs text-blue-600 font-medium">Today</span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {formatTime(finalStats.todayMinutes)}
        </div>
        <div className="text-xs text-gray-600">Study time</div>
      </div>

      {/* Weekly Study Time */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
        <div className="flex items-center justify-between mb-2">
          <FaBookOpen className="text-green-600 w-4 h-4" />
          <span className="text-xs text-green-600 font-medium">This Week</span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {formatTime(finalStats.weekMinutes)}
        </div>
        <div className="text-xs text-gray-600">Total time</div>
      </div>

      {/* Completed Courses */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
        <div className="flex items-center justify-between mb-2">
          <FaTrophy className="text-purple-600 w-4 h-4" />
          <span className="text-xs text-purple-600 font-medium">Completed</span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {finalStats.completedCourses}
        </div>
        <div className="text-xs text-gray-600">Courses</div>
      </div>

      {/* Goal Progress */}
      <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
        <div className="flex items-center justify-between mb-2">
          <FaBullseye className="text-orange-600 w-4 h-4" />
          <span className="text-xs text-orange-600 font-medium">Goal</span>
        </div>
        <div className="text-lg font-bold text-gray-900">
          {finalStats.completedCourses}/{finalStats.currentGoal}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
