import crypto from "crypto";
import axios from "axios";
import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";

export const handlePaystackWebhook = async (req, res) => {
      //verify the request
      const secret = process.env.PAYSTACK_SECRET_KEY;
      const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(req.body)).digest("hex");

      if (hash !== req.headers["x-paystack-signature"]) {
            // Reject the request if the signature is invalid
            return res.status(400).send("Invalid signature");
      }

      const event = req.body;
      if (event.event === "charge.success") {
            const { reference } = event.data;
            try {
                  const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                        headers: {
                              Authorization: `Bearer ${secret}`,
                        },
                  });
                  const transactionStatus = response.data.data.status;

                  const { order } = await Payment.findOne({ reference });

                  if (transactionStatus === "success") {
                        //Fulfill the order
                        const payment = await Payment.findOneAndUpdate({ reference }, { status: "successful" });
                        await Order.findOneAndUpdate({ _id: order }, { paymentStatus: "paid" });

                        if (payment) {
                              console.log(`Payment ${payment._id} paid successfully.`);
                        }
                  }

                  if (transactionStatus === "processing") {
                        //Fulfill the order
                        const payment = await Payment.findOneAndUpdate({ reference }, { status: "processing" });
                        await Order.findOneAndUpdate({ _id: order }, { paymentStatus: "processing" });

                        if (payment) {
                              console.log(`Payment ${payment._id} is processing.`);
                        }
                  } else if (transactionStatus === "pending") {
                        //Fulfill the order
                        const payment = await Payment.findOneAndUpdate({ reference }, { status: "pending" });
                        await Order.findOneAndUpdate({ _id: order }, { paymentStatus: "pending" });
                        if (payment) {
                              console.log(`Payment ${payment._id} is pending.`);
                        }
                  } else if (transactionStatus === "failed") {
                        //Fulfill the order
                        const payment = await Payment.findOneAndUpdate({ reference }, { status: "failed" });
                        await Order.findOneAndUpdate({ _id: order }, { paymentStatus: "failed" });
                        if (payment) {
                              console.log(`Payment ${payment._id} failed.`);
                        }
                  }
            } catch (error) {
                  console.error("Webhook verification failed: ", error);
                  res.status(500).json({ message: "Payment verification failed" });
            }
      }
      res.status(200).json({ message: "Webhook recieved successfully" });
};
