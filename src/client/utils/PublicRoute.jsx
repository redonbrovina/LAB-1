import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else if (user.role === 'klient') {
      return <Navigate to="/dashboard" />;
    }
  }
  
  return children;
};

export default PublicRoute;
