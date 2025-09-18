import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (roles && !roles.includes(user.role)) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (user.role === 'klient') {
      return <Navigate to="/dashboard" />;
    }

    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;