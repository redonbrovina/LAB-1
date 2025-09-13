import Shneta from "../assets/images/Shneta.png";
import { Home, Package, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function ClientNavBar() {
  const location = useLocation(); // merr path-in aktual

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "flex items-center gap-2 text-green-500 font-semibold transition-colors duration-200"
      : "flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors duration-200";
  };

  return (
    <div className="h-screen w-56 bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="p-4 flex flex-col items-center">
        <img src={Shneta} alt="Shneta-logo" className="w-32 mb-2" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          <Home size={18} />
          Dashboard
        </Link>

        <Link to="/products" className={getLinkClass("/products")}>
          <Package size={18} />
          Products
        </Link>

        <Link to="/cart" className={getLinkClass("/cart")}>
          <ShoppingCart size={18} />
          Cart
        </Link>

        <Link to="/profile" className={getLinkClass("/profile")}>
          <User size={18} />
          Profile
        </Link>
      </nav>
    </div>
  );
}