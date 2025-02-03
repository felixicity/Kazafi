import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Review from "../models/reviewModel.js"; // Review model

// Add a review to a product
export const addReview = async (req, res) => {
      const { rating, comment } = req.body;
      const productId = req.params.productId;
      const userId = req.userId; // Assuming user is authenticated

      try {
            // Check if product exists
            const product = await Product.findById(productId);
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Check if the user has already reviewed this product
            const existingReview = await Review.findOne({ product: productId, user: userId });
            if (existingReview) {
                  return res.status(400).json({ message: "You have already reviewed this product" });
            }

            // Create a new review
            const newReview = new Review({
                  rating,
                  comment,
                  product: productId,
                  user: userId,
            });

            await newReview.save();

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
      const userId = req.user.id;

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
            res.status(200).json({ reviews: product.reviews });
      } catch (error) {
            res.status(500).json({ message: "Server error", error });
      }
};
