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

const PublicPages = lazy(() => import('./pages/AppPages/PublicPages'));

// Auth pages - bundle together
const AuthPages = lazy(() => import('./pages/AppPages/AuthPages'));

const ClientPages = lazy(() => import('./pages/AppPages/ClientPages'));

const AdminPages = lazy(() => import('./pages/AppPages/AdminPages'));

const PlanetSatellite = lazy(() => import('./pages/PlanetSatellite'));
const TeamPlayer = lazy(() => import('./pages/TeamPlayer'));
const EmployeeContract = lazy(() => import('./pages/EmployeeContract'));

const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced loading component with better UX
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666',
    backgroundColor: 'white'
  }}>
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
    <div>Loading...</div>
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
                <Route index element={<PublicPages />} />
                <Route path="about" element={<PublicPages />} />
                <Route path="services" element={<PublicPages />} />
              </Route>

            {/* Auth Pages - Only accessible when not logged in */}
            <Route path="/login" element={
              <PublicRoute>
                <AuthPages />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <AuthPages />
              </PublicRoute>
            } />
            <Route path="/signup-success" element={
              <PublicRoute>
                <AuthPages />
              </PublicRoute>
            } />
            <Route path="/admin-login" element={
              <PublicRoute>
                <AuthPages />
              </PublicRoute>
            } />
            
            {/* Client Only Pages*/}
            <Route path="/" element={
              <ClientOnlyRoute>
                <ProtectedLayout />
              </ClientOnlyRoute>
            }>
              <Route path="dashboard" element={<ClientPages />} />
              <Route path="products" element={<ClientPages />} />
              <Route path="cart" element={<ClientPages />} />
              <Route path="profile" element={<ClientPages />} />
              <Route path="/payments" element={<ClientPages />} />
              <Route path="/payment-methods" element={<ClientPages />} />
            </Route>

            {/* Admin Only Pages - aligned with AdminNavbar links */}
            <Route path="/admin" element={<AdminProtectedLayout />}>
              <Route index element={<AdminPages />} />
              <Route path="payments" element={<AdminPages />} />
              <Route path="payment-methods" element={<AdminPages />} />
              <Route path="applications" element={<AdminPages />} />
              <Route path="orders" element={<AdminPages />} />
              <Route path="suppliers" element={<AdminPages />} />
              <Route path="products" element={<AdminPages />} />
              <Route path="users" element={<AdminPages />} />
              <Route path="users/create" element={<AdminPages />} />
              <Route path="settings" element={<AdminPages />} />
              <Route path="reference-data" element={<AdminPages />} />
            </Route>

            {/* Planet & Satellite Page */}
            <Route path="/planet-satellite" element={<PlanetSatellite />} />

            {/* Team & Player Page */}
            <Route path="/team-player" element={<TeamPlayer />} />

            {/* Employee & Contract Page */}
            <Route path="/employee-contract" element={<EmployeeContract />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  </ErrorBoundary>
  )
}