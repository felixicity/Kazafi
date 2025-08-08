import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            items: [
                  {
                        product: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: "Product",
                              required: true,
                        },
                  },
            ],
            totalQuantity: {
                  type: Number,
                  required: true,
                  min: 1,
            },
            totalAmount: {
                  type: Number,
                  required: true,
            },
            shippingAddress: {
                  street: { type: String, required: true },
                  busstop: { type: String },
                  city: { type: String, required: true },
                  state: { type: String, required: true },
                  country: { type: String, default: "Nigeria" },
                  phone: { type: String, required: true },
                  postalcode: { type: String },
            },
            paymentMethod: {
                  type: String,
                  enum: ["Paystack", "Flutterwave", "Qrcode", "Cash on Delivery"],
                  required: true,
            },
            paymentStatus: {
                  type: String,
                  enum: ["Pending", "Paid", "Failed"],
                  default: "Pending",
            },
            orderStatus: {
                  type: String,
                  enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
                  default: "Processing",
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
      },
      { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
