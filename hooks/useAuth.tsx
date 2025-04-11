export function useAuth() {
  const token = localStorage.getItem("key_stone_token");

  return {
    isAuthenticated: token ? true : false,
  };
}
