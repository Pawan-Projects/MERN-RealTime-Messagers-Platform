import { API } from "../../lib/axios-client";
import { API_ROUTES } from "../../constants/api.routes";

export const sendMessage = (receiverId, text) =>
  API.post(API_ROUTES.MESSAGE.SEND, { receiverId, text });

export const getMessages = (receiverId) =>
  API.get(API_ROUTES.MESSAGE.GET(receiverId));