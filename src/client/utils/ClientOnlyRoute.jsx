import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ClientOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== 'klient') {
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
    
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ClientOnlyRoute;
