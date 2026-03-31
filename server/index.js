import "dotenv/config";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { Env } from "./src/config/env.js";
import { asyncHandler } from "./src/middlewares/asyncHandler.middleware.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import connectDatabase from "./src/config/database.js";
import { initializeSocket } from "./src/lib/socket.js";
import routes from "./src/routes/index.js";

const app = express();
const server = http.createServer(app);

// 🔥 SOCKET INIT
initializeSocket(server);

// 🔹 MIDDLEWARES
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

// 🔹 HEALTH API
app.get(
  "/health",
  asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is healthy",
    });
  })
);

// 🔹 ROUTES
app.use("/api", routes);

// 🔹 PRODUCTION STATIC SERVE
if (Env.NODE_ENV === "production") {
  const clientPath = path.resolve("client/dist");

  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(clientPath, "index.html"));
  });
}

// 🔹 ERROR HANDLER (LAST)
app.use(errorHandler);

// 🔹 SERVER START
server.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(
    `🚀 Server running on port ${Env.PORT} in ${Env.NODE_ENV} mode`
  );
});