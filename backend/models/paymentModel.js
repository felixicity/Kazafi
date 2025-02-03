import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            order: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Order",
                  required: true,
            },
            reference: {
                  type: String,
                  required: true,
                  unique: true,
            },
            amount: { type: Number, required: true },
            currency: { type: String, default: "NGN" },
            status: {
                  type: String,
                  enum: ["pending", "successful", "failed"],
                  default: "pending",
            },
            paymentMethod: { type: String, default: "card" },
            provider: {
                  type: String,
                  enum: ["Paystack", "Flutterwave", "Stripe"],
                  required: true,
            },
      },
      { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
