import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';

const AdminProtectedLayout = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <Outlet />
    </ProtectedRoute>
  );
};

export default AdminProtectedLayout;
