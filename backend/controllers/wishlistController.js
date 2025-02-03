import Wishlist from "../models/wishListModel.js";
import Product from "../models/productModel.js";

// Add a product to the wishlist
export const addProductToWishlist = async (req, res) => {
      const { productId } = req.params;
      const userId = req.user.id; // Assuming the user is authenticated

      try {
            // Check if the product exists
            const product = await Product.findById(productId);
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Find the user's wishlist
            let wishlist = await Wishlist.findOne({ user: userId });

            if (!wishlist) {
                  // If the user doesn't have a wishlist, create one
                  wishlist = new Wishlist({
                        user: userId,
                        products: [productId],
                  });
                  await wishlist.save();
            } else {
                  // If the wishlist exists, add the product if not already in the wishlist
                  if (!wishlist.products.includes(productId)) {
                        wishlist.products.push(productId);
                        await wishlist.save();
                  } else {
                        return res.status(400).json({ message: "Product already in wishlist" });
                  }
            }

            res.status(201).json({ message: "Product added to wishlist", wishlist });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Remove a product from the wishlist
export const removeProductFromWishlist = async (req, res) => {
      const { productId } = req.params;
      const userId = req.user.id;

      try {
            // Find the user's wishlist
            const wishlist = await Wishlist.findOne({ user: userId });
            if (!wishlist) {
                  return res.status(404).json({ message: "Wishlist not found" });
            }

            // Remove the product from the wishlist
            wishlist.products = wishlist.products.filter((product) => product.toString() !== productId);

            await wishlist.save();

            res.status(200).json({ message: "Product removed from wishlist", wishlist });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Get all products in the user's wishlist
export const getWishlist = async (req, res) => {
      const userId = req.user.id;

      try {
            // Find the user's wishlist and populate the products
            const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
            if (!wishlist) {
                  return res.status(404).json({ message: "Wishlist not found" });
            }

            res.status(200).json({ wishlist });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Clear all products from the wishlist
export const clearWishlist = async (req, res) => {
      const userId = req.user.id;

      try {
            // Find and delete the user's wishlist
            const wishlist = await Wishlist.findOneAndDelete({ user: userId });
            if (!wishlist) {
                  return res.status(404).json({ message: "Wishlist not found" });
            }

            res.status(200).json({ message: "Wishlist cleared" });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};
