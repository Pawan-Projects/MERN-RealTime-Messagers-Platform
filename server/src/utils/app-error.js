// 🔥 Error Codes
export const ErrorCodes = {
  ERR_INTERNAL: "ERR_INTERNAL",
  ERR_BAD_REQUEST: "ERR_BAD_REQUEST",
  ERR_UNAUTHORIZED: "ERR_UNAUTHORIZED",
  ERR_FORBIDDEN: "ERR_FORBIDDEN",
  ERR_NOT_FOUND: "ERR_NOT_FOUND",
};

// 🔥 Factory function (base error)
export const createError = (
  message,
  statusCode = 500,
  errorCode = ErrorCodes.ERR_INTERNAL
) => {
  return {
    message,
    statusCode,
    errorCode,
  };
};

// 🔥 Shortcut functions (like class but without class)
export const BadRequestError = (message = "Bad Request") =>
  createError(message, 400, ErrorCodes.ERR_BAD_REQUEST);

export const UnauthorizedError = (message = "Unauthorized") =>
  createError(message, 401, ErrorCodes.ERR_UNAUTHORIZED);

export const NotFoundError = (message = "Not Found") =>
  createError(message, 404, ErrorCodes.ERR_NOT_FOUND);

export const InternalError = (message = "Internal Server Error") =>
  createError(message, 500, ErrorCodes.ERR_INTERNAL);