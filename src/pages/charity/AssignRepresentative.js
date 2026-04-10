import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveAssignedRepresentative, getAssignedRepresentative } from '../../utils/localStorageHelpers';
import { mockDonations } from '../../data/mockDonations';
import '../../styles/charity/AssignRepresentative.css';

const AssignRepresentative = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [formData, setFormData] = useState({
    repName: '',
    repPhone: '',
    pickupTime: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setDonation(mockDonations[0]);
    const saved = getAssignedRepresentative(requestId);
    if (saved) {
      setFormData(saved);
    }
  }, [requestId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!formData.repName.trim()) return "Representative name is required";
    if (!formData.repPhone.trim()) return "Phone number is required";
    if (!formData.pickupTime) return "Pickup time is required";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      saveAssignedRepresentative(requestId, formData);
      setIsSubmitting(false);
      navigate(`/confirm/${requestId}`);
    }, 500);
  };

  if (!donation) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Assign Pickup Representative</h2>
        <p>Assign someone to pick up this donation</p>

        {error && <div className="error-banner">{error}</div>}

        <div className="info-box">
          <p><strong>📦 Donation:</strong> {donation.title}</p>
          <p><strong>🏪 Restaurant:</strong> {donation.restaurantName}</p>
          <p><strong>📍 Address:</strong> {donation.restaurantAddress}</p>
          <p><strong>⏰ Pickup by:</strong> {new Date(donation.expiryDate).toLocaleString('en-US')}</p>
        </div>

        <div className="input-group">
          <label>Representative Full Name *</label>
          <input
            type="text"
            name="repName"
            value={formData.repName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="input-group">
          <label>Phone Number *</label>
          <input
            type="tel"
            name="repPhone"
            value={formData.repPhone}
            onChange={handleChange}
            placeholder="05xxxxxxxx"
          />
        </div>

        <div className="input-group">
          <label>Scheduled Pickup Time * (Format: YYYY-MM-DD HH:MM)</label>
          <input
            type="datetime-local"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Additional Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Vehicle details or special instructions..."
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Confirm Assignment'}
        </button>
      </form>
    </div>
  );
};

export default AssignRepresentative;