import { createContext, useContext, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");

  let parsedUser = null;
  if (storedUser && storedUser !== "undefined") {
    try {
      parsedUser = JSON.parse(storedUser);
    } catch {
      parsedUser = null;
    }
  }

  const [token, setAuthToken] = useState(getToken());
  const [user, setUser] = useState(parsedUser);

  const login = (data) => {
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuthToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);