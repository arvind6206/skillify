import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
    enrollInCourse,
    getMyEnrollments,
    checkEnrollment,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/:courseId", authMiddleware, allowRoles("student"), enrollInCourse);
router.get("/my-courses", authMiddleware, allowRoles("student"), getMyEnrollments);
router.get("/check/:courseId", authMiddleware, allowRoles("student"), checkEnrollment);

export default router;