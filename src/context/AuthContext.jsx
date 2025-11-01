import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import the decoder

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

  // This is the new login function our test is looking for
  const login = async (email, password) => {
    try {
      // 1. Call the API
      const res = await axios.post('/api/auth/login', { email, password });
      const newToken = res.data.token;

      // 2. Decode the token to get the user
      const decodedToken = jwtDecode(newToken);
      const newUser = decodedToken.user; // Assumes token payload is { user: { id, role } }

      // 3. Set state
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);

      // 4. Set token in axios headers for future requests
      axios.defaults.headers.common['x-auth-token'] = newToken;
      
      // We'll add localStorage later

    } catch (err) {
      console.error('Login failed', err);
      // We'll handle errors properly later
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['x-auth-token'];
  };
  const register = async (name, email, password) => {
    try {
      // 1. Call the API
      const res = await axios.post('/api/auth/register', { name, email, password });
      const newToken = res.data.token;

      // 2. Decode the token to get the user
      const decodedToken = jwtDecode(newToken);
      const newUser = decodedToken.user;

      // 3. Set state
      setToken(newToken);
      setUser(newUser);
      setIsAuthenticated(true);

      // 4. Set token in axios headers
      axios.defaults.headers.common['x-auth-token'] = newToken;
      
    } catch (err) {
      console.error('Registration failed', err);
    }
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