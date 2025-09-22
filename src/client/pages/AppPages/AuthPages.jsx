import { useLocation } from 'react-router-dom';

// Import all auth pages
import Login from '../Login';
import Signup from '../Signup';
import SignupSuccess from '../SignupSuccess';
import AdminLogin from '../AdminLogin';

const AuthPages = () => {
  const location = useLocation();
  
  // Route to the appropriate component based on current path
  switch (location.pathname) {
    case '/login':
      return <Login />;
    case '/signup':
      return <Signup />;
    case '/signup-success':
      return <SignupSuccess />;
    case '/admin-login':
      return <AdminLogin />;
    default:
      return <Login />;
  }
};

export default AuthPages;
