import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            orderItems: [
                  {
                        product: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: "Product",
                              required: true,
                        },
                        quantity: {
                              type: Number,
                              required: true,
                              min: 1,
                        },
                        price: {
                              type: Number,
                              required: true,
                        },
                        size: {
                              type: String,
                        },
                        color: {
                              type: String,
                        },
                  },
            ],
            shippingAddress: {
                  street: { type: String, required: true },
                  city: { type: String, required: true },
                  state: { type: String, required: true },
                  country: { type: String, default: "Nigeria" },
                  zipCode: { type: String },
            },
            totalPrice: {
                  type: Number,
                  required: true,
            },
            paymentMethod: {
                  type: String,
                  enum: ["Paystack", "Flutterwave", "Stripe", "Cash on Delivery"],
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
