import express from "express";
import {
      initiatePayment,
      verifyPayment,
      getPaymentDetails,
      getPaymentStatus,
      getAllPayments,
} from "../controllers/paymentController.js";
import { protectMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Initialize a payment
router.post("/initiate", protectMiddleware, initiatePayment);

// Verify a payment
router.get("/verify/:reference", protectMiddleware, verifyPayment);
router.get("/admin/payments", protectMiddleware, getAllPayments);

router.get("/status/:reference", protectMiddleware, getPaymentStatus);

// Get payment details
router.get("/:paymentid", protectMiddleware, getPaymentDetails);

export default router;
