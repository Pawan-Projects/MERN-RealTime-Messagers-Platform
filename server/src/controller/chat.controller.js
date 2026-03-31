import Chat from "../models/chat.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { BadRequestError  } from "../utils/app-error.js";

export const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new BadRequestError("UserId required");
  }

  const chat = await Chat.create({
    participants: [req.userId, userId],
  });

  res.json({
    success: true,
    chat,
  });
});

export const getUserChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    participants: req.userId,
  }).populate("participants", "name email");

  res.json({
    success: true,
    chats,
  });
});