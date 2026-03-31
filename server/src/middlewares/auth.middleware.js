import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Authorization Header:", req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; // 🔥 yahi missing tha

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};