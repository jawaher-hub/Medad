import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestaurantDashboard.css';
import { getMyListings, getRestaurantRequests } from '../../services/api';

function RestaurantDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    active: 0,
    total: 0,
    pending: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [listings, requests] = await Promise.all([
          getMyListings(),
          getRestaurantRequests()
        ]);

        setStats({
          active: listings.filter(l => l.status === 'Active').length,
          total: listings.length,
          pending: requests.filter(r => r.status === 'requested' || r.status === 'pending').length
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, Restaurant 👋</h1>
        <p>Manage your food donations</p>
      </div>

      <div className="stats-cards">
        <div className="card">
          <h3>{stats.active}</h3>
          <p>Active Listings</p>
        </div>
        <div className="card">
          <h3>{stats.total}</h3>
          <p>Total Donations</p>
        </div>
        <div className="card">
          <h3>{stats.pending}</h3>
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