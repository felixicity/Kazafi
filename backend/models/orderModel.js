import mongoose from "mongoose";

const OrderItemsSchema = new mongoose.Schema({
      productId: String,
      product: Object,
      quantity: Number,
      isReviewed: { type: Boolean, default: false },
});

const OrderSchema = new mongoose.Schema(
      {
            customer: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            items: [OrderItemsSchema],
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
            isDelivered: {
                  type: Boolean,
                  default: false,
            },
            deliveredAt: {
                  type: Date,
            },
            shippingMethod: { type: String, enum: ["delivery", "pickup"], default: "pickup" },
            shippingAddress: { type: String },
            shippingFee: { type: Number, default: 0 },
      },
      { timestamps: true }, // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
