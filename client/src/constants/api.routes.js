export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
   CHAT: {
    CREATE: "/chat",
    GET_ALL: "/chat",
  },
  MESSAGE: {
    SEND: "/message",
    GET: (receiverId) => `/message/${receiverId}`,
  },
  USERS: {
    GET_ALL: "/users/all",
  }
};

export const TOKEN_KEY = "token";