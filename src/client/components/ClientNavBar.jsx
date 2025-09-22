import Shneta from "../assets/images/Shneta.png";
import { Home, Package, ShoppingCart, User, CreditCard, TrendingUp, Wallet, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";

export default function ClientNavBar() {
  const location = useLocation(); // merr path-in aktual
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "flex items-center gap-2 text-green-500 font-semibold transition-colors duration-200"
      : "flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors duration-200";
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
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
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
        fixed lg:static top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:block'}
      `}>
        {/* Logo */}
        <div className="p-4 flex flex-col items-center">
          <img src={Shneta} alt="Shneta-logo" className="w-32 mb-2" />
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className={`${getLinkClass("/dashboard")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <Home size={18} />
            Dashboard
          </Link>

          <Link to="/products" className={`${getLinkClass("/products")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <Package size={18} />
            Products
          </Link>

          <Link to="/cart" className={`${getLinkClass("/cart")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <ShoppingCart size={18} />
            Cart
          </Link>

          <Link to="/payments" className={`${getLinkClass("/payments")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <CreditCard size={18} />
            Payments
          </Link>

          <Link to="/payment-methods" className={`${getLinkClass("/payment-methods")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <Wallet size={18} />
            Payment Methods
          </Link>

          <Link to="/profile" className={`${getLinkClass("/profile")} px-3 py-2 rounded-lg`} onClick={closeMobileMenu}>
            <User size={18} />
            Profile
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