import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("key_stone_token");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
