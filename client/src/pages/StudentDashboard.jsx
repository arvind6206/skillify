import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublishedCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import { FaSearch, FaBook } from "react-icons/fa";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getPublishedCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Filter courses based on search and category
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

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  // Get unique categories
  const categories = ["all", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Discover Courses 📚
              </h1>
              <p className="text-gray-600 mt-1">
                Learn new skills and advance your career
              </p>
            </div>
            <button
              onClick={() => navigate("/my-courses")}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              <FaBook />
              My Courses
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Results Count */}
        {!loading && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </div>
        )}

        {/* Courses Grid */}
        {!loading && filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
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
    </div>
  );
};

export default StudentDashboard;