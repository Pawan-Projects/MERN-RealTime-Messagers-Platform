import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  
  if (!token) return { user: null, token: null, isLoggedIn: false };
  
  try {
    const decoded = jwtDecode(token);
    // decoded = { userId: "...", iat: ..., exp: ... }
    
    return {
      user: { _id: decoded.userId }, // backend ne userId se sign kiya tha
      token,
      isLoggedIn: true,
    };
  } catch {
    return { user: null, token: null, isLoggedIn: false };
  }
};