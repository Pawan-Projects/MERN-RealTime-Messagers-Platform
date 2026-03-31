// features/auth/auth.hook.js
import { useState } from "react";
import { loginApi, registerApi } from "./auth.api";
import { TOKEN_KEY} from '../../constants/api.routes';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

 const login = async (payload) => {
  setLoading(true);

  const data = await loginApi(payload);

  localStorage.setItem(TOKEN_KEY, data.token);

  setLoading(false);
  return data;
};
  const register = async (payload) => {
    setLoading(true);
    
      const data = await registerApi(payload);
      setLoading(false);
      return data;

  };

  return {
    loading,
    login,
    register,
  };
};