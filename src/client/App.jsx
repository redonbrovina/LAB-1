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
import AdminPayments from "./pages/AdminPayments";
import AdminPaymentMethods from "./pages/AdminPaymentMethods";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SignupSuccess from './pages/SignupSuccess';
import Payments from "./pages/Payments";
import PaymentMethods from "./pages/PaymentMethods";
import Applications from "./pages/Applications";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import Orders from "./components/Orders";
import SuppliersAdmin from "./components/SuppliersAdmin";
import ProductsAdmin from "./components/ProductsAdmin";
import { AuthProvider } from './utils/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminCreateClient from "./pages/AdminCreateClient";

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
            <Route path="/payment-methods" element={<PaymentMethods />} />
          </Route>

          {/* Admin Only Pages - aligned with AdminNavbar links */}
          <Route path="/admin" element={<AdminProtectedLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="payment-methods" element={<AdminPaymentMethods />} />
            <Route path="applications" element={<Applications />} />
            <Route path="orders" element={<Orders />} />
            <Route path="suppliers" element={<SuppliersAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/create" element={<AdminCreateClient />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}