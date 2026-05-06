import api from "./api";

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response;
};

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};
