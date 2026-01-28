import { FaUsers, FaDollarSign, FaStar, FaBook, FaArrowUp, FaArrowDown, FaPlay, FaClock } from 'react-icons/fa';

const InstructorQuickStats = ({ stats = [] }) => {
  const defaultStats = [
    { 
      title: 'Total Students', 
      value: 1234, 
      icon: <FaUsers className="text-blue-500" />,
      trend: '+12%',
      trendUp: true,
      change: 145
    },
    { 
      title: 'Total Earnings', 
      value: '$12,345', 
      icon: <FaDollarSign className="text-green-500" />,
      trend: '+8%',
      trendUp: true,
      change: 890
    },
    { 
      title: 'Average Rating', 
      value: '4.7', 
      icon: <FaStar className="text-yellow-500" />,
      trend: '+0.2',
      trendUp: true,
      change: 0.2
    },
    { 
      title: 'Published Courses', 
      value: 8, 
      icon: <FaBook className="text-purple-500" />,
      trend: '+2',
      trendUp: true,
      change: 2
    }
  ];

  const finalStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {finalStats.map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-gray-50">
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stat.trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trendUp ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
              {stat.trend}
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-2">
              {stat.trendUp ? 'Increased' : 'Decreased'} by {stat.change} this month
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorQuickStats;
