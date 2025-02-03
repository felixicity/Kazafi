import express from "express";
import { protectMiddleware } from "../middleware/authMiddleware.js";
import { addReview, updateReview, deleteReview, getProductReviews } from "../controllers/reviewController.js";

const router = express.Router();

// Add a review for a product
router.post("/:productid/add", protectMiddleware, addReview);

// Update a review for a product
router.put("/:reviewid/update", protectMiddleware, updateReview);

// Delete a review for a product
router.delete("/:reviewid/delete", protectMiddleware, deleteReview);

// Get all reviews for a product
router.get("/:productid", getProductReviews);

export default router;
