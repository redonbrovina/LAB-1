import { useLocation } from 'react-router-dom';

// Import all public pages
import Home from '../Home';
import About from '../About';
import Services from '../Services';

const PublicPages = () => {
  const location = useLocation();
  
  // Route to the appropriate component based on current path
  switch (location.pathname) {
    case '/':
      return <Home />;
    case '/about':
      return <About />;
    case '/services':
      return <Services />;
    default:
      return <Home />;
  }
};

export default PublicPages;
