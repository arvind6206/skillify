import { useEffect, useState } from "react";
import { getMyCourses } from "../services/courseService";
import CreateCourse from "../components/CreateCourse";
import InstructorCourseCard from "../components/InstructorCourseCard";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ===== Header Section ===== */}
        {/* ===== Header Section ===== */}
        <div
          className="
    flex flex-col gap-8
    lg:flex-row lg:items-start lg:justify-between
  "
        >
          {/* Left: Title */}
          <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Instructor Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your courses, control publishing status, and track your
              teaching content in one place.
            </p>
          </div>

          {/* Right: Create Course */}
          <div className="w-full lg:w-auto">
            <CreateCourse onCreated={loadCourses} />
          </div>
        </div>


        {/* ===== Section Divider ===== */}
        <div className="border-t border-gray-200" />

        {/* ===== Loading State ===== */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-xl bg-white border border-gray-200
                           shadow-sm animate-pulse"
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
        )}

        {/* ===== Empty State ===== */}
        {!loading && courses.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12">
            <div className="max-w-lg mx-auto text-center space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                You haven’t created any courses yet
              </h3>
              <p className="text-gray-600">
                Start building your first course and share your expertise with
                learners across the platform.
              </p>
            </div>
          </div>
        )}

        {/* ===== Courses Section ===== */}
        {!loading && courses.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Your Courses
              </h2>
              <span className="text-sm text-gray-500">
                {courses.length} total
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <InstructorCourseCard
                  key={course._id}
                  course={course}
                  onUpdated={loadCourses}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;