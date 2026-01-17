import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import allowRoles from "../middlewares/roleMiddleware.js";
import {
  getAllUsers,
  getPendingInstructors,
  approveInstructor,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  allowRoles("admin"),
  getAllUsers
);

router.get(
  "/pending-instructors",
  authMiddleware,
  allowRoles("admin"),
  getPendingInstructors
);

router.put(
  "/approve-instructor/:id",
  authMiddleware,
  allowRoles("admin"),
  approveInstructor
);

export default router;