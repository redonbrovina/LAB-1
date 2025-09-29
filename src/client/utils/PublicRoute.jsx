import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Allow access to home page even when logged in
  if (location.pathname === '/') {
    return children;
  }
  
  // For auth pages (login, signup, etc.), redirect if already logged in
  const authRoutes = ['/login', '/signup', '/signup-success', '/admin-login'];
  if (authRoutes.includes(location.pathname) && user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (user.role === 'klient') {
      return <Navigate to="/dashboard" />;
    }
  }
  
  // For other public routes (about, services), redirect if logged in
  if (user && !authRoutes.includes(location.pathname)) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (user.role === 'klient') {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return children;
};

export default PublicRoute;
