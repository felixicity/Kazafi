import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRouter.js";
import productRoutes from "./routes/productRouter.js";
import cartRoutes from "./routes/cartRouter.js";
import reviewRoutes from "./routes/reviewRouter.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRouter.js";
import contactRoutes from "./routes/contactRouter.js";
import webhookRoutes from "./routes/webHookRoutes.js";
import connectDatabase from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

dotenv.config();

connectDatabase();

const App = express();
const port = process.env.PORT;

App.use(express.json());
App.use(
      cors({
            origin: "http://localhost:3000", // your frontend origin
            credentials: true, // ✅ allows cookies to be sent
      })
);
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

// Absolute path to uploads from project root
const __dirname = path.resolve(); // only if you're using ES modules

App.use("/uploads", express.static(path.join(__dirname, "uploads")));

App.use("/api/users", userRoutes);
App.use("/api/cart", cartRoutes);
App.use("/api/products", productRoutes);
App.use("/api/:productId/reviews", reviewRoutes);
App.use("/api/user/wishlist", wishlistRoutes);
App.use("/api/orders", orderRoutes);
App.use("/api/payments", paymentRoutes);
App.use("/api/webhooks", webhookRoutes);
App.use("/api/contact", contactRoutes);

App.get("/", (req, res) => {
      res.send("First Page");
});

App.use(notFound);
App.use(errorHandler);

App.listen(port, console.log(`Server Listening 💡... on PORT ${port}`));
