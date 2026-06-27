import api from "./api";

export const register = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  if (data.token) {
    localStorage.setItem("token", data.token);
    return data.user;
  }
};

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data.user;
};
