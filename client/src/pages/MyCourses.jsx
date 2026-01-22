import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEnrollments } from "../services/enrollmentService";
import { FaBook, FaUser, FaArrowRight, FaCheckCircle } from "react-icons/fa";

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const data = await getMyEnrollments();
        setEnrollments(data);
      } catch (err) {
        console.error("Error loading enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Courses 📚
          </h1>
          <p className="text-gray-600 mt-1">
            Continue your learning journey
          </p>
        </div>

        {/* Empty State */}
        {!loading && enrollments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No courses enrolled yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start learning by enrolling in courses from the dashboard
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Browse Courses
            </button>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && enrollments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;
              return (
                <div
                  key={enrollment._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer group"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  {/* Thumbnail */}
                  <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                        <FaCheckCircle className="text-xs" />
                        Enrolled
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaUser className="text-indigo-600" />
                        <span className="font-medium">
                          {course.instructor?.name || "Instructor"}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course._id}`);
                      }}
                      className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2.5 rounded-lg hover:bg-indigo-100 transition"
                    >
                      Continue Learning
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
