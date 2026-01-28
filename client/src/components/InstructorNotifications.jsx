import { FaBell, FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const InstructorNotifications = ({ notifications = [] }) => {
  const [dismissed, setDismissed] = useState([]);

  const defaultNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'New Student Enrollment',
      message: 'John Doe just enrolled in your React course',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Course Review Pending',
      message: 'Your JavaScript course needs review for compliance',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Payment Processed',
      message: 'You received $450 from course sales this week',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Low Engagement Alert',
      message: 'Student engagement dropped by 15% this week',
      time: '1 day ago',
      read: true
    }
  ];

  const finalNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'alert':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const dismissNotification = (id) => {
    setDismissed([...dismissed, id]);
  };

  const unreadCount = finalNotifications.filter(n => !n.read && !dismissed.includes(n.id)).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FaBell className="text-indigo-600" />
            Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            Mark all as read
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {finalNotifications
          .filter(n => !dismissed.includes(n.id))
          .map((notification) => (
          <div
            key={notification.id}
            className={`p-4 hover:bg-gray-50 transition-colors ${getBgColor(notification.type)} ${
              !notification.read ? 'border-l-4 border-l-indigo-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          View all notifications →
        </button>
      </div>
    </div>
  );
};

export default InstructorNotifications;
