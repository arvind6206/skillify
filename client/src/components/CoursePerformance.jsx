import { FaChartLine, FaUsers, FaStar, FaPlayCircle, FaClock, FaCheckCircle } from 'react-icons/fa';

const CoursePerformance = ({ courses = [] }) => {
  const defaultCourses = [
    {
      _id: '1',
      title: 'Complete Web Development Bootcamp',
      students: 234,
      rating: 4.8,
      completionRate: 78,
      totalHours: 45,
      revenue: 8900,
      trend: 'up'
    },
    {
      _id: '2',
      title: 'React - The Complete Guide',
      students: 156,
      rating: 4.6,
      completionRate: 65,
      totalHours: 32,
      revenue: 5600,
      trend: 'stable'
    },
    {
      _id: '3',
      title: 'Advanced JavaScript Patterns',
      students: 89,
      rating: 4.9,
      completionRate: 82,
      totalHours: 28,
      revenue: 3200,
      trend: 'up'
    }
  ];

  const courseData = courses.length > 0 ? courses : defaultCourses;

  const getPerformanceColor = (rate) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">📈</span>;
      case 'down':
        return <span className="text-red-500">📉</span>;
      default:
        return <span className="text-gray-500">➡️</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FaChartLine className="text-indigo-600" />
            Course Performance
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All Analytics
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courseData.map((course) => (
              <tr key={course._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {course.title.length > 30 ? course.title.substring(0, 30) + '...' : course.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <FaUsers className="w-4 h-4 mr-2 text-blue-500" />
                    {course.students}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <FaStar className="w-4 h-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(course.completionRate)}`}>
                      <FaCheckCircle className="w-3 h-3 mr-1" />
                      {course.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${(course.revenue || 0).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getTrendIcon(course.trend)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Showing {courseData.length} courses</span>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Export Report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformance;
