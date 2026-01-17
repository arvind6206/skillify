import Lesson from "../models/Lesson.js";
import Course from "../models/Course.js";

export const createLesson = async (req, res) => {
    const { courseId, title, content, order } = req.body;

    if (!courseId || !title || !content || order === undefined) {
        return res.status(400).json({message:"All field required"})
    }

    const course = await Course.findById(courseId);

    if(!courseId){
        return res.status(404).json({message:"Course not found"});
    }

    if(course.instructor.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not course owner"});
    }

    const lesson = await Lesson.create({
        course:courseId,
        title,
        content,
        order
    });

    res.status(201).json(lesson);
};
