import { FaFire, FaCalendarCheck } from 'react-icons/fa';

const StudyStreak = ({ streak = 0, lastStudyDate = null }) => {
  const getStreakColor = () => {
    if (streak >= 30) return 'text-purple-600';
    if (streak >= 14) return 'text-blue-600';
    if (streak >= 7) return 'text-green-600';
    if (streak >= 3) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getStreakMessage = () => {
    if (streak >= 30) return 'Amazing! You\'re on fire! 🔥';
    if (streak >= 14) return 'Great consistency! Keep it up!';
    if (streak >= 7) return 'One week strong! Fantastic!';
    if (streak >= 3) return 'Good start! Keep going!';
    if (streak >= 1) return 'Welcome back! Let\'s learn!';
    return 'Start your learning journey!';
  };

  const getStreakLevel = () => {
    if (streak >= 30) return 'Master';
    if (streak >= 14) return 'Expert';
    if (streak >= 7) return 'Dedicated';
    if (streak >= 3) return 'Rising';
    if (streak >= 1) return 'Beginner';
    return 'Newcomer';
  };

  const isStudiedToday = lastStudyDate && 
    new Date(lastStudyDate).toDateString() === new Date().toDateString();

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isStudiedToday ? 'bg-orange-100' : 'bg-gray-100'}`}>
            <FaFire className={`w-5 h-5 ${getStreakColor()} ${isStudiedToday ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{streak}</span>
              <span className="text-sm text-gray-600">day streak</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {getStreakMessage()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs font-medium text-orange-600">
                Level: {getStreakLevel()}
              </span>
              {isStudiedToday && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <FaCalendarCheck className="w-3 h-3" />
                  Today
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyStreak;
