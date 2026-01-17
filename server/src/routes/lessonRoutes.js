import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {createLesson} from "../controllers/lessonController.js";
import approvedInstructor from "../middlewares/approvedInstructor.js";

const router = express.Router();

router.post("/", authMiddleware, allowRoles("instructor"),approvedInstructor, createLesson);

export default router;