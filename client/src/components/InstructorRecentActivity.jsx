import { FaUsers, FaStar, FaComment, FaEye, FaShoppingCart, FaClock } from 'react-icons/fa';

const InstructorRecentActivity = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Student Enrollment',
      description: 'Sarah Johnson enrolled in "Complete Web Development"',
      student: 'Sarah Johnson',
      course: 'Complete Web Development',
      time: '5 minutes ago',
      icon: <FaUsers className="text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      type: 'review',
      title: 'New Course Review',
      description: 'Mike Chen rated "React Advanced" 5 stars',
      student: 'Mike Chen',
      course: 'React Advanced',
      rating: 5,
      time: '15 minutes ago',
      icon: <FaStar className="text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 3,
      type: 'comment',
      title: 'New Question Posted',
      description: 'Emily Davis asked about JavaScript closures',
      student: 'Emily Davis',
      course: 'JavaScript Fundamentals',
      time: '1 hour ago',
      icon: <FaComment className="text-purple-500" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 4,
      type: 'purchase',
      title: 'Course Purchase',
      description: 'John Smith bought "Python for Beginners"',
      student: 'John Smith',
      course: 'Python for Beginners',
      amount: 49.99,
      time: '2 hours ago',
      icon: <FaShoppingCart className="text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 5,
      type: 'completion',
      title: 'Course Completed',
      description: 'Lisa Wang completed "CSS Mastery"',
      student: 'Lisa Wang',
      course: 'CSS Mastery',
      time: '3 hours ago',
      icon: <FaEye className="text-indigo-500" />,
      color: 'bg-indigo-50 border-indigo-200'
    }
  ];

  const finalActivities = activities.length > 0 ? activities : defaultActivities;

  const formatTimeAgo = (time) => {
    return time;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FaClock className="text-indigo-600" />
            Recent Activity
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all activity
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {finalActivities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${activity.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div className="p-2 rounded-lg bg-white border border-gray-200">
                  {activity.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(activity.time)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {activity.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaUsers className="w-3 h-3" />
                    {activity.student}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaEye className="w-3 h-3" />
                    {activity.course}
                  </span>
                  {activity.rating && (
                    <span className="flex items-center gap-1">
                      <FaStar className="w-3 h-3 text-yellow-500" />
                      {activity.rating} stars
                    </span>
                  )}
                  {activity.amount && (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <FaShoppingCart className="w-3 h-3" />
                      ${activity.amount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {finalActivities.length} recent activities
          </p>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Export activity log →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorRecentActivity;
