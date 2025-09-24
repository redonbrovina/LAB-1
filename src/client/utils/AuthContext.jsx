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
        
        if (decoded.exp && decoded.exp < Date.now() / 1000) {
          // Token is expired, will be handled by API interceptor
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

  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(() => {
    return localStorage.getItem('defaultPaymentMethod') || null;
  });

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('AuthContext refreshAccessToken called, refresh token available:', !!refreshToken);
    
    if (!refreshToken) {
      console.log('No refresh token in AuthContext, calling logout');
      logout();
      return;
    }

    try {
      console.log('AuthContext calling refresh endpoint...');
      const response = await publicApiPost('/form/refresh-token', { refreshToken });
      localStorage.setItem('accessToken', response.accessToken);
      setUser(parseJwt(response.accessToken));
      console.log('AuthContext refresh successful');
      return response.accessToken;
    } catch (error) {
      console.error('AuthContext token refresh failed:', error);
      logout();
      throw error;
    }
  };

  const login = (accessToken, refreshToken) => {
    console.log('AuthContext login called with accessToken:', accessToken?.substring(0, 20) + '...');
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    const decoded = parseJwt(accessToken);
    console.log('Login - Decoded JWT token:', decoded);
    console.log('Login - Available fields in token:', Object.keys(decoded));
    console.log('Login - klientiID value:', decoded.klientiID);
    setUser(decoded);
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
      localStorage.removeItem('defaultPaymentMethod');
      setUser(null);
      setDefaultPaymentMethod(null);
    }
  };

  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const updateDefaultPaymentMethod = (paymentMethodId) => {
    setDefaultPaymentMethod(paymentMethodId);
    localStorage.setItem('defaultPaymentMethod', paymentMethodId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, getToken, isAuthenticated, defaultPaymentMethod, updateDefaultPaymentMethod }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);