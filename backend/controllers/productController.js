import fs from "fs";
import Product from "../models/productModel.js";

const createProduct = async (req, res) => {
      const { name, description, price, category } = req.body;

      const image = req.file ? req.file.path : null; //Save image path

      //   console.log({ name, description, price, category, image });
      try {
            // Create a new Product
            const newProduct = new Product({
                  name,
                  description,
                  price,
                  category,
                  images: [image], // Store image path or URL
            });

            const product = await newProduct.save();
            res.status(201).json({ message: "Product Created", product });
      } catch (error) {
            if (req.file) {
                  fs.unlinkSync(req.file.path); // Delete uploaded file if error occurs
            }
            res.status(500).json({ message: "Server error occurred while creating product" });
      }
};

// Get all products
const getProducts = async (req, res) => {
      try {
            const products = await Product.find();
            res.status(200).json({ products });
      } catch (error) {
            res.status(500).json({ message: "Server error when getting aall products" });
      }
};

// Get single product by ID
const getProductById = async (req, res) => {
      const { productid } = req.params;

      try {
            const product = await Product.findById(productid);
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ product });
      } catch (error) {
            res.status(500).json({ message: `Server error when getting a product with the id ${productid}` });
      }
};

// Update product
const updateProduct = async (req, res) => {
      const { productid } = req.params;
      const { name, price, description, category, size, color, stock, isFeatured } = req.body;
      const image = req.file ? req.file.path : null; // Check if new image is uploaded

      try {
            // Find the product by ID
            const product = await Product.findById(productid);
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Update product details
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            product.isFeatured = isFeatured ? isFeatured : product.isFeatured;
            product.sizes = !product.sizes.includes(size) ? [...product.sizes, size] : product.sizes;
            product.colors = !product.colors.includes(color) ? [...product.colors, color] : product.colors;

            if (image) {
                  // Add the image if its not already included in the array of images
                  product.images = !product.images.includes(image) ? [...product.images, image] : product.images;
            }

            await product.save();
            res.status(200).json({ message: "Product updated", product });
      } catch (error) {
            res.status(500).json({ message: "Server error when updating product" });
      }
};

// Delete product
const deleteProduct = async (req, res) => {
      const { productid } = req.params;

      try {
            const product = await Product.findByIdAndDelete(productid);

            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }

            // Delete the product's image if exists
            // if (product.images) {
            //       fs.unlinkSync(...product.images);
            // }

            res.status(200).json({ message: "Product deleted" });
      } catch (error) {
            res.status(500).json({ message: "Server error when deleting product" });
      }
};

export { createProduct, deleteProduct, getProductById, updateProduct, getProducts };
