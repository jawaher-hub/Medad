import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
<<<<<<< HEAD
import MainWelcome from './pages/MainWelcome';
import RegisterRole from './pages/RegisterRole';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterCharity from './pages/RegisterCharity';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/Administrator/AdminDashboard';
import PendingApprovals from './pages/Administrator/PendingApprovals';
import SafetyMonitor from './pages/Administrator/SafetyMonitor';
import UserManagement from './pages/Administrator/UserManagement';
import AdminSettings from './pages/Administrator/AdminSettings';
=======
import MainWelcome from './pages/Home/MainWelcome';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import RegisterRole from './pages/Auth/RegisterRole';
import RegisterRestaurant from './pages/Registration/RegisterRestaurant';
import RegisterCharity from './pages/Registration/RegisterCharity';

// Importing Restaurant Dashboard and related pages _ Done By Fatimah Alaamer
import RestaurantDashboard from './pages/Restaurant/RestaurantDashboard';
import AddFoodListing from './pages/Restaurant/AddFoodListing';
import MyListings from './pages/Restaurant/MyListings';
import CharityRequests from './pages/Restaurant/CharityRequests';
import PickupConfirmation from './pages/Restaurant/PickupConfirmation';
>>>>>>> 648d4062996b7d8db2bc7ad3c6d9a9b375c69b54


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          
          <Route path="/" element={<MainWelcome />} />
          
          
          <Route path="/register-role" element={<RegisterRole />} />
          
          


          <Route path="/register-restaurant" element={<RegisterRestaurant />} />
        

          <Route path="/register-charity" element={<RegisterCharity />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/pending-approvals" element={<PendingApprovals />} />
          <Route path="/admin/safety-monitor" element={<SafetyMonitor />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          // Restaurant Routes _ Done By Fatimah Alaamer
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/add-food" element={<AddFoodListing />} />
          <Route path="/restaurant/my-listings" element={<MyListings />} />
          <Route path="/restaurant/requests" element={<CharityRequests />} />
          <Route path="/restaurant/pickup-confirm" element={<PickupConfirmation />} />
        
        </Routes>
      </div>
    </Router>
  );
}
export default App;