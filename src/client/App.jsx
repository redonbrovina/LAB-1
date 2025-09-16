import './App.css';
import Layout from './components/layout/Layout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import AdminProtectedLayout from './components/layout/AdminProtectedLayout';
import PublicRoute from './utils/PublicRoute';
import ClientOnlyRoute from './utils/ClientOnlyRoute';
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupSuccess from './pages/SignupSuccess';
import Payments from "./pages/Payments";
import StockMovement from "./pages/StockMovement";
import PaymentMethods from "./pages/PaymentMethods";
import { AuthProvider } from './utils/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={
            <PublicRoute>
              <Layout />
            </PublicRoute>
          }>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
          </Route>

          {/* Auth Pages - Only accessible when not logged in */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />
          <Route path="/signup-success" element={
            <PublicRoute>
              <SignupSuccess />
            </PublicRoute>
          } />
          <Route path="/admin-login" element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          } />
          
          {/* Client Only Pages*/}
          <Route path="/" element={
            <ClientOnlyRoute>
              <ProtectedLayout />
            </ClientOnlyRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/stock-movement" element={<StockMovement />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
          </Route>

          {/* Admin Only Pages*/}
          <Route path="/" element={<AdminProtectedLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}