import { updateCourse } from "../services/courseService";

const InstructorCourseCard = ({ course, onUpdated }) => {
  const togglePublish = async () => {
    await updateCourse(course._id, {
      isPublished: !course.isPublished,
    });
    onUpdated();
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200
                 shadow-sm hover:shadow-lg transition-all duration-200
                 p-5 space-y-4"
    >
      {/* Course Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {course.description}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Status</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              course.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {course.isPublished ? "Published" : "Draft"}
        </span>
      </div>

      {/* Action */}
      <button
        onClick={togglePublish}
        className={`w-full py-2 rounded-lg text-sm font-semibold
          transition-all duration-200 active:scale-[0.98]
          ${
            course.isPublished
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
      >
        {course.isPublished ? "Unpublish Course" : "Publish Course"}
      </button>
    </div>
  );
};

export default InstructorCourseCard;