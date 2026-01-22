import { useNavigate } from "react-router-dom";
import { FaUser, FaBook, FaStar } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
         onClick={handleView}>
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {course.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-semibold rounded-full">
              {course.category}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
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

          {course.rating && (
            <div className="flex items-center gap-1 text-sm">
              <FaStar className="text-yellow-400" />
              <span className="font-medium text-gray-700">
                {course.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleView();
          }}
          className="mt-4 w-full text-sm font-semibold text-white bg-indigo-600 px-4 py-2.5
            rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;