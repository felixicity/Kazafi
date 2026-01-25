import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
      {
            rating: { type: Number, required: true, min: 1, max: 5 }, // Rating out of 5
            comment: { type: String, required: true },
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            product: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
      {
            timestamps: true, // Automatically add createdAt and updatedAt fields
      },
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
