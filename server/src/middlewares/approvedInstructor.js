const approvedInstructor = (req, res, next)=>{
    if(req.user.role === "instructor" && !req.user.isApproved){
        return res.status(403).json({message:"Instructor approval pending"})
    }
    next();
};

export default approvedInstructor;