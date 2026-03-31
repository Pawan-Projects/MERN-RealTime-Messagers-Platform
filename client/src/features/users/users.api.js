import { API } from "../../lib/axios-client";

export const fetchAllUsers = () => API.get("/users/all");