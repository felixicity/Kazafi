import mongoose from "mongoose";

const ColorVariationSchema = new mongoose.Schema({
      color: { type: String, required: true }, // e.g., 'Red'

      hexCode: { type: String },

      sizes: {
            type: [String], // Example: ["S", "M", "L", "XL"]
      }, // Optional: visual use

      images: [String], // e.g., ['red1.jpg', 'red2.jpg']

      price: {
            type: Number,
            required: [true, "Product price is required"],
            min: 0,
      }, // 🔥 Variation-specific price

      stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: 0,
            default: 0, // Default to out of stock if not specified
      }, // Optional per variation

      discount: Number,

      images: {
            type: [String], // Array of image URLs
            required: [true, "At least one product image is required"],
      },
});

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
            category: {
                  type: String,
                  enum: ["clothes", "furniture"], // Add more categories if needed
                  required: [true, "Product category is required"],
            },
            variations: [ColorVariationSchema], // Multiple color variants
            isFeatured: {
                  type: Boolean,
                  default: false, // Determines if the product is shown as featured
            },
      },
      { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
