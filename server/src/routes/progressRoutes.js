import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
  completeLesson,
  getCourseProgress,
} from "../controllers/progressController.js";

const router = express.Router();

router.post(
  "/complete/:lessonId",
  authMiddleware,
  allowRoles("student"),
  completeLesson
);

router.get(
  "/:courseId",
  authMiddleware,
  allowRoles("student"),
  getCourseProgress
);

export default router;