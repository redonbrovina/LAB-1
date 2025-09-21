import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';
import AdminNavbar from '../../admin/AdminNavbar';

const AdminProtectedLayout = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />
        <div className="ml-64 p-6">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminProtectedLayout;
