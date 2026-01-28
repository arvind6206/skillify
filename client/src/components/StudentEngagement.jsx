import { FaUsers, FaEye, FaHeart, FaComment, FaShare, FaClock, FaTrophy, FaChartLine } from 'react-icons/fa';

const StudentEngagement = ({ data = {} }) => {
  const defaultData = {
    totalStudents: 1234,
    activeStudents: 890,
    engagementRate: 72,
    averageWatchTime: 25,
    totalInteractions: 5678,
    topPerformers: [
      { name: 'John Doe', courses: 5, completion: 95, avatar: 'JD' },
      { name: 'Jane Smith', courses: 4, completion: 88, avatar: 'JS' },
      { name: 'Mike Johnson', courses: 3, completion: 92, avatar: 'MJ' }
    ],
    weeklyActivity: [
      { day: 'Mon', students: 120, interactions: 450 },
      { day: 'Tue', students: 145, interactions: 520 },
      { day: 'Wed', students: 167, interactions: 610 },
      { day: 'Thu', students: 189, interactions: 780 },
      { day: 'Fri', students: 156, interactions: 590 },
      { day: 'Sat', students: 98, interactions: 320 },
      { day: 'Sun', students: 115, interactions: 380 }
    ]
  };

  const finalData = { ...defaultData, ...data };

  const getEngagementColor = (rate) => {
    if (rate >= 80) return 'text-green-600 bg-green-100';
    if (rate >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const maxInteractions = Math.max(...finalData.weeklyActivity.map(d => d.interactions));

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <FaUsers className="text-blue-500 text-xl" />
            <span className="text-xs text-green-600 font-medium">+12%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{finalData.totalStudents.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <FaEye className="text-green-500 text-xl" />
            <span className="text-xs text-green-600 font-medium">+8%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{finalData.activeStudents.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Students</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <FaChartLine className="text-purple-500 text-xl" />
            <span className="text-xs text-green-600 font-medium">+5%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{finalData.engagementRate}%</div>
          <div className="text-sm text-gray-600">Engagement Rate</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <FaClock className="text-orange-500 text-xl" />
            <span className="text-xs text-red-600 font-medium">-2%</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{finalData.averageWatchTime}m</div>
          <div className="text-sm text-gray-600">Avg. Watch Time</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaChartLine className="text-indigo-600" />
          Weekly Activity
        </h3>
        
        <div className="space-y-4">
          {finalData.weeklyActivity.map((day, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm text-gray-900">{day.students} students</div>
                  <div className="text-xs text-gray-500">{day.interactions} interactions</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(day.interactions / maxInteractions) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Top Performers
        </h3>
        
        <div className="space-y-3">
          {finalData.topPerformers.map((student, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {student.avatar}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">{student.courses} courses enrolled</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEngagementColor(student.completion)}`}>
                  {student.completion}% complete
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentEngagement;
