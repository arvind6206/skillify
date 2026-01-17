const CourseCard = ({ course }) => {
  return (
    <div className="bg-indigo-100 border border-indigo-300 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Thumbnail */}
      {/* <div className="h-40 bg-gradient-to-br from-indigo-500 to-purple-500" /> */}

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600">
            {course.instructor?.name || "Instructor"}
          </span>

          <button
            className="text-sm font-semibold text-white bg-indigo-600 px-4 py-1.5
              rounded-lg hover:bg-indigo-700 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;