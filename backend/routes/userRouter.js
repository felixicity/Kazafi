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
      updateUserAddresses,
} from "../controllers/userController.js";
import { protectMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", registerUser);
router.get("/verify", verifyUser);

// Login route
router.post("/login", loginUser);

// Get user profile route (Requires authentication)
router.get("/profile", protectMiddleware, getUserProfile);

// Update user profile route (Requires authentication)
router.patch("/profile", protectMiddleware, updateUserProfile);

//Update user adresses route (Requires authentication)
router.patch("/addresses", protectMiddleware, updateUserAddresses);

// Logout route (clear JWT cookie)
router.post("/logout", logoutUser);

//admin route
router.get("/", protectMiddleware, adminMiddleware, getAllUsers);

export default router;
