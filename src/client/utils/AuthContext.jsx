import { createContext, useContext, useState } from 'react';
import { publicApiPost } from './api';

const AuthContext = createContext();

function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = parseJwt(token);
        console.log('Decoded JWT token:', decoded);
        console.log('Available fields in token:', Object.keys(decoded));
        // Check if token is expired
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // Try to refresh token
          refreshAccessToken();
          return null;
        }
        return decoded;
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return null;
      }
    }
    return null;
  });

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const decoded = parseJwt(accessToken);
    console.log('Login - Decoded JWT token:', decoded);
    console.log('Login - Available fields in token:', Object.keys(decoded));
    setUser(decoded);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await publicApiPost('/form/refresh-token', { refreshToken });
      localStorage.setItem('accessToken', response.accessToken);
      setUser(parseJwt(response.accessToken));
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await publicApiPost('/form/logout', { refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
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