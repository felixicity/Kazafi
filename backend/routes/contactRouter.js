import express from "express";
import { protectMiddleware } from "../middleware/authMiddleware.js";
import { sendMessage, updateMessage, deleteMessage, getAllMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", protectMiddleware, sendMessage);
router.get("/", protectMiddleware, getAllMessages);
router.put("/:messageid", protectMiddleware, updateMessage);
router.delete("/:messageid", protectMiddleware, deleteMessage);

export default router;
