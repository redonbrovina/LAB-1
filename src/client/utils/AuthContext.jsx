import { createContext, useContext, useState, useEffect } from 'react';
import { publicApiPost, apiGet } from './api';

const AuthContext = createContext();

function parseJwt(token) {
    return JSON.parse(atob(token.split('.')[1]));
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(()=>{
    return localStorage.getItem('defaultPaymentMethod') || null;
  });

  // Check for existing session on app load
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      // Make a simple API call to check if we have a valid session
      const response = await publicApiPost('/form/refresh-token', {});
      
      const userInfoResponse = await fetch('http://localhost:5000/api/form/user-info', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      }
      
    } catch (error) {
      // No valid session, user stays null
    }
  };


  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await publicApiPost('/form/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setDefaultPaymentMethod(null);
    }
  };


  const isAuthenticated = () => {
    return user !== null;
  };

  const updateDefaultPaymentMethod = (paymentMethodId) => {
    setDefaultPaymentMethod(paymentMethodId);
    localStorage.setItem('defaultPaymentMethod', paymentMethodId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, defaultPaymentMethod, updateDefaultPaymentMethod }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);