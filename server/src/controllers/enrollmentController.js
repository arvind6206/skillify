import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollInCourse = async (req, res)=>{
    const {courseId} = req.params;

    const course = await Course.findById(courseId);

    if(!course || !course.isPublished){
        return res.status(404).json({message:"Course not found"});
    }

    const enrollment = await Enrollment.create({
        student: req.user._id,
        course:courseId,
    });

    res.status(201).json({message:"Enrolled successfully", enrollment});
}

export const getMyEnrollments = async (req, res)=>{
    const enrollments = await Enrollment.find({
        student: req.user._id,
    }).populate("course");

    res.json(enrollments);
};