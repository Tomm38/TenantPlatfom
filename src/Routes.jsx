import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import TenantLogin from './pages/tenant-login';
import AdminLogin from './pages/admin-login';
import LandlordRegistration from './pages/landlord-registration';
import LandlordLogin from './pages/landlord-login';
import LandlordProfile from './pages/landlord-profile';
import TenantInvitation from './pages/tenant-invitation';
import LandlordDashboard from './pages/landlord-dashboard';
import BuildingManagement from './pages/building-management';
import UnitManagement from './pages/unit-management';
import TenantDashboard from './pages/tenant-dashboard';
import PaymentProcessing from './pages/payment-processing';
import AdminDashboard from './pages/admin-dashboard';
import Messages from './pages/messages';
import NotificationsPage from './pages/notifications';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandlordRegistration />} />
        <Route path="/tenant-login" element={<TenantLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/landlord-registration" element={<LandlordRegistration />} />
        <Route path="/landlord-login" element={<LandlordLogin />} />
        <Route path="/tenant-invitation" element={<TenantInvitation />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
        <Route path="/building-management" element={<BuildingManagement />} />
        <Route path="/unit-management" element={<UnitManagement />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/payment-processing" element={<PaymentProcessing />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<LandlordProfile />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
