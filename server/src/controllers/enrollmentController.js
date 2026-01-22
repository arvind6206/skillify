import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollInCourse = async (req, res)=>{
    try {
        const {courseId} = req.params;

        const course = await Course.findById(courseId);

        if(!course || !course.isPublished){
            return res.status(404).json({message:"Course not found or not published"});
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user._id,
            course: courseId,
        });

        if (existingEnrollment) {
            return res.status(400).json({message:"Already enrolled in this course"});
        }

        const enrollment = await Enrollment.create({
            student: req.user._id,
            course:courseId,
        });

        res.status(201).json({message:"Enrolled successfully", enrollment});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({message:"Already enrolled in this course"});
        }
        res.status(500).json({message:"Error enrolling in course", error: error.message});
    }
}

export const getMyEnrollments = async (req, res)=>{
    const enrollments = await Enrollment.find({
        student: req.user._id,
    }).populate("course").populate("course.instructor", "name");

    res.json(enrollments);
};

export const checkEnrollment = async (req, res) => {
    try {
        const { courseId } = req.params;
        const enrollment = await Enrollment.findOne({
            student: req.user._id,
            course: courseId,
        });

        res.json({ enrolled: !!enrollment });
    } catch (error) {
        res.status(500).json({ message: "Error checking enrollment", error: error.message });
    }
};