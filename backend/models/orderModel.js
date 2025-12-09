import mongoose from "mongoose";

//  {
//             id: "#KAZ-8476364",
//             customer: "1294jjfn4fu823227e2",
//             shipping: "processing", // processing, shipped, delivered
//             date: "12/03/25",
//             items: [{ name: "table" }],
//             // shipping: 8 Romodome str, Alanta, USA
//             payment: "pending", // pending , paid, refund
//       },

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
                  required: true,
            },
            paymentStatus: {
                  type: String,
                  enum: ["pending", "paid", "failed"],
                  default: "pending",
            },

            orderStatus: {
                  type: String,
                  enum: ["processing", "shipped", "delivered", "cancelled"],
                  default: "processing",
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

// shippingAddress: {
//                   street: { type: String, required: true },
//                   city: { type: String, required: true },
//                   state: { type: String, required: true },
//                   country: { type: String, default: "Nigeria" },
//                   phone: { type: String, required: true },
//             },
