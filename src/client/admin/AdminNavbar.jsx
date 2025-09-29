import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, ShoppingBag, Package, Users, Settings, DollarSign, Truck, CreditCard, Menu, X, Database, Users2, Trophy, UserCheck, FileText as ContractIcon, GraduationCap, BookOpen, Globe, Satellite as SatelliteIcon, User, Book, Stethoscope, Calendar, Film, Users as UsersIcon, GraduationCap as TeacherIcon, BookOpen as SubjectIcon, Store, Package as PackageIcon, Plane, UserCheck as PassengerIcon } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";

export default function AdminNavbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "flex items-center gap-2 text-white font-semibold bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
      : "flex items-center gap-2 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-md"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static top-0 left-0 h-screen w-64 bg-red-600 text-white flex flex-col z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:block'}
        flex-shrink-0 overflow-hidden
      `}>
        {/* Header */}
        <div className="p-6 flex-shrink-0">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0 max-h-full">
          <Link to="/admin" className={getLinkClass("/admin")} onClick={closeMobileMenu}>
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Planet Management - Space Objects - NEW */}
          <Link to="/admin/planets" className={getLinkClass("/admin/planets")} onClick={closeMobileMenu}>
            <Globe size={18} />
            Planets
          </Link>

          {/* Satellite Management - Space Objects */}
          <Link to="/admin/satellites" className={getLinkClass("/admin/satellites")} onClick={closeMobileMenu}>
            <SatelliteIcon size={18} />
            Satellites
          </Link>

          <Link to="/admin/applications" className={getLinkClass("/admin/applications")} onClick={closeMobileMenu}>
            <FileText size={18} />
            Applications
          </Link>

          <Link to="/admin/orders" className={getLinkClass("/admin/orders")} onClick={closeMobileMenu}>
            <ShoppingBag size={18} />
            Orders
          </Link>

          <Link to="/admin/suppliers" className={getLinkClass("/admin/suppliers")} onClick={closeMobileMenu}>
            <Truck size={18} />
            Suppliers
          </Link>

          <Link to="/admin/products" className={getLinkClass("/admin/products")} onClick={closeMobileMenu}>
            <Package size={18} />
            Products
          </Link>

          <Link to="/admin/payments" className={getLinkClass("/admin/payments")} onClick={closeMobileMenu}>
            <DollarSign size={18} />
            Payments
          </Link>

          <Link to="/admin/payment-methods" className={getLinkClass("/admin/payment-methods")} onClick={closeMobileMenu}>
            <CreditCard size={18} />
            Payment Methods
          </Link>

          <Link to="/admin/users" className={getLinkClass("/admin/users")} onClick={closeMobileMenu}>
            <Users size={18} />
            Users
          </Link>

          <Link to="/admin/teams" className={getLinkClass("/admin/teams")} onClick={closeMobileMenu}>
            <Trophy size={18} />
            Teams
          </Link>

          <Link to="/admin/players" className={getLinkClass("/admin/players")} onClick={closeMobileMenu}>
            <Users2 size={18} />
            Players
          </Link>

          <Link to="/admin/employees" className={getLinkClass("/admin/employees")} onClick={closeMobileMenu}>
            <UserCheck size={18} />
            Employees
          </Link>

          <Link to="/admin/contracts" className={getLinkClass("/admin/contracts")} onClick={closeMobileMenu}>
            <ContractIcon size={18} />
            Contracts
          </Link>

          <Link to="/admin/lecturers" className={getLinkClass("/admin/lecturers")} onClick={closeMobileMenu}>
            <GraduationCap size={18} />
            Lecturers
          </Link>

          <Link to="/admin/lectures" className={getLinkClass("/admin/lectures")} onClick={closeMobileMenu}>
            <BookOpen size={18} />
            Lectures
          </Link>

          {/* Students & Courses Management - Updated */}
          <Link to="/admin/students" className={getLinkClass("/admin/students")} onClick={closeMobileMenu}>
            <User size={18} />
            Students
          </Link>

          <Link to="/admin/courses" className={getLinkClass("/admin/courses")} onClick={closeMobileMenu}>
            <Book size={18} />
            Courses
          </Link>

          {/* Doctors & Appointments Management */}
          <Link to="/admin/doctors" className={getLinkClass("/admin/doctors")} onClick={closeMobileMenu}>
            <Stethoscope size={18} />
            Doctors
          </Link>

          <Link to="/admin/appointments" className={getLinkClass("/admin/appointments")} onClick={closeMobileMenu}>
            <Calendar size={18} />
            Appointments
          </Link>

          {/* Movies & Actors Management */}
          <Link to="/admin/movies" className={getLinkClass("/admin/movies")} onClick={closeMobileMenu}>
            <Film size={18} />
            Movies
          </Link>

          <Link to="/admin/actors" className={getLinkClass("/admin/actors")} onClick={closeMobileMenu}>
            <UsersIcon size={18} />
            Actors
          </Link>

          {/* Teachers & Subjects Management */}
          <Link to="/admin/teachers" className={getLinkClass("/admin/teachers")} onClick={closeMobileMenu}>
            <TeacherIcon size={18} />
            Teachers
          </Link>

          <Link to="/admin/subjects" className={getLinkClass("/admin/subjects")} onClick={closeMobileMenu}>
            <SubjectIcon size={18} />
            Subjects
          </Link>

          {/* Stores & Products Management */}
          <Link to="/admin/stores" className={getLinkClass("/admin/stores")} onClick={closeMobileMenu}>
            <Store size={18} />
            Stores
          </Link>

          <Link to="/admin/store-products" className={getLinkClass("/admin/store-products")} onClick={closeMobileMenu}>
            <PackageIcon size={18} />
            Store Products
          </Link>

          {/* Flights & Passengers Management */}
          <Link to="/admin/flights" className={getLinkClass("/admin/flights")} onClick={closeMobileMenu}>
            <Plane size={18} />
            Flights
          </Link>

          <Link to="/admin/passengers" className={getLinkClass("/admin/passengers")} onClick={closeMobileMenu}>
            <PassengerIcon size={18} />
            Passengers
          </Link>

          <Link to="/admin/reference-data" className={getLinkClass("/admin/reference-data")} onClick={closeMobileMenu}>
            <Database size={18} />
            Reference Data
          </Link>

          <Link to="/admin/settings" className={getLinkClass("/admin/settings")} onClick={closeMobileMenu}>
            <Settings size={18} />
            Settings
          </Link>
          
          <div className="pt-4">
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
