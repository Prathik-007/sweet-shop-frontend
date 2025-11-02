import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // <-- IMPORT useNavigate

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
  
  // NOTE: This is the navigate function that can only be called inside a component
  const navigate = useNavigate(); 

  const handleAuthSuccess = (newToken) => {
    const decodedToken = jwtDecode(newToken);
    const newUser = decodedToken.user;

    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
    axios.defaults.headers.common['x-auth-token'] = newToken;
    
    // REDIRECTION ON SUCCESS
    navigate('/dashboard'); 
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      handleAuthSuccess(res.data.token);
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      handleAuthSuccess(res.data.token);
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['x-auth-token'];
    
    // Redirect to login page on logout
    navigate('/'); 
  };

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};