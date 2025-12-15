import express from "express";
import { body } from "express-validator";
import {
      createProduct,
      getProducts,
      getProductById,
      updateProduct,
      deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../utils.js";
import { protectMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
// Initialize the router
const router = express.Router();

// Create product route (with image upload)
router.post(
      "/create",
      upload.any(), // Expect the image  be in the 'image' field in the request
      //   protectMiddleware,
      //   adminMiddleware,
      createProduct
);

// Get all products route
router.get("/", getProducts);

// Get a single product route
router.get("/:productId", getProductById);

// Update product route (with optional image upload)
router.put("/:productId", protectMiddleware, adminMiddleware, updateProduct);

// Delete product route
router.delete("/:productId", protectMiddleware, adminMiddleware, deleteProduct);

export default router;
