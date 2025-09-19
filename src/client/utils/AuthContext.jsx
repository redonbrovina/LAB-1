import { createContext, useContext, useState } from 'react';
import { publicApiPost } from './api';

const AuthContext = createContext();

function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = parseJwt(token);
        console.log('Decoded JWT token:', decoded);
        console.log('Available fields in token:', Object.keys(decoded));
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('token');
          return null;
        }
        return decoded;
      } catch (error) {
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = parseJwt(token);
    console.log('Login - Decoded JWT token:', decoded);
    console.log('Login - Available fields in token:', Object.keys(decoded));
    setUser(decoded);
  };

  const logout = async () => {
    try {
      // Call logout endpoint
      await publicApiPost('/form/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token from localStorage
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);