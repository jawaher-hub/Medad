import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/charity/MyRequests.css';
import { getCharityRequests } from '../../services/api';

const MyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getCharityRequests();
        const normalised = data.map(r => ({
          id: r._id || r.id,
          status: r.status || 'requested',
          donation: {
            title: r.listingId?.title || 'Unknown Item',
            restaurantName: r.listingId?.restaurantId?.name || 'Restaurant',
            quantity: r.listingId?.quantity || 0,
            distance: '2.4 km',
          }
        }));
        setRequests(normalised);
      } catch (error) {
        console.error("Error fetching requests", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'requested': case 'pending': return <span className="status-badge requested">📋 Requested</span>;
      case 'approved': return <span className="status-badge assigned">✅ Approved</span>;
      case 'completed': return <span className="status-badge completed">📦 Delivered</span>;
      case 'rejected': return <span className="status-badge requested">❌ Rejected</span>;
      default: return <span className="status-badge requested">{status}</span>;
    }
  };

  if (loading) return <div className="my-requests-container"><p>Loading your requests...</p></div>;

  return (
    <div className="my-requests-container">
      <div className="my-requests-header">
        <h1>My Donation Requests</h1>
        <p>Track and manage your requests</p>
      </div>
      <div className="requests-list">
        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          requests.map(request => (
            <div key={request.id} className="request-item">
              <div className="request-info">
                <h3>{request.donation.title}</h3>
                <p className="restaurant-name">{request.donation.restaurantName}</p>
                <p className="request-details">📦 {request.donation.quantity} units</p>
                {getStatusBadge(request.status)}
              </div>
              <div className="request-actions">
                {request.status === 'approved' && (
                  <button className="action-btn confirm-btn" onClick={() => navigate(`/confirm/${request.id}`)}>Confirm Delivery</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRequests;