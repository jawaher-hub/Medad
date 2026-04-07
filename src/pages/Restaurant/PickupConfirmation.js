import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickupConfirmation.css';

function PickupConfirmation() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [checked, setChecked] = useState({ identity: false, quantity: false, condition: false });

  const allChecked = Object.values(checked).every(v => v === true);

  const handleConfirm = () => {
    if (allChecked) setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="success-container">
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h2>Pickup Confirmed!</h2>
          <p>Donation has been saved to your history.</p>
          <button onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pickup-container">
      <div className="pickup-header">
        <button className="back-btn" onClick={() => navigate('/requests')}>← Back</button>
        <h1>Pickup Confirmation</h1>
        <p>Confirm successful food collection</p>
      </div>

      <div className="order-details">
        <h2>Order Details</h2>
        <div className="detail-row">
          <span>Food Item:</span>
          <strong>Pizza</strong>
        </div>
        <div className="detail-row">
          <span>Quantity:</span>
          <strong>20 units</strong>
        </div>
        <div className="detail-row">
          <span>Pickup Date:</span>
          <strong>2026-04-08</strong>
        </div>
        <div className="detail-row">
          <span>Charity:</span>
          <strong>Aamal Foundation</strong>
        </div>
      </div>

      <div className="driver-details">
        <h2>Driver Information</h2>
        <div className="driver-card">
          <div className="driver-avatar">👤</div>
          <div>
            <h3>Ahmed Hassan</h3>
            <p>Representative - Aamal Foundation</p>
            <p>📞 +966 50 123 4567</p>
            <p>📍 2.3 km away</p>
          </div>
        </div>
      </div>

      <div className="checklist">
        <h2>✅ Handover Checklist</h2>
        <label className="check-item">
          <input
            type="checkbox"
            checked={checked.identity}
            onChange={() => setChecked({...checked, identity: !checked.identity})}
          />
          Verify driver identity
        </label>
        <label className="check-item">
          <input
            type="checkbox"
            checked={checked.quantity}
            onChange={() => setChecked({...checked, quantity: !checked.quantity})}
          />
          Check quantity matches
        </label>
        <label className="check-item">
          <input
            type="checkbox"
            checked={checked.condition}
            onChange={() => setChecked({...checked, condition: !checked.condition})}
          />
          Confirm food condition is good
        </label>
      </div>

      <button
        className={`confirm-btn ${!allChecked ? 'disabled' : ''}`}
        onClick={handleConfirm}
        disabled={!allChecked}
      >
        Confirm Pickup
      </button>
    </div>
  );
}

export default PickupConfirmation;