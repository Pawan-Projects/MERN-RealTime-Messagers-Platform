import { API } from "../../lib/axios-client";
import { API_ROUTES } from "../../constants/api.routes";

export const createChat   = (userId) => API.post(API_ROUTES.CHAT.CREATE, { userId });
export const getUserChats = ()       => API.get(API_ROUTES.CHAT.GET_ALL);
export const sendMessage = (receiverId, text) => 
  API.post(API_ROUTES.MESSAGE.SEND, { receiverId, text });

export const getMessages = (receiverId) => API.get(API_ROUTES.MESSAGE.GET(receiverId));
export const fetchAllUsers = () => API.get(API_ROUTES.USERS.GET_ALL)