import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
// import dotenv from "dotenv";
// dotenv.config();

const protectMiddleware = (req, res, next) => {
      if (!req.cookies || !req.cookies.authToken) {
            return res.status(401).json({ message: "No authentication token provided" });
      }

      try {
            const token = req.cookies.authToken;

            if (!token) {
                  res.status(403);
                  throw new Error("Authorization Failed-Forbidden");
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userid;
            next();
      } catch (error) {
            res.status(401);
            throw new Error("Authorization Failed");
      }
};

// Middleware to check if the user is an admin
const adminMiddleware = async (req, res, next) => {
      const user = await User.findById(req.userId);
      if (user && user.isAdmin) {
            next(); // Proceed if user is admin
      } else {
            res.status(403).json({ message: "Forbidden to visit this page" });
      }
};

export { protectMiddleware, adminMiddleware };
