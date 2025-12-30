import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
      {
            customer: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            items: [Object],
            totalQuantity: {
                  type: Number,
                  required: true,
                  min: 1,
            },
            totalAmount: {
                  type: Number,
                  required: true,
                  min: 1,
            },
            paymentMethod: {
                  type: String,
            },
            paymentStatus: {
                  type: String,
                  enum: ["pending", "paid", "failed"],
                  default: "pending",
            },
            status: {
                  type: String,
                  enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
                  default: "pending",
            },
            isPaid: {
                  type: Boolean,
                  default: false,
            },
            paidAt: {
                  type: Date,
            },
            isDelivered: {
                  type: Boolean,
                  default: false,
            },
            deliveredAt: {
                  type: Date,
            },
            collectionPoint: { type: String },
      },
      { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
