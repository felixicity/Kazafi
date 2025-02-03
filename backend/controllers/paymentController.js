import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Initiate payment
export const initiatePayment = async (req, res) => {
      const { orderId, provider } = req.body;
      const userId = req.userId;

      try {
            // Find the order
            const order = await Order.findById(orderId);
            if (!order) return res.status(404).json({ message: "Order not found" });

            // Generate a unique payment reference
            const reference = `KAZAFI_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

            // Create payment record
            const payment = new Payment({
                  user: userId,
                  order: orderId,
                  reference,
                  amount: order.totalAmount,
                  provider,
                  status: "pending",
            });
            await payment.save();

            let paymentUrl = "";

            if (provider === "Paystack") {
                  const response = await axios.post(
                        "https://api.paystack.co/transaction/initialize",
                        {
                              email: req.user.email,
                              amount: order.totalAmount * 100, // Paystack accepts kobo
                              reference,
                              currency: "NGN",
                        },
                        { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` } }
                  );
                  paymentUrl = response.data.data.authorization_url;
            } else if (provider === "Flutterwave") {
                  const response = await axios.post(
                        "https://api.flutterwave.com/v3/payments",
                        {
                              tx_ref: reference,
                              amount: order.totalAmount,
                              currency: "NGN",
                              redirect_url: `${process.env.FRONTEND_URL}/payment/verify`,
                              customer: { email: req.user.email },
                        },
                        { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET}` } }
                  );
                  paymentUrl = response.data.data.link;
            }

            res.status(200).json({ paymentUrl, reference });
      } catch (error) {
            res.status(500).json({ message: "Payment initialization failed", error });
      }
};

// Verify payment
export const verifyPayment = async (req, res) => {
      const { reference } = req.params;

      try {
            const payment = await Payment.findOne({ reference });
            if (!payment) return res.status(404).json({ message: "Payment not found" });

            let verificationResponse;

            if (payment.provider === "Paystack") {
                  verificationResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET}` },
                  });
            } else if (payment.provider === "Flutterwave") {
                  verificationResponse = await axios.get(
                        `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
                        { headers: { Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET}` } }
                  );
            }

            const status = verificationResponse.data.data.status;

            if (status === "success" || status === "completed") {
                  payment.status = "successful";
                  await payment.save();

                  res.status(200).json({ message: "Payment successful", payment });
            } else {
                  payment.status = "failed";
                  await payment.save();
                  res.status(400).json({ message: "Payment failed", payment });
            }
      } catch (error) {
            res.status(500).json({ message: "Payment verification failed", error });
      }
};

// Get payment details
export const getPaymentDetails = async (req, res) => {
      const { paymentId } = req.params;

      try {
            const payment = await Payment.findById(paymentId).populate("order");
            if (!payment) return res.status(404).json({ message: "Payment not found" });

            res.status(200).json(payment);
      } catch (error) {
            res.status(500).json({ message: "Failed to retrieve payment", error });
      }
};
