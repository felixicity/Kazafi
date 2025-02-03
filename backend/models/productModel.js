import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  required: [true, "Product name is required"],
                  trim: true,
            },
            description: {
                  type: String,
                  required: [true, "Product description is required"],
            },
            price: {
                  type: Number,
                  required: [true, "Product price is required"],
                  min: 0,
            },
            category: {
                  type: String,
                  enum: ["clothes", "furniture"], // Add more categories if needed
                  required: [true, "Product category is required"],
            },
            sizes: {
                  type: [String], // Example: ["S", "M", "L", "XL"]
            },
            colors: {
                  type: [String], // Example: ["Red", "Blue", "Black"]
            },
            stock: {
                  type: Number,
                  required: [true, "Stock quantity is required"],
                  min: 0,
                  default: 0, // Default to out of stock if not specified
            },
            images: {
                  type: [String], // Array of image URLs
                  required: [true, "At least one product image is required"],
            },
            ratings: {
                  type: Number,
                  default: 0, // Average rating
                  min: 0,
                  max: 5,
            },
            isFeatured: {
                  type: Boolean,
                  default: false, // Determines if the product is shown as featured
            },
      },
      { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
