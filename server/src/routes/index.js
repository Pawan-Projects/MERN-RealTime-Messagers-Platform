import express from "express";
import authRoutes from "./auth.route.js";
import chatRoutes from "./chat.route.js";
import messageRoutes from "./message.route.js";
import userRoutes from "./user.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/users", userRoutes);
router.use("/message", messageRoutes);

export default router;