import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';
import AdminNavbar from '../../admin/AdminNavbar';

const AdminProtectedLayout = () => {
  return (
    <ProtectedRoute roles={['admin']}>
      <div className="min-h-screen" style={{ backgroundColor: "#FEF2F2" }}>
        <AdminNavbar />
        <div className="ml-64 p-8">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminProtectedLayout;
