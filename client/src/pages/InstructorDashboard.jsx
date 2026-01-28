// InstructorDashboard.jsx
import { useEffect, useState } from "react";
import { getMyCourses } from "../services/courseService";
import CreateCourse from "../components/CreateCourse";
import InstructorCourseCard from "../components/InstructorCourseCard";
import InstructorQuickStats from "../components/InstructorQuickStats";
import CoursePerformance from "../components/CoursePerformance";
import StudentEngagement from "../components/StudentEngagement";
import { FaChalkboardTeacher, FaUsers, FaStar, FaDollarSign, FaChartLine, FaBook, FaVideo, FaFilePdf, FaTasks } from 'react-icons/fa';

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { title: 'Total Students', value: 0, icon: <FaUsers className="text-blue-500" /> },
    { title: 'Total Earnings', value: '$0', icon: <FaDollarSign className="text-green-500" /> },
    { title: 'Average Rating', value: '0.0', icon: <FaStar className="text-yellow-500" /> },
    { title: 'Published Courses', value: 0, icon: <FaBook className="text-purple-500" /> }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <FaChartLine className="mr-2" /> },
    { id: 'courses', name: 'My Courses', icon: <FaBook className="mr-2" /> },
    { id: 'students', name: 'Students', icon: <FaUsers className="mr-2" /> },
    { id: 'analytics', name: 'Analytics', icon: <FaChartLine className="mr-2" /> },
    { id: 'resources', name: 'Resources', icon: <FaFilePdf className="mr-2" /> },
  ];

  const loadCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
      
      // Calculate stats
      const publishedCourses = data.filter(course => course.published).length;
      const totalStudents = data.reduce((sum, course) => sum + (course.students || 0), 0);
      const totalEarnings = data.reduce((sum, course) => sum + ((course.price || 0) * (course.students || 0)), 0);
      const avgRating = data.length > 0
        ? (data.reduce((sum, course) => sum + (course.rating || 0), 0) / data.length).toFixed(1)
        : 0;

      setStats([
        { ...stats[0], value: totalStudents },
        { ...stats[1], value: `$${totalEarnings.toLocaleString()}` },
        { ...stats[2], value: avgRating },
        { ...stats[3], value: publishedCourses }
      ]);
    } catch (err) {
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
              <p className="mt-2 text-indigo-100">
                Welcome back! Here's what's happening with your courses today.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <CreateCourse onCreated={loadCourses} />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-white bg-opacity-20">
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-indigo-200">{stat.title}</p>
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Enhanced Quick Stats */}
              <InstructorQuickStats stats={stats} />

              {/* Course Performance */}
              <CoursePerformance courses={courses} />

              {/* Student Engagement */}
              <StudentEngagement />
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              {/* Course Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative">
                  <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    defaultValue="all"
                  >
                    <option value="all">All Courses</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                  <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Search
                  </button>
                </div>
              </div>

              {/* Update the courses mapping section */}
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 rounded-xl bg-white border border-gray-200 shadow-sm animate-pulse"
                    >
                      <div className="h-32 bg-gray-200 rounded-t-xl" />
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : courses.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    No courses found
                  </h3>
                  <p className="text-gray-600">
                    Get started by creating your first course to share your knowledge with students.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <InstructorCourseCard
                      key={course._id}
                      course={course}
                      onUpdated={loadCourses}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Your Students</h3>
              </div>
              <div className="px-6 py-4 text-center text-gray-500">
                Student management features coming soon
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Enrollment Overview</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Enrollment chart will be displayed here</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                    <p className="text-gray-500">Revenue chart will be displayed here</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Course Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.slice(0, 3).map((course) => (
                        <tr key={course._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center">
                                <FaBook className="h-5 w-5 text-indigo-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                <div className="text-sm text-gray-500">{course.students || 0} students</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{course.students || 0}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaStar className="h-4 w-4 text-yellow-400" />
                              <span className="ml-1 text-sm text-gray-900">
                                {course.rating ? course.rating.toFixed(1) : 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${((course.students || 0) * (course.price || 0)).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Course Resources</h3>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Upload Resource
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-500">No resources uploaded yet. Click the button above to add some.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;