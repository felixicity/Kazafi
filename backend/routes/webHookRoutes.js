import express from "express";
import { handlePaystackWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// router.use((req, res, next) => {
//       console.log("Incoming Webhook Request:");
//       console.log("Method:", req.method);
//       console.log("URL:", req.originalUrl);
//       console.log("Headers:", req.headers);
//       console.log("Body:", req.body);
//       next(); // Pass control to the next middleware
// });

router.post("/paystack", handlePaystackWebhook);

export default router;
