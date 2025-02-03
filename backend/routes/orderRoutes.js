import express from "express";
import {
      placeOrder,
      getUserOrders,
      getOrderById,
      getAllOrders,
      updateOrderStatus,
} from "../controllers/orderController.js";
import { protectMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protectMiddleware, placeOrder); // Place an order
router.get("/", protectMiddleware, getUserOrders); // Get logged-in user's orders
router.get("/:orderid", protectMiddleware, getOrderById); // Get order by ID

// Admin routes
router.get("/", protectMiddleware, adminMiddleware, getAllOrders); // Get all orders (admin only)
router.put("/:orderid/status", protectMiddleware, adminMiddleware, updateOrderStatus); // Update order status (admin only)

export default router;
