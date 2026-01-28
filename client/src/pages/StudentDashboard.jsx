import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublishedCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import ProgressBar from "../components/ProgressBar";
import SearchBar from "../components/SearchBar";
import StarRating from "../components/StarRating";
import StudyStreak from "../components/StudyStreak";
import DifficultyBadge from "../components/DifficultyBadge";
import QuickStats from "../components/QuickStats";
import { 
  FaSearch, 
  FaBook, 
  FaTrophy, 
  FaFire, 
  FaHeart, 
  FaClock,
  FaStar,
  FaUserGraduate,
  FaChartLine,
  FaCertificate,
  FaPlayCircle,
  FaFilter
} from 'react-icons/fa';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [activeTab, setActiveTab] = useState("discover");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  // Mock user data (in real app, this would come from auth context)
  const userData = {
    name: "Student",
    enrolledCount: 3,
    completedCount: 1,
    totalHours: 12,
    streak: 5,
    points: 250,
    level: "Beginner"
  };

  // Mock achievements
  const achievements = [
    { id: 1, name: "First Course", icon: <FaBook />, earned: true },
    { id: 2, name: "Week Streak", icon: <FaFire />, earned: true },
    { id: 3, name: "Quick Learner", icon: <FaChartLine />, earned: false },
    { id: 4, name: "Certified", icon: <FaCertificate />, earned: false }
  ];

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getPublishedCourses();
        
        // If no courses from API, use mock data for demonstration
        let coursesData = data;
        if (!data || data.length === 0) {
          coursesData = [
            {
              _id: "1",
              title: "Complete Web Development Bootcamp",
              description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course",
              category: "Web Development",
              level: "beginner",
              instructor: { name: "John Doe" },
              price: 89.99,
              thumbnail: null
            },
            {
              _id: "2", 
              title: "React - The Complete Guide",
              description: "Master React 18 with Redux, Hooks, and Next.js",
              category: "Web Development",
              level: "intermediate",
              instructor: { name: "Jane Smith" },
              price: 79.99,
              thumbnail: null
            },
            {
              _id: "3",
              title: "Python for Data Science",
              description: "Learn Python programming for data analysis and machine learning",
              category: "Data Science",
              level: "beginner",
              instructor: { name: "Mike Johnson" },
              price: 99.99,
              thumbnail: null
            },
            {
              _id: "4",
              title: "Advanced JavaScript Concepts",
              description: "Deep dive into JavaScript advanced concepts and patterns",
              category: "Programming",
              level: "advanced",
              instructor: { name: "Sarah Wilson" },
              price: 69.99,
              thumbnail: null
            }
          ];
        }
        
        // Add mock rating data to courses
        const coursesWithRatings = coursesData.map((course, index) => ({
          ...course,
          rating: [4.5, 3.8, 4.2, 4.9, 3.5, 4.7, 4.1, 3.9, 4.6, 4.3][index] || 4.0
        }));
        
        setCourses(coursesWithRatings);
        setFilteredCourses(coursesWithRatings);
        
        // Mock enrolled courses (in real app, fetch from API)
        setEnrolledCourses(coursesWithRatings.slice(0, 3));
        
        // Mock wishlist (in real app, fetch from API)
        setWishlist(coursesWithRatings.slice(2, 4).map(c => c._id));
      } catch (err) {
        console.error(err);
        // Add fallback mock data on error
        const fallbackData = [
          {
            _id: "1",
            title: "Complete Web Development Bootcamp",
            description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
            category: "Web Development",
            level: "Beginner",
            instructor: { name: "John Doe" },
            price: 89.99,
            rating: 4.5,
            thumbnail: null
          }
        ];
        setCourses(fallbackData);
        setFilteredCourses(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Filter courses based on all criteria
  useEffect(() => {
    let filtered = courses;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter(
        (course) => course.level === selectedLevel
      );
    }

    // Filter by price
    if (selectedPrice !== "all") {
      filtered = filtered.filter((course) => {
        if (selectedPrice === "free") return !course.price || course.price === 0;
        if (selectedPrice === "paid") return course.price && course.price > 0;
        return true;
      });
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, selectedLevel, selectedPrice, courses]);

  // Get unique categories and levels
  const categories = ["all", ...new Set(courses.map((c) => c.category).filter(Boolean))];
  const levels = ["all", "Beginner", "Intermediate", "Advanced"];

  // Get popular courses (mock - based on enrollment)
  const popularCourses = courses.slice(0, 6);

  // Get recommended courses (mock - based on user preferences)
  const recommendedCourses = courses.slice(3, 9);

  const toggleWishlist = (courseId) => {
    setWishlist(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  return (
    <div className="min-h-screen bg-white transition-colors duration-200">
      <div className="w-full">
        {/* Welcome Header */}
        <div className="mb-8 px-4">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {userData.name}! 👋
                </h1>
                <p className="text-indigo-100">
                  Continue your learning journey and unlock new skills
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.streak}</div>
                  <div className="text-sm text-indigo-100 flex items-center gap-1">
                    <FaFire /> Day Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{userData.points}</div>
                  <div className="text-sm text-indigo-100">Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Study Streak */}
          <div className="mb-6">
            <StudyStreak streak={userData.streak} lastStudyDate={new Date()} />
          </div>

          {/* Quick Stats */}
          <div className="mb-8">
            <QuickStats 
              stats={{
                todayMinutes: 45,
                weekMinutes: 320,
                completedCourses: userData.completedCount,
                currentGoal: 5
              }}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Enrolled Courses</p>
                  <p className="text-xl font-bold text-gray-900">{userData.enrolledCount}</p>
                </div>
                <FaBook className="text-2xl text-indigo-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-xl font-bold text-gray-900">{userData.completedCount}</p>
                </div>
                <FaTrophy className="text-2xl text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Learning Hours</p>
                  <p className="text-xl font-bold text-gray-900">{userData.totalHours}</p>
                </div>
                <FaClock className="text-2xl text-purple-600" />
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600">Achievements</p>
                  <p className="text-xl font-bold text-gray-900">
                    {achievements.filter(a => a.earned).length}
                  </p>
                </div>
                <FaCertificate className="text-2xl text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {["discover", "my-courses", "wishlist", "achievements"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.split("-").map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(" ")}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-4">

        {/* Discover Tab Content */}
        {activeTab === "discover" && (
          <>
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    placeholder="Search courses, instructors..."
                    showClearButton={true}
                  />
                </div>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  <FaFilter />
                  Filters
                </button>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level
                      </label>
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {levels.map((level) => (
                          <option key={level} value={level}>
                            {level === "all" ? "All Levels" : level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="all">All Prices</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            {recommendedCourses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Recommended for You
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <div key={course._id} className="relative">
                      <CourseCard course={course} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(course._id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                      >
                        <FaHeart className={`text-lg ${wishlist.includes(course._id) ? 'text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All Courses */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">All Courses</h2>
              
              {/* Results Count */}
              {!loading && (
                <div className="mb-4 text-sm text-gray-600">
                  Showing {filteredCourses.length} of {courses.length} courses
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-64 rounded-xl bg-white shadow animate-pulse"
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {!loading && courses.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    No courses available
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Please check back later. New courses are coming soon!
                  </p>
                </div>
              )}

              {/* Courses Grid */}
              {!loading && filteredCourses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCourses.map((course) => (
                    <div key={course._id} className="relative">
                      <CourseCard course={course} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(course._id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                      >
                        <FaHeart className={`text-lg ${wishlist.includes(course._id) ? 'text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {!loading && filteredCourses.length === 0 && courses.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* My Courses Tab */}
        {activeTab === "my-courses" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Enrolled Courses</h2>
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course, index) => (
                  <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <div className="mb-3">
                        <ProgressBar 
                          progress={[65, 30, 85, 45][index] || 0} 
                          showPercentage={true}
                          showTime={true}
                          timeSpent={[120, 45, 200, 80][index] || 0}
                          totalTime={[180, 150, 240, 120][index] || 0}
                          size="small"
                        />
                      </div>
                      <button
                        onClick={() => navigate(`/course/${course._id}`)}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <FaPlayCircle />
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <FaBook className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No enrolled courses yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Start your learning journey by enrolling in a course
                </p>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((courseId) => {
                  const course = courses.find(c => c._id === courseId);
                  return course ? (
                    <div key={course._id} className="relative">
                      <CourseCard course={course} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(course._id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
                      >
                        <FaHeart className="text-lg text-red-500" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <FaHeart className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Save courses you're interested in for later
                </p>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Discover Courses
                </button>
              </div>
            )}
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 text-center transition-all ${
                    achievement.earned 
                      ? 'border-yellow-400 bg-yellow-50' 
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  <div className={`text-3xl mb-3 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className={`font-semibold mb-1 ${achievement.earned ? 'text-gray-900' : 'text-gray-600'}`}>
                    {achievement.name}
                  </h3>
                  {achievement.earned && (
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full">
                      Earned
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Learning Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Level</span>
                    <span className="font-semibold text-gray-900">{userData.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Next Milestone</span>
                    <span className="font-semibold text-gray-900">500 Points</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '50%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard;