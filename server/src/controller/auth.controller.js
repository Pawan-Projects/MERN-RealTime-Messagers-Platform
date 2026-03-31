import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { BadRequestError, UnauthorizedError } from "../utils/app-error.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    throw BadRequestError("All fields are required");
  }

  // check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw BadRequestError("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // remove password from response
  const { password: _, ...userData } = user._doc;

  res.json({
    success: true,
    message: "User registered successfully",
    user: userData,
  });
});



export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 🔹 validation
  if (!email || !password) {
    throw BadRequestError("Email and password are required");
  }

  // 🔹 check user
  const user = await User.findOne({ email });
  if (!user) {
    throw UnauthorizedError("Invalid email or password");
  }

  // 🔹 compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw UnauthorizedError("Invalid email or password");
  }

  // 🔹 generate token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 🔹 remove password
  const { password: _, ...userData } = user._doc;

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: userData,
  });
});