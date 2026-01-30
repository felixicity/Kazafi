import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js"; // Review model
import Order from "../models/orderModel.js";
import { ParseImage } from "../utils.js";

// Add a review to a product
export const addReview = async (req, res) => {
      const { rating, comment } = req.body;
      const reviewImage = await ParseImage(req.file);
      const { productId, orderId } = req.params;
      const userId = req.userId;

      try {
            const order = await Order.findOne({
                  _id: orderId,
                  customer: req.userId, // Security: Ensure they own this order
            });

            if (!order) {
                  return res.status(404).json({ message: "Order not found." });
            }

            if (order.status !== "delivered") {
                  return res.status(400).json({ message: "You can only review delivered items." });
            }

            // Check if the specific product exists in this order
            const productInOrder = order.items.find((item) => item.productId === productId);

            if (!productInOrder) {
                  return res.status(400).json({ message: "This product was not part of this order." });
            }

            if (productInOrder.isReviewed) {
                  return res.status(400).json({ message: "You have already reviewed this product." });
            }

            const product = await Product.findById({ _id: productId });

            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Create a new review
            const newReview = await Review.create({
                  rating,
                  comment,
                  image: reviewImage,
                  product: productId,
                  user: userId,
            });

            productInOrder.isReviewed = true;

            await order.save();

            // Add the review reference to the product (optional)
            product.reviews.push(newReview._id);
            await product.save();

            res.status(201).json({ message: "Review added successfully", review: newReview });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Update a review for a product
export const updateReview = async (req, res) => {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.userId;

      try {
            // Find the review by ID
            const review = await Review.findById(reviewId);
            if (!review) {
                  return res.status(404).json({ message: "Review not found" });
            }

            // Check if the review belongs to the logged-in user
            if (review.user.toString() !== userId) {
                  return res.status(403).json({ message: "You can only update your own review" });
            }

            // Update the review
            review.rating = rating || review.rating;
            review.comment = comment || review.comment;
            await review.save();

            res.status(200).json({ message: "Review updated successfully", review });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Delete a review
export const deleteReview = async (req, res) => {
      const { reviewId } = req.params;
      const userId = req.userId;

      try {
            // Find the review by ID
            const review = await Review.findByIdAndDelete(reviewId);

            if (!review) {
                  return res.status(404).json({ message: "Review not found" });
            }

            // Check if the review belongs to the logged-in user
            if (review.user.toString() !== userId) {
                  return res.status(403).json({ message: "You can only delete your own review" });
            }

            // Remove the reference to the review from the product
            const product = await Product.findById(review.product);
            product.reviews = product.reviews.filter((id) => id.toString() !== reviewId);
            await product.save();

            res.status(200).json({ message: "Review deleted successfully" });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
      const { productId } = req.params;

      try {
            // Get the product
            const product = await Product.findById(productId).populate("reviews");
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Return all reviews for the product
            res.status(200).json(product.reviews);
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};
