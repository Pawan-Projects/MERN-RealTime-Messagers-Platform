import { useState, useEffect } from "react";
import { fetchAllUsers } from "./users.api";

export const useUsers = () => {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchAllUsers()
      .then((res) => setUsers(res.data.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { users, loading, error };
};