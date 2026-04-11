import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantDashboard.css';

function RestaurantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, Restaurant 👋</h1>
        <p>Manage your food donations</p>
      </div>

      <div className="stats-cards">
        <div className="card">
          <h3>2</h3>
          <p>Active Listings</p>
        </div>
        <div className="card">
          <h3>3</h3>
          <p>Total Donations</p>
        </div>
        <div className="card">
          <h3>1</h3>
          <p>Pending Requests</p>
        </div>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate('/restaurant/add-food')}>+ Add Food</button>
        <button onClick={() => navigate('/restaurant/my-listings')}>My Listings</button>
        <button onClick={() => navigate('/restaurant/requests')}>Charity Requests</button>
      </div>
    </div>
  );
}

export default RestaurantDashboard;