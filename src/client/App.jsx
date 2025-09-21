import './App.css';
import { lazy, Suspense } from 'react';
import { AuthProvider } from './utils/AuthContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from './utils/PublicRoute';
import ClientOnlyRoute from './utils/ClientOnlyRoute';
import ErrorBoundary from './components/ErrorBoundary';

const Layout = lazy(() => import('./components/layout/Layout'));
const ProtectedLayout = lazy(() => import('./components/layout/ProtectedLayout'));
const AdminProtectedLayout = lazy(() => import('./components/layout/AdminProtectedLayout'));

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminPayments = lazy(() => import("./pages/AdminPayments"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const SignupSuccess = lazy(() => import('./pages/SignupSuccess'));
const Payments = lazy(() => import("./pages/Payments"));
const StockMovement = lazy(() => import("./pages/StockMovement"));
const PaymentMethods = lazy(() => import("./pages/PaymentMethods"));
const Applications = lazy(() => import("./pages/Applications"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const Orders = lazy(() => import("./components/Orders"));
const SuppliersAdmin = lazy(() => import("./components/SuppliersAdmin"));
const ProductsAdmin = lazy(() => import("./components/ProductsAdmin"));
const AdminCreateClient = lazy(() => import("./pages/AdminCreateClient"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    Loading...
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
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

            {/* Admin Only Pages - aligned with AdminNavbar links */}
            <Route path="/admin" element={<AdminProtectedLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="applications" element={<Applications />} />
              <Route path="orders" element={<Orders />} />
              <Route path="suppliers" element={<SuppliersAdmin />} />
              <Route path="products" element={<ProductsAdmin />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/create" element={<AdminCreateClient />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* If a route is not found, show the NotFound page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </ErrorBoundary>
  )
}