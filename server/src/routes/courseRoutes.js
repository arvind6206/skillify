import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
    createCourse,
    getPublishedCourses,
    updateCourse,
    deleteCourse,
    getMyCourses,
    getCourseById
} from "../controllers/courseController.js";
import approvedInstructor from "../middlewares/approvedInstructor.js";

const router = express.Router();

router.get("/", getPublishedCourses); //for public
router.get("/mine", authMiddleWare, allowRoles("instructor"), getMyCourses); // only instructor can visible all courses even published or not
router.get("/:id", getCourseById); // get single course by id
router.post("/", authMiddleWare, allowRoles("instructor"),approvedInstructor, createCourse);
router.put("/:id", authMiddleWare, allowRoles("instructor"),approvedInstructor, updateCourse);
router.delete("/:id", authMiddleWare, allowRoles("instructor"), deleteCourse);


export default router;