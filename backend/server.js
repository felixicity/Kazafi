import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
// ... (your other imports)

dotenv.config();
connectDatabase();

const App = express();

// 1. Move this to the top - Essential for Render/Vercel cookies
App.set("trust proxy", 1);

const port = process.env.PORT || 10000;

const allowedOrigins = ["https://kazafi-commerce.vercel.app", "http://localhost:3000"];

const corsOptions = {
      origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const isAllowed = allowedOrigins.includes(origin);
            const isVercelPreview = origin.endsWith(".vercel.app");

            if (isAllowed || isVercelPreview) {
                  callback(null, true);
            } else {
                  callback(new Error("Not allowed by CORS"));
            }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      optionsSuccessStatus: 200,
};

// 2. Global Middleware - Correct Order
App.use(cors(corsOptions));
App.options("*", cors(corsOptions)); // Pre-flight fix

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cookieParser());

// ... (Rest of your routes)

App.listen(port, () => console.log(`Server Listening 💡 on PORT ${port}`));
