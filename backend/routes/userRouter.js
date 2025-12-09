import express from "express";
import { body } from "express-validator";
import {
      registerUser,
      loginUser,
      getUserProfile,
      updateUserProfile,
      logoutUser,
      getAllUsers,
      verifyUser,
} from "../controllers/userController.js";
import { protectMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post(
      "/register",
      [
            body("email").isEmail().withMessage("Invalid email address"),
            body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
      ],
      registerUser
);
router.get("/verify", verifyUser);

// Login route
router.post(
      "/login",
      [
            body("email").isEmail().withMessage("Invalid email address"),
            body("password").notEmpty().withMessage("Password is required"),
      ],
      loginUser
);

// Get user profile route (Requires authentication)
router.get("/profile", protectMiddleware, getUserProfile);

router.get("/", protectMiddleware, adminMiddleware, getAllUsers);

// Update user profile route (Requires authentication)
router.put("/profile", protectMiddleware, updateUserProfile);

// Logout route (clear JWT cookie)
router.post("/logout", logoutUser);

export default router;
