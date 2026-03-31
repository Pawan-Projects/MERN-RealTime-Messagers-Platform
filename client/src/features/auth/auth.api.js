// features/auth/auth.api.js
import { API } from "../../lib/axios-client";
import {API_ROUTES} from '../../constants/api.routes';

export const loginApi = async (payload) => {
  const { data } = await API.post(API_ROUTES.AUTH.LOGIN, payload);
  return data;
};

export const registerApi = async (payload) => {
  const { data } = await API.post(API_ROUTES.AUTH.REGISTER, payload);
  return data;
};