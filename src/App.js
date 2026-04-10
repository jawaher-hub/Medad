import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Settings from './pages/Auth/Settings';
import MainWelcome from './pages/Home/MainWelcome';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import RegisterRole from './pages/Auth/RegisterRole';
import RegisterRestaurant from './pages/Registration/RegisterRestaurant';
import RegisterCharity from './pages/Registration/RegisterCharity';

import AdminDashboard from './pages/Administrator/AdminDashboard';
import PendingApprovals from './pages/Administrator/PendingApprovals';
import SafetyMonitor from './pages/Administrator/SafetyMonitor';
import UserManagement from './pages/Administrator/UserManagement';
import AdminSettings from './pages/Administrator/AdminSettings';

import RestaurantDashboard from './pages/Restaurant/RestaurantDashboard';
import AddFoodListing from './pages/Restaurant/AddFoodListing';
import MyListings from './pages/Restaurant/MyListings';
import CharityRequests from './pages/Restaurant/CharityRequests';
import PickupConfirmation from './pages/Restaurant/PickupConfirmation';

// Charity pages
import BrowseFeed from './pages/charity/BrowseFeed';
import DonationDetail from './pages/charity/DonationDetail';
import AssignRepresentative from './pages/charity/AssignRepresentative';
import ConfirmDelivery from './pages/charity/ConfirmDelivery';
import RatingFeedback from './pages/charity/RatingFeedback';
function App() {
  return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainWelcome />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register-role" element={<RegisterRole />} />
            <Route path="/register-restaurant" element={<RegisterRestaurant />} />
            <Route path="/register-charity" element={<RegisterCharity />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
            <Route path="/admin/safety-monitor" element={<SafetyMonitor />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
            <Route path="/restaurant/add-food" element={<AddFoodListing />} />
            <Route path="/restaurant/my-listings" element={<MyListings />} />
            <Route path="/restaurant/requests" element={<CharityRequests />} />
            <Route path="/restaurant/pickup-confirm" element={<PickupConfirmation />} />

             {/* Charity routes*/}
            <Route path="/browse" element={<BrowseFeed />} />
            <Route path="/donation/:id" element={<DonationDetail />} />
            <Route path="/assign/:requestId" element={<AssignRepresentative />} />
            <Route path="/confirm/:requestId" element={<ConfirmDelivery />} />
            <Route path="/rating/:deliveryId" element={<RatingFeedback />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;