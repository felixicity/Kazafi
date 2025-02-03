import express from "express";
import {
      addProductToWishlist,
      removeProductFromWishlist,
      getWishlist,
      clearWishlist,
} from "../controllers/wishlistController.js";
import { protectMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a product to the wishlist
router.post("/add/:productid", protectMiddleware, addProductToWishlist);

// Remove a product from the wishlist
router.delete("/remove/:productid", protectMiddleware, removeProductFromWishlist);

// Get all products in the user's wishlist
router.get("/", protectMiddleware, getWishlist);

// Clear all products from the wishlist
router.delete("/clear", protectMiddleware, clearWishlist);

export default router;
