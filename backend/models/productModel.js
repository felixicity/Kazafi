import mongoose from "mongoose";

const VariationSchema = new mongoose.Schema({
      color: { type: String, required: true }, // e.g., 'Red'

      hexCode: { type: String },

      sizes: {
            type: [String], // Example: ["S", "M", "L", "XL"]
      }, // Optional: visual use

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

      discount: {
            type: Number,
            default: 0,
      },

      imageURLs: {
            type: [String], // Array of image URLs
            required: [true, "At least one product image is required"],
      },
      numberSold: Number,
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// For the materials from which a product was made
const MaterialSchema = new mongoose.Schema({
      title: String,
      detail: String,
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
                  required: [true, "Product category is required"],
            },
            variations: [VariationSchema], // Multiple color variants
            materials: [MaterialSchema],
            isFeatured: {
                  type: Boolean,
                  default: false, // Determines if the product is shown as featured
            },

            status: {
                  type: String,
                  required: [true, "All products must have a status"],
                  enum: ["draft", "active"],
                  default: "draft",
            },
      },
      { timestamps: true }, // Automatically adds createdAt and updatedAt fields
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
