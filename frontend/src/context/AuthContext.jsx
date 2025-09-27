import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, getUserProfile as apiGetProfile } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Try to fetch profile to validate token
      apiGetProfile()
        .then(response => {
          setUser(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          // Token invalid, clear it
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    setUser, // Expose setUser to allow profile data to be updated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};