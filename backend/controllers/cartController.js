import User from "../models/userModel.js"; // Import user model
import Product from "../models/productModel.js"; // Import product model
import Cart from "../models/cartModel.js";

// Add item to the cart
export const addToCart = async (req, res) => {
      const { productId, variation, quantity } = req.body;
      //  variation is an array of product variations

      const userId = req.userId;

      try {
            // Check if user already has a cart
            let cart = await Cart.findOne({ user: userId }); // Get user ID and product ID from authentication middleware
            const item = [{ product: productId, variation, quantity }];
            // console.log("item :", item);

            if (!cart) {
                  // Create a new cart if none exists
                  cart = new Cart({
                        user: userId,
                        items: item,
                        totalAmount: variation.price,
                        totalQuantity: quantity,
                  });
            } else {
                  // Check if product already exists in cart

                  const existingItemIndex = cart.items.findIndex((item) => item.variation._id === variation._id);

                  if (existingItemIndex > -1) {
                        cart.items[existingItemIndex].quantity += quantity;
                        cart.totalQuantity += quantity;
                        cart.totalAmount += variation.price;
                  } else {
                        // Add new product to cart
                        cart.items.push({ product: productId, variation, quantity });
                        cart.totalQuantity += quantity;
                        cart.totalAmount += variation.price;
                  }
            }

            await cart.save();
            const populatedCart = await cart.populate("items.product");

            res.status(200).json({ message: "Product added to cart", populatedCart });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error adding to cart" });
      }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
      const { itemId } = req.params;
      const { quantity } = req.body;
      const userId = req.userId;

      //   console.log({ itemId, quantity });

      try {
            const updatedCart = await Cart.findOneAndUpdate(
                  { user: userId, "items.variation._id": itemId },
                  { $set: { "items.$.quantity": quantity } },
                  { new: true } // Return the updated document
            );

            let totalQuantity = 0;
            let totalAmount = 0;

            if (!updatedCart) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            updatedCart.items.forEach((item) => {
                  totalQuantity += item.quantity;
                  totalAmount += item.quantity * item.variation.price;
            });

            const cart = await Cart.findOneAndUpdate(
                  { _id: updatedCart._id },
                  { totalQuantity, totalAmount },
                  { new: true }
            );

            res.status(200).json({ message: "Cart item updated", cart: cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
      const { itemId } = req.params;

      const userId = req.userId;

      try {
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                  return res.status(404).json({ message: "Cart not found" });
            }

            // Find the item in the cart
            const item = cart.items.find((item) => item.variation._id.toString() === itemId);
            const itemIndex = cart.items.findIndex((item) => item.variation._id.toString() === itemId);

            if (itemIndex === -1) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            // Remove the item
            cart.items.splice(itemIndex, 1);
            cart.totalQuantity -= item.quantity;
            cart.totalAmount -= item.variation.price * item.quantity;

            await cart.save();
            res.status(200).json({ message: "Cart item removed", cart });
      } catch (error) {
            console.error("Remove from cart error:", error);
            res.status(500).json({ message: "Server error", error });
      }
};

// Get all items in the cart
export const getCart = async (req, res) => {
      const userId = req.userId;

      try {
            const cart = await Cart.findOne({ user: userId }).populate("items.product"); // Populate product details
            if (!cart) {
                  return res.status(404).json({ message: "Cart not found" });
            }

            res.status(200).json({ cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Clear the entire cart
export const clearCart = async (req, res) => {
      const userId = req.user.id;

      try {
            const user = await User.findById(userid);
            user.cart = []; // Empty the cart

            await user.save();
            res.status(200).json({ message: "Cart cleared", cart: user.cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};
