import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
                  unique: true, // one cart per user
            },
            items: [
                  {
                        product: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: "Product",
                              required: true,
                        },
                        variation: {
                              type: Object,
                              required: true,
                        },
                        quantity: {
                              type: Number,
                              required: true,
                              default: 1,
                        },
                        // size: { type: String },
                        // color: { type: String },
                  },
            ],
            totalAmount: {
                  type: Number,
                  default: 0,
                  required: true,
            },
            totalQuantity: {
                  type: Number,
                  default: 0,
                  required: true,
            },
      },
      { timestamps: true }
);

CartSchema.path("updatedAt").index({ expires: 2592000 });

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
