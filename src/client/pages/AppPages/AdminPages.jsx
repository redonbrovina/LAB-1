import { useLocation } from 'react-router-dom';

// Import all admin pages
import AdminDashboard from '../AdminDashboard';
import AdminPayments from '../AdminPayments';
import AdminPaymentMethods from '../AdminPaymentMethods';
import Applications from '../Applications';
import Orders from '../Orders';
import SuppliersAdmin from '../SuppliersAdmin';
import ProductsAdmin from '../ProductsAdmin';
import AdminUsers from '../AdminUsers';
import AdminCreateClient from '../AdminCreateClient';
import AdminSettings from '../AdminSettings';
import ReferenceData from '../ReferenceData';
import Teams from '../Teams';
import Players from '../Players';
import Employees from '../Employees';
import Contracts from '../Contracts';
import Lecturers from '../Lecturers';
import Lectures from '../Lectures';
import PlanetManagement from '../PlanetManagement';
import SatelliteManagement from '../SatelliteManagement';
import StudentsManagement from '../StudentsManagement';
import CoursesManagement from '../CoursesManagement';
import DoctorsManagement from '../DoctorsManagement';
import AppointmentsManagement from '../AppointmentsManagement';
import MoviesManagement from '../MoviesManagement';
import ActorsManagement from '../ActorsManagement';
import TeachersManagement from '../TeachersManagement';
import SubjectsManagement from '../SubjectsManagement';

const AdminPages = () => {
  const location = useLocation();
  
  switch (location.pathname) {
    case '/admin':
      return <AdminDashboard />;
    case '/admin/payments':
      return <AdminPayments />;
    case '/admin/payment-methods':
      return <AdminPaymentMethods />;
    case '/admin/applications':
      return <Applications />;
    case '/admin/orders':
      return <Orders />;
    case '/admin/suppliers':
      return <SuppliersAdmin />;
    case '/admin/products':
      return <ProductsAdmin />;
    case '/admin/users':
      return <AdminUsers />;
    case '/admin/users/create':
      return <AdminCreateClient />;
    case '/admin/settings':
      return <AdminSettings />;
    case '/admin/reference-data':
      return <ReferenceData />;
    case '/admin/teams':
      return <Teams />;
    case '/admin/players':
      return <Players />;
    case '/admin/employees':
      return <Employees />;
    case '/admin/contracts':
      return <Contracts />;
    case '/admin/lecturers':
      return <Lecturers />;
    case '/admin/lectures':
      return <Lectures />;
    case '/admin/planets':
      return <PlanetManagement />;
    case '/admin/satellites':
      return <SatelliteManagement />;
    case '/admin/students':
      return <StudentsManagement />;
    case '/admin/courses':
      return <CoursesManagement />;
    case '/admin/doctors':
      return <DoctorsManagement />;
    case '/admin/appointments':
      return <AppointmentsManagement />;
    case '/admin/movies':
      return <MoviesManagement />;
    case '/admin/actors':
      return <ActorsManagement />;
    case '/admin/teachers':
      return <TeachersManagement />;
    case '/admin/subjects':
      return <SubjectsManagement />;
    default:
      return <AdminDashboard />;
  }
};

export default AdminPages;
