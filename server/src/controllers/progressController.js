import Lesson from "../models/Lesson.js";
import LessonProgress from "../models/LessonProgress.js";
import Enrollment from "../models/Enrollment.js";

export const completeLesson = async (req, res) => {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
    }

    const enrolled = await Enrollment.findOne({
        student: req.user._id,
        course: lesson.course,
    });

    if (!enrolled) {
        return res.status(403).json({ message: "Not enrolled in course" });
    }

    const progress = await LessonProgress.create({
        student: req.user._id,
        lesson: lessonId,
    });

    res.status(201).json({ message: "Lesson completed", progress });
};


export const getCourseProgress = async (req, res) => {
  const { courseId } = req.params;

  const enrolled = await Enrollment.findOne({
    student: req.user._id,
    course: courseId,
  });

  if (!enrolled) {
    return res.status(403).json({ message: "Not enrolled in course" });
  }

  const totalLessons = await Lesson.countDocuments({ course: courseId });
  const completedLessons = await LessonProgress.countDocuments({
    student: req.user._id,
    lesson: { $in: await Lesson.find({ course: courseId }).distinct("_id") },
  });

  const progress =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  res.json({
    courseId,
    completedLessons,
    totalLessons,
    progress,
  });
};