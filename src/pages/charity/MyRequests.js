import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequestedDonations, getAssignedRepresentative, getDeliveryConfirmation } from '../../utils/localStorageHelpers';
import { mockDonations } from '../../data/mockDonations';
import '../../styles/charity/MyRequests.css';

const MyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const requestedIds = getRequestedDonations();
    const requestsList = requestedIds.map(id => {
      const donation = mockDonations.find(d => d.id === id);
      const assignedRep = getAssignedRepresentative(id);
      const delivery = getDeliveryConfirmation(id);
      
      return {
        id,
        donation,
        assignedRep,
        delivery,
        status: delivery ? 'completed' : (assignedRep ? 'assigned' : 'requested')
      };
    }).filter(req => req.donation);
    
    setRequests(requestsList);
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'requested':
        return <span className="status-badge requested">📋 Requested</span>;
      case 'assigned':
        return <span className="status-badge assigned">👤 Representative Assigned</span>;
      case 'completed':
        return <span className="status-badge completed">✅ Delivery Completed</span>;
      default:
        return null;
    }
  };

  const getActionButton = (request) => {
    if (request.status === 'completed') {
      return (
        <button 
          className="action-btn rating-btn"
          onClick={() => navigate(`/rating/${request.id}`)}
        >
          ⭐ View Rating
        </button>
      );
    }
    
    if (request.status === 'assigned') {
      return (
        <button 
          className="action-btn confirm-btn"
          onClick={() => navigate(`/confirm/${request.id}`)}
        >
          🚚 Confirm Delivery
        </button>
      );
    }
    
    return (
      <button 
        className="action-btn assign-btn"
        onClick={() => navigate(`/assign/${request.id}`)}
      >
        📋 Assign Representative
      </button>
    );
  };

  if (requests.length === 0) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <h2>My Requests</h2>
          <p>You haven't requested any donations yet.</p>
          <button onClick={() => navigate('/browse')} className="submit-btn" style={{ marginTop: '20px' }}>
            Browse Donations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-requests-container">
      <div className="my-requests-header">
        <h1>My Donation Requests</h1>
        <p>Track and manage your donation requests</p>
      </div>

      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className="request-item">
            <div className="request-info">
              <h3>{request.donation?.title}</h3>
              <p className="restaurant-name">{request.donation?.restaurantName}</p>
              <p className="request-details">
                📦 {request.donation?.quantity} | 📍 {request.donation?.distance}
              </p>
              {getStatusBadge(request.status)}
            </div>
            <div className="request-actions">
              {getActionButton(request)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRequests;