import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { enrollInCourse, checkEnrollment } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaBook, FaClock, FaStar, FaCheckCircle } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        
        // Check if student is enrolled
        if (user?.role === "student") {
          try {
            const enrollmentStatus = await checkEnrollment(id);
            setIsEnrolled(enrollmentStatus.enrolled);
          } catch (err) {
            // Not enrolled or error checking
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (user?.role !== "student") {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    setError("");

    try {
      await enrollInCourse(id);
      setIsEnrolled(true);
      // Show success message
      alert("Successfully enrolled in course!");
    } catch (err) {
      setError(err.message || "Failed to enroll");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
        >
          ← Back to Courses
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaUser className="text-indigo-600" />
                  <span className="font-medium">
                    {course.instructor?.name || "Instructor"}
                  </span>
                </div>
                {course.category && (
                  <div className="flex items-center gap-2">
                    <FaBook className="text-indigo-600" />
                    <span>{course.category}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  About This Course
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>

              {/* What You'll Learn */}
              {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    What You'll Learn
                  </h2>
                  <ul className="space-y-2">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {user?.role === "student" ? (
                <>
                  {isEnrolled ? (
                    <div className="text-center">
                      <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        You're Enrolled!
                      </p>
                      <p className="text-gray-600 mb-4">
                        Start learning now
                      </p>
                      <button
                        onClick={() => navigate("/my-courses")}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                      >
                        Go to My Courses
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {enrolling ? "Enrolling..." : "Enroll Now"}
                      </button>
                    </div>
                  )}
                </>
              ) : user?.role === "instructor" ? (
                <div className="text-center text-gray-600">
                  <p>Instructor view</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Please log in to enroll
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                  >
                    Login
                  </button>
                </div>
              )}

              {/* Course Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Instructor</span>
                  <span className="font-medium">
                    {course.instructor?.name || "N/A"}
                  </span>
                </div>
                {course.duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                )}
                {course.level && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
