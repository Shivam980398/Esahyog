import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  clearAuthSession,
  getAuthToken,
  getStoredUser,
  storeAuthSession,
  updateStoredUser,
} from "./authStorage";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [user, setUserState] = useState(() => {
    const savedToken = getAuthToken();
    return savedToken ? getStoredUser() : null;
  });
  const [token, setToken] = useState(() => {
    const savedToken = getAuthToken();
    const savedUser = getStoredUser();
    return savedToken && savedUser ? savedToken : null;
  });

  const setUser = (nextUser) => {
    setUserState(nextUser);
    updateStoredUser(nextUser);
  };

  const setAuthToken = (nextToken) => {
    storeAuthSession({ token: nextToken });
    setToken(nextToken);
  };

  const login = ({ token: nextToken, user: nextUser }) => {
    storeAuthSession({ token: nextToken, user: nextUser });
    setToken(nextToken);
    setUserState(nextUser);
  };

  const handleLogout = () => {
    clearAuthSession();
    setToken(null);
    setUserState(null);
    navigate("/");
  };

  const getProfileImgUrl = (path) => {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_BASE_URL}/${path.replace(/\\/g, "/")}`;
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    setUser,
    setAuthToken,
    login,
    logout: handleLogout,
    handleLogout,
    getProfileImgUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
