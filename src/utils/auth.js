export const saveSession = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const clearSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};