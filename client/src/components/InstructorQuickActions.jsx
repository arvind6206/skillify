import { FaVideo, FaTasks, FaFilePdf, FaChalkboardTeacher, FaChartLine, FaUsers, FaEdit, FaPlus } from 'react-icons/fa';

const InstructorQuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'Create New Course',
      description: 'Start building a new course',
      icon: <FaPlus className="text-2xl text-indigo-600" />,
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      action: 'create-course'
    },
    {
      id: 2,
      title: 'Upload Video Lesson',
      description: 'Add video content to courses',
      icon: <FaVideo className="text-2xl text-green-600" />,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      action: 'upload-video'
    },
    {
      id: 3,
      title: 'Create Assignment',
      description: 'Set up student assignments',
      icon: <FaTasks className="text-2xl text-purple-600" />,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      action: 'create-assignment'
    },
    {
      id: 4,
      title: 'Upload Resources',
      description: 'Share PDFs and other materials',
      icon: <FaFilePdf className="text-2xl text-red-600" />,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      action: 'upload-resources'
    },
    {
      id: 5,
      title: 'Start Live Session',
      description: 'Host a live class or webinar',
      icon: <FaChalkboardTeacher className="text-2xl text-blue-600" />,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      action: 'live-session'
    },
    {
      id: 6,
      title: 'View Analytics',
      description: 'Check course performance',
      icon: <FaChartLine className="text-2xl text-orange-600" />,
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      action: 'view-analytics'
    }
  ];

  const handleAction = (action) => {
    console.log(`Action triggered: ${action}`);
    // Here you would implement the actual action logic
    switch (action) {
      case 'create-course':
        // Navigate to course creation or open modal
        break;
      case 'upload-video':
        // Open video upload modal
        break;
      case 'create-assignment':
        // Navigate to assignment creation
        break;
      case 'upload-resources':
        // Open file upload dialog
        break;
      case 'live-session':
        // Navigate to live session setup
        break;
      case 'view-analytics':
        // Navigate to analytics dashboard
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FaEdit className="text-indigo-600" />
          Quick Actions
        </h3>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleAction(action.action)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left group ${action.color}`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Frequently used actions for quick access
          </p>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Customize actions →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorQuickActions;
