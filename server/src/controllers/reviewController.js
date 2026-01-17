import Review from "../models/Review.js";
import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";


export const createReview = async(req, res)=>{
    const{rating, comment} = req.body;
    const{courseId} = req.params;

    if(!rating || rating<1 || rating>5){
        return res.status(400).json({message:"Rating must be between 1 to 5"});
    }

    const course = await Course.findById(courseId);
    if(!course) return res.status(404).json({message:"Course not found"});

    if(course.instructor.toString()===req.user._id.toString()){
        return res.status(403).json({message:"Cannot review your own course"});
    };

    const enrolled = await Enrollment.findOne({
        student:req.user._id,
        course:courseId,
    });

    if(!enrolled){
        return res.status(403).json({message:"Enroll to review course"});
    }

    const review = await Review.create({
        student:req.user._id,
        course:courseId,
        rating,
        comment
    });
    
    res.status(201).json(review);
};

export const getCourseReviews = async (req, res) => {
  const reviews = await Review.find({ course: req.params.courseId })
    .populate("student", "name")
    .sort({ createdAt: -1 });

  res.json(reviews);
};