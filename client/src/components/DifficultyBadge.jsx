import { FaSignal, FaStar, FaTrophy } from 'react-icons/fa';

const DifficultyBadge = ({ level = 'beginner', size = 'medium' }) => {
  const getDifficultyConfig = () => {
    const configs = {
      beginner: {
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        borderColor: 'border-green-200',
        icon: FaSignal,
        label: 'Beginner',
        description: 'Perfect for starting out'
      },
      intermediate: {
        color: 'blue',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        borderColor: 'border-blue-200',
        icon: FaStar,
        label: 'Intermediate',
        description: 'Some experience recommended'
      },
      advanced: {
        color: 'purple',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        borderColor: 'border-purple-200',
        icon: FaTrophy,
        label: 'Advanced',
        description: 'Expert level content'
      }
    };
    
    return configs[level] || configs.beginner;
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-1 text-xs';
      case 'large':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  const config = getDifficultyConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 ${config.bgColor} ${config.textColor} ${config.borderColor} border rounded-full ${getSizeClasses()} font-medium`}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
};

export default DifficultyBadge;
