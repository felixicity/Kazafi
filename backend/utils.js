import jwt from "jsonwebtoken";
import multer from "multer";

/* 
   This Code Uses the Multer Package to
   Store images locally in the working Directory
 */

// Set up multer storage
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, "uploads/products/"); // Specify folder for storing images
      },
      filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname); // File naming format
      },
});

// File filter (only allow image files)
const fileFilter = (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png/;
      const extname = allowedTypes.test(file.mimetype);
      const basename = allowedTypes.test(file.originalname.toLowerCase());

      if (extname && basename) {
            return cb(null, true);
      } else {
            cb(new Error("Only image files are allowed!"));
      }
};

// Initialize multer for image uploads
const upload = multer({
      storage,
      fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

/* 
    This Code Uses the JWT Package f
    or generating Tokens to users
 */

// This helper function generates a new token
const generateToken = (user) => {
      return jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d", // Token expiration time
      });
};

export { generateToken, upload };
