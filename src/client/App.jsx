import './App.css';
import Layout from './components/layout/Layout';
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupSuccess from './pages/SignupSuccess';
import Payments from "./pages/Payments";
import StockMovement from "./pages/StockMovement";
import PaymentMethods from "./pages/PaymentMethods";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
        </Route>

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-success" element={<SignupSuccess />} />

        {/* Dashboard + Client Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />       {/* Shto Cart */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/stock-movement" element={<StockMovement />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/profile" element={<Profile />} /> {/* Shto Profile */}
      </Routes>
    </BrowserRouter>
  )
}