import express from "express";
import { createChat, getUserChats } from "../controller/chat.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",protect,  createChat);
router.get("/",protect, getUserChats);

export default router;