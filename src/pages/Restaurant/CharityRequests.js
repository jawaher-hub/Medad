import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CharityRequests.css';

const initialRequests = [
  { id: 1, charity: 'Aamal Foundation', food: 'Pizza', quantity: 20, pickup: '2026-04-08', distance: '2.3 km', status: 'Pending' },
  { id: 2, charity: 'Al Noor Charity', food: 'Fresh Salads', quantity: 15, pickup: '2026-04-09', distance: '1.8 km', status: 'Pending' },
  { id: 3, charity: 'Mercy Kitchen', food: 'Lasagna', quantity: 10, pickup: '2026-04-07', distance: '3.1 km', status: 'Accepted' },
];

function CharityRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (id) => {
    setRequests(requests.map(r => r.id === id ? {...r, status: 'Accepted'} : r));
  };

  const handleReject = (id) => {
    setRequests(requests.map(r => r.id === id ? {...r, status: 'Rejected'} : r));
  };

  const pending = requests.filter(r => r.status === 'Pending');
  const others = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="requests-container">
      <div className="requests-header">
        <button className="back-btn" onClick={() => navigate('/restaurant/dashboard')}>← Back</button>
        <h1>Charity Requests</h1>
        <p>{pending.length} Pending Requests</p>
      </div>

      {pending.length > 0 && (
        <div className="section">
          <h2>⏳ Pending</h2>
          {pending.map(req => (
            <div key={req.id} className="request-card pending">
              <div className="request-info">
                <h3>{req.charity}</h3>
                <p>🍱 Requesting: {req.food} - {req.quantity} units</p>
                <p>📅 Pickup: {req.pickup}</p>
                <p>📍 {req.distance} away</p>
              </div>
              <div className="request-actions">
                <button className="accept-btn" onClick={() => handleAccept(req.id)}>✓ Accept</button>
                <button className="reject-btn" onClick={() => handleReject(req.id)}>✗ Decline</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <div className="section">
          <h2>📋 Previous</h2>
          {others.map(req => (
            <div key={req.id} className={`request-card ${req.status === 'Accepted' ? 'accepted' : 'rejected'}`}>
              <div className="request-info">
                <h3>{req.charity}</h3>
                <p>🍱 {req.food} - {req.quantity} units</p>
                <p>📅 Pickup: {req.pickup}</p>
              </div>
              <div>
                <span className={`badge ${req.status === 'Accepted' ? 'badge-green' : 'badge-red'}`}>
                  {req.status === 'Accepted' ? '✓ Accepted' : '✗ Declined'}
                </span>
                {req.status === 'Accepted' && (
                  <button className="confirm-btn" onClick={() => navigate('/restaurant/pickup-confirm')}>
                    Confirm Pickup
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CharityRequests;