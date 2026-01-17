import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
    enrollInCourse,
    getMyEnrollments,
} from "../controllers/enrollmentController.js";

const router = express.Router();

router.post("/:courseId", authMiddleware, allowRoles("student"), enrollInCourse);
router.get("/my-courses", authMiddleware, allowRoles("student"), getMyEnrollments);

export default router;