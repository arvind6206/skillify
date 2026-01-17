import Course from "../models/Course.js"

export const createCourse = async (req, res)=>{
    const {title, description} = req.body;

    if(!title || !description){
        return res.status(400).json({message:"All fields required"});
    }

    const course = await Course.create({
        title,
        description,
        instructor: req.user._id,
    });

    res.status(201).json(course);
}


export const getPublishedCourses = async(req, res)=>{
    const course = await Course.find({isPublished:true}).populate(
        "instructor",
        "name"
    );
    res.json(course);
}

export const updateCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({message:"Course not found"});
    }

    if(course.instructor.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not course owner"});
    }

    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.isPublished = req.body.isPublished !== undefined ? req.body.isPublished : course.isPublished;

    await course.save();
    res.json(course)
};

export const deleteCourse = async (req, res)=>{
    const course = await Course.findById(req.params.id);

    if(!course){
        return res.status(404).json({message:"Course not found"});
    }

    if(course.instructor.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not course owner"})
    }

    await course.deleteOne();
    res.json({message:"Course deleted"});
}


export const getMyCourses = async(req, res)=>{
    const courses = await Course.find({
        instructor:req.user._id,
    });

    res.json(courses);
};