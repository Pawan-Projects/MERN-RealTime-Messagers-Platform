import { ErrorCodes } from "../utils/app-error.js";

export const errorHandler = (err, req, res, next) => {
  console.error(`Error at ${req.path}:`, err);

  // 🔥 if custom error (our structure)
  if (err?.statusCode && err?.errorCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  // 🔥 fallback (unknown error)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errorCode: ErrorCodes.ERR_INTERNAL,
  });
};