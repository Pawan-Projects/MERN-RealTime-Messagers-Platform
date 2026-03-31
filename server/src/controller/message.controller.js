import Message from "../models/message.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { emitMessage } from "../lib/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  console.log("🔥 API HIT");
  const { receiverId, text } = req.body;

  console.log("🔥 SENDING MESSAGE");
  console.log("Sender:", req.userId);
  console.log("Receiver:", receiverId);

  const message = await Message.create({
    sender: req.userId,
    receiver: receiverId,
    text,
  });

  // 🔥 IMPORTANT FIX
  emitMessage(receiverId.toString(), message);
emitMessage(req.userId.toString(), message); 

  res.json({
    success: true,
    message,
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.userId, receiver: receiverId },
      { sender: receiverId, receiver: req.userId },
    ],
  }).sort({ createdAt: 1 });

  res.json({ success: true, messages });
});