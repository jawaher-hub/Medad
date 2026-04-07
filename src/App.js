import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
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
        </Routes>
      </div>
    </Router>
  );
}
export default App;