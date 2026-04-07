import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
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