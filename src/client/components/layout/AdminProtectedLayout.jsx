import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';
import AdminNavbar from '../../admin/AdminNavbar';

const AdminProtectedLayout = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <div className="flex h-screen bg-gray-50">
        <AdminNavbar />
        <div className="flex-1 lg:ml-0 p-4 lg:p-6 pt-16 lg:pt-0 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminProtectedLayout;
