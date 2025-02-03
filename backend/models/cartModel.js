import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
      {
            user: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            items: [
                  {
                        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                        quantity: { type: Number, default: 1 },
                        size: { type: String },
                        color: { type: String },
                  },
            ],
      },
      { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
