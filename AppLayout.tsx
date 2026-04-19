import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { useAuth } from './context/AuthContext';
// Lazy load pages (simulated with standard imports for now to ensure they work in this environment)
import { Home } from './pages/Home';
import { BrowseTrips } from './pages/BrowseTrips';
import { TripDetail } from './pages/TripDetail';
import { Auth } from './pages/Auth';
import { Bookings } from './pages/Bookings';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/admin/AdminDashboard';
// Protected Route Wrapper
const ProtectedRoute = ({ children }: {children: React.ReactNode;}) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};
// Admin Route Wrapper
const AdminRoute = ({ children }: {children: React.ReactNode;}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};
export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="trips" element={<BrowseTrips />} />
        <Route path="trips/:id" element={<TripDetail />} />
        <Route path="auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="bookings"
          element={
          <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          } />
        
        <Route
          path="profile"
          element={
          <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        
      </Route>

      {/* Admin Routes (could have a different layout) */}
      <Route
        path="/admin"
        element={
        <AdminRoute>
            <AppLayout />
          </AdminRoute>
        }>
        
        <Route index element={<AdminDashboard />} />
        {/* Other admin routes would go here */}
      </Route>
    </Routes>);

}