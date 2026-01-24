import express from "express";
import { protectMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, updateCartItem, removeFromCart, getCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();


// Add item to the cart
router.post("/add", protectMiddleware, addToCart);

// Update quantity of an item in the cart
router.put("/update/:itemId", protectMiddleware, updateCartItem);

// Remove item from the cart
router.delete("/remove/:itemId", protectMiddleware, removeFromCart);

// Get all items in the cart
router.get("/", protectMiddleware, getCart);

// Clear the entire cart
router.delete("/clear", protectMiddleware, clearCart);

export default router;
