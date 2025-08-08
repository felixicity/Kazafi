import User from "../models/userModel.js"; // Import user model
import Product from "../models/productModel.js"; // Import product model
import Cart from "../models/cartModel.js";

// Add item to the cart
export const addToCart = async (req, res) => {
      const { productId, quantity } = req.body;

      const userId = req.userId;
      //   console.log(userId);

      try {
            // Check if item is already in cart
            // let cartItem = await Cart.findOne({ user: userId });

            // Check if user already has a cart
            let cart = await Cart.findOne({ user: userId }); // Get user ID and product ID from authentication middleware

            if (!cart) {
                  // Create a new cart if none exists
                  cart = new Cart({
                        user: userId,
                        items: [{ product: productId, quantity }],
                  });
            } else {
                  // Check if product already exists in cart
                  const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

                  if (existingItemIndex > -1) {
                        // Product exists, update quantity
                        cart.items[existingItemIndex].quantity += quantity;
                  } else {
                        // Add new product to cart
                        cart.items.push({ product: productId, quantity });
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

      try {
            let cart = await Cart.findOne({ user: userId });
            const item = cart.id(itemId);

            if (!item) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            item.quantity = quantity; // Update the quantity

            await cart.save();
            res.status(200).json({ message: "Cart item updated", cart: user.cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
      const { itemid } = req.params;
      const userId = req.userId;

      try {
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                  return res.status(404).json({ message: "Cart not found" });
            }

            // Find the item in the cart
            cart.items.forEach((item) => {
                  console.log("item._id:", item._id, typeof item._id, "itemid:", itemid, typeof itemid);
            });
            const itemIndex = cart.items.findIndex((item) => item.product.toString() === itemid);

            if (itemIndex === -1) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            // Remove the item
            cart.items.splice(itemIndex, 1);

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
