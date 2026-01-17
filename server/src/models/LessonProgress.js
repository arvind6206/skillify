import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
    {
        student:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        lesson:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lesson",
            required:true,
        },
        completedAt:{
            type:Date,
            default:Date.now,
        },
    },
    {timestamps:true}
);

// prevent duplicate completions
lessonProgressSchema.index({student:1, lesson:1}, {unique:true});

export default mongoose.model("LessonProgress", lessonProgressSchema);