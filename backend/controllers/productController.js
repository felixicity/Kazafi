import Product from "../models/productModel.js";
import { parseVariations, parseImageVariations } from "../utils.js";

const createProduct = async (req, res) => {
      const { name, description, category } = req.body;

      // 1. Reconstruct the variations array from the flattened req.body
      const variations = parseVariations(req.body);
      const imageFilesMap = await parseImageVariations(req.files);

      const productData = {
            name,
            description,
            category,
            variations: [],
      };

      // Combine the parsed variations with the image URLs
      const productVariations = variations.map((variation, index) => ({
            ...variation,
            imageURLs: imageFilesMap[index + 1] || [],
      }));

      try {
            productData.variations.push(...productVariations);

            // Create a new Product

            const newProduct = new Product(productData);

            const product = await newProduct.save();
            res.status(201).json({ message: "Product Created Successfully", product });
      } catch (error) {
            res.status(500).json({
                  message: "Server error occurred while creating product or uploadig images",
                  specificError: error,
            });
      }
};

// Get all products
const getProducts = async (req, res) => {
      // 1. Extract Query Parameters
      // Example request: /api/products?category=tshirt&color=000000&minPrice=10&sort=price_asc&page=1&limit=12&search=polo
      const {
            category, // string: 'tshirt,hoodie' (comma-separated list)
            color, // string: '#000000,#FFFFFF' (comma-separated list of hex codes)
            size, // string: 'S,M,L' (comma-separated list)
            priceRange, // string: '50'
            sort, // string: 'price_asc' | 'price_desc' | 'newest'
            search, // string: 'blue shirt'
            page = 1, // string: '1'
            limit = 12, // string: '12' (default number of items per page)
      } = req.query;

      // Initialize Mongoose query object and sorting options
      let query = {};
      let sortOptions = {};

      // --- 2. BUILD THE SEARCH QUERY ---
      if (search) {
            const searchRegex = new RegExp(search, "i"); // 'i' for case-insensitive

            // Search across multiple fields (name and description)
            query.$or = [{ name: searchRegex }, { description: searchRegex }];
            // Note: For large-scale production, consider using MongoDB's $text search index
            // with $search operator for superior performance.
      }

      // --- 3. BUILD THE FILTER QUERIES ---

      // A. Category Filter
      if (category) {
            const categoriesArray = category.split(",");
            query.category = { $in: categoriesArray }; // Matches any product where category is in the array
      }

      // B. Color Filter (Filtering by variants.color property)
      if (color) {
            const colorsArray = color.split(",");
            // This targets products that have *at least one* variant matching the requested color
            query["variations.color"] = { $in: colorsArray };
      }

      // C. Size Filter (Filtering by variants.sizes property)
      if (size) {
            const sizesArray = size.split(",");
            // This targets products that have *at least one* variant matching the requested size
            query["variations.sizes"] = { $in: sizesArray };
      }

      // Assuming size and color filters are also active
      // Function scope where req.query is available

      const priceRangeString = req.query.priceRange; // Get the raw string, or undefined

      let priceQuery = {};
      let hasPriceFilter = false;

      // 1. Check if the price range parameter exists
      if (priceRangeString) {
            // 2. Safely parse the MinPrice and MaxPrice from the comma-separated string
            const [minPriceStr, maxPriceStr] = priceRangeString.split(",");

            // Convert to numbers, defaulting to 0 or a very large number if parsing fails
            const minPrice = Number(minPriceStr) || 0;
            const maxPrice = Number(maxPriceStr) || Infinity;

            // 3. Construct the Mongoose price range query
            // This is applied to the individual price within the variation array
            if (minPrice > 0 || maxPrice < Infinity) {
                  priceQuery.$gte = minPrice;
                  priceQuery.$lte = maxPrice;
                  hasPriceFilter = true;
            }
      }

      // 4. Apply the price filter to the main query object using dot notation
      if (hasPriceFilter) {
            // Dot notation: 'variations.price' tells MongoDB to check if
            // *ANY* element in the 'variations' array satisfies the 'price' condition.
            query["variations.price"] = priceQuery;
      }

      // Now the rest of your controller continues with the updated 'query' object...
      // const products = await Product.find(query).sort(sortOptions).exec();

      // --- 4. BUILD THE SORTING OPTIONS ---
      switch (sort) {
            case "price_asc":
                  sortOptions.price = 1; // 1 for ascending
                  break;
            case "price_desc":
                  sortOptions.price = -1; // -1 for descending
                  break;
            case "newest":
            default:
                  // Assuming your Product schema has a 'createdAt' timestamp
                  sortOptions.createdAt = -1;
                  break;
      }

      // --- 5. EXECUTE QUERY AND PAGINATION ---
      try {
            const pageNumber = parseInt(page);
            const limitNumber = parseInt(limit);
            const skip = (pageNumber - 1) * limitNumber;

            // Count total matching documents *before* applying skip/limit
            const totalProducts = await Product.countDocuments(query);

            const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limitNumber); // Apply pagination limits
            // console.log("query:", query);
            // console.log("Products:", products);

            // Calculate total pages for the frontend
            const totalPages = Math.ceil(totalProducts / limitNumber);

            res.status(200).json({
                  products,
                  pagination: {
                        totalProducts,
                        totalPages,
                        currentPage: pageNumber,
                        limit: limitNumber,
                        hasNextPage: pageNumber < totalPages,
                  },
            });
      } catch (error) {
            console.error("MongoDB Query Error:", error);
            res.status(500).json({ message: "Server error during product retrieval.", error: error.message });
      }
};

// Get single product by ID
const getProductById = async (req, res) => {
      const { productId } = req.params;
      console.log("productId:", productId);

      try {
            const product = await Product.findById(productId);
            if (!product) {
                  return res.status(404).json({ message: "Product not found" });
            }
            // console.log("product:", product);
            res.status(200).json(product);
      } catch (error) {
            res.status(500).json({ message: `Server error when getting a product with the id ${productId}` });
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
            res.status(200).json({ message: "Product deleted" });
      } catch (error) {
            res.status(500).json({ message: "Server error when deleting product" });
      }
};

const getAllProducts = async (req, res) => {
      //Admin wants to get all their products
      console.log("Admin wants to get all their products");
      try {
            const products = await Product.find();

            if (products.length < 1) {
                  console.log("No products found, returning 404");
                  return res.status(404).json({ message: "Product not found" });
            }

            return res.status(200).json(products);
      } catch (error) {
            console.error("Error in getAllProducts:", error);
            res.status(500).json({ message: "Server error when retrieving all products for admin" });
      }
};

export { createProduct, deleteProduct, getProductById, updateProduct, getProducts, getAllProducts };
