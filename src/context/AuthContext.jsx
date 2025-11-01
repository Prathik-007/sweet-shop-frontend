import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create a custom hook to consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This is the login function our test calls
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    // In a real app, you'd also set the axios auth header here
    // axios.defaults.headers.common['x-auth-token'] = newToken;
    // And save the token to localStorage
    // localStorage.setItem('token', newToken);
  };

  // We'll add logout for completeness
  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // delete axios.defaults.headers.common['x-auth-token'];
    // localStorage.removeItem('token');
  };

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};