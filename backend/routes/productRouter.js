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
      upload.single("image"), // Expect the image to be in the 'image' field in the request
      [
            body("name").notEmpty().withMessage("Product name is required"),
            body("price").isNumeric().withMessage("Price must be a number"),
            body("description").notEmpty().withMessage("Product description is required"),
            body("category").notEmpty().withMessage("Product category is required"),
      ],
      protectMiddleware,
      adminMiddleware,
      createProduct
);

// Get all products route
router.get("/", getProducts);

// Get a single product route
router.get("/:productid", getProductById);

// Update product route (with optional image upload)
router.put("/:productid", upload?.single("image"), protectMiddleware, adminMiddleware, updateProduct);

// Delete product route
router.delete("/:productid", protectMiddleware, adminMiddleware, deleteProduct);

export default router;
