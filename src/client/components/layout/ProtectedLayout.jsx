import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
};

export default ProtectedLayout;
