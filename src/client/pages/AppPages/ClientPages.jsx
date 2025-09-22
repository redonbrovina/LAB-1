import { useLocation } from 'react-router-dom';

// Import all client pages
import Dashboard from '../Dashboard';
import Products from '../Products';
import Cart from '../Cart';
import Profile from '../Profile';
import Payments from '../Payments';
import PaymentMethods from '../PaymentMethods';

const ClientPages = () => {
  const location = useLocation();
  
  // Route to the appropriate component based on current path
  switch (location.pathname) {
    case '/dashboard':
      return <Dashboard />;
    case '/products':
      return <Products />;
    case '/cart':
      return <Cart />;
    case '/profile':
      return <Profile />;
    case '/payments':
      return <Payments />;
    case '/payment-methods':
      return <PaymentMethods />;
    default:
      return <Dashboard />;
  }
};

export default ClientPages;
