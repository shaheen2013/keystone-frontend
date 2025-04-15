// import { useState } from "react";

export function useAuth() {
  // const [isAuthenticated] = useState(false);
  const isAuthenticated = true;

  // useEffect(() => {
  //   const token = localStorage.getItem("key_stone_token");
  //   setIsAuthenticated(!!token);
  // }, []);
  // const isAuthenticated = !!localStorage.getItem("key_stone_token");

  return { isAuthenticated };
}
