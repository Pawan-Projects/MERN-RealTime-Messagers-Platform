import mongoose from "mongoose";
import { Env } from "../config/env.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDatabase;