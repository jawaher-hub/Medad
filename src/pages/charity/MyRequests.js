import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRequestedDonations, getAssignedRepresentative, getDeliveryConfirmation } from '../../utils/localStorageHelpers';
import { mockDonations } from '../../data/mockDonations';
import '../../styles/charity/MyRequests.css';
import { getCharityRequests } from '../../services/api';

const MyRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // ── Try to get requests from the real API ──────────
        const data = await getCharityRequests();
        const normalised = data.map(r => ({
          id:       r._id || r.id,
          status:   r.status || 'requested',
          donation: {
            title:          r.listingTitle  || r.title,
            restaurantName: r.restaurantName || '—',
            quantity:       r.quantity,
            distance:       r.distance || '—',
          },
          assignedRep: r.assignedRep  || null,
          delivery:    r.delivery     || null,
        }));
        setRequests(normalised);
      } catch {
        // ── Fallback: rebuild from localStorage + mock data ─
        const requestedIds = getRequestedDonations();
        const list = requestedIds.map(id => {
          const donation    = mockDonations.find(d => d.id === id);
          const assignedRep = getAssignedRepresentative(id);
          const delivery    = getDeliveryConfirmation(id);
          return {
            id, donation, assignedRep, delivery,
            status: delivery ? 'completed' : (assignedRep ? 'assigned' : 'requested'),
          };
        }).filter(r => r.donation);
        setRequests(list);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'requested': return <span className="status-badge requested">📋 Requested</span>;
      case 'assigned':  return <span className="status-badge assigned">👤 Representative Assigned</span>;
      case 'completed': return <span className="status-badge completed">✅ Delivery Completed</span>;
      case 'approved':  return <span className="status-badge assigned">✓ Approved by Restaurant</span>;
      case 'rejected':  return <span className="status-badge requested">✗ Declined</span>;
      default:          return null;
    }
  };

  const getActionButton = (request) => {
    if (request.status === 'completed') {
      return <button className="action-btn rating-btn" onClick={() => navigate(`/rating/${request.id}`)}>⭐ View Rating</button>;
    }
    if (request.status === 'assigned' || request.status === 'approved') {
      return <button className="action-btn confirm-btn" onClick={() => navigate(`/confirm/${request.id}`)}>🚚 Confirm Delivery</button>;
    }
    return <button className="action-btn assign-btn" onClick={() => navigate(`/assign/${request.id}`)}>📋 Assign Representative</button>;
  };

  if (loading) return <div className="form-container"><div className="auth-form" style={{textAlign:'center'}}><p>Loading your requests…</p></div></div>;

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