import User from "../models/user.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";


export const getAlluser = asyncHandler(async (req, res) => {
  const users = await User.find().select("_id name email");

  res.json({
    success: true,
    users,
  });
});