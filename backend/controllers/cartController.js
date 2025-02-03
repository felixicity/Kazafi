import User from "../models/userModel.js"; // Import user model
import Product from "../models/productModel.js"; // Import product model
import Cart from "../models/cartModel.js";

// Add item to the cart
export const addToCart = async (req, res) => {
      const { productId, quantity } = req.body;
      const userId = req.userid;

      try {
            // Validate the product
            const product = await Product.findById(productId);

            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Check if user already has a cart
            let cart = await Cart.findOne({ user: userId }); // Get user ID from authentication middleware

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
            res.status(200).json({ message: "Product added to cart", cart });
      } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error adding to cart" });
      }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
      const { itemId } = req.params;
      const { quantity } = req.body;
      const userId = req.user.id;

      try {
            const user = await User.findById(userid);
            const item = user.cart.id(itemId);

            if (!item) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            item.quantity = quantity; // Update the quantity

            await user.save();
            res.status(200).json({ message: "Cart item updated", cart: user.cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Remove an item from the cart
export const removeFromCart = async (req, res) => {
      const { itemId } = req.params;
      const userId = req.user.id;

      try {
            const user = await User.findById(userid);
            const item = user.cart.id(itemId);

            if (!item) {
                  return res.status(404).json({ message: "Cart item not found" });
            }

            item.remove(); // Remove the item from the cart

            await user.save();
            res.status(200).json({ message: "Cart item removed", cart: user.cart });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Get all items in the cart
export const getCart = async (req, res) => {
      const userId = req.user.id;

      try {
            const user = await User.findById(userid).populate("cart.product"); // Populate product details
            if (!user) {
                  return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json({ cart: user.cart });
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
