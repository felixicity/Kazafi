import express from "express";
import {
      placeOrder,
      getUserOrders,
      cancelOrder,
      getOrderById,
      getAllOrders,
      updateOrderStatus,
      printOrderReceipt,
} from "../controllers/orderController.js";
import { protectMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protectMiddleware, placeOrder); // Place an order
router.get("/", protectMiddleware, getUserOrders); // Get logged-in user's orders
// router.get("/recent", protectMiddleware, getRecentOrders); // Get logged-in user's orderss
router.get("/:orderId", protectMiddleware, getOrderById); // Get order by ID
router.delete("/:orderId", protectMiddleware, cancelOrder);
router.get("/:orderId/receipt", protectMiddleware, printOrderReceipt);
// Admin routes
router.get("/admin/orders", protectMiddleware, adminMiddleware, getAllOrders); // Get all orders (admin only)
router.patch("/:orderId/status", protectMiddleware, adminMiddleware, updateOrderStatus); // Update order status (admin only)

export default router;
