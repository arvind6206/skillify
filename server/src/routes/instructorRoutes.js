import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import allowRoles from "../middlewares/roleMiddleware.js"

const router = express.Router();
router.get(
  "/dashboard",
  authMiddleware,
  allowRoles("instructor"),
  (req, res) => {
    res.json({
      message: "Welcome Instructor",
      user: req.user,
    });
  }
);

export default router;