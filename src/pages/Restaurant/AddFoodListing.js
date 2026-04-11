import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddFoodListing.css';

function AddFoodListing() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    foodName: '', category: '', quantity: '', expirationDate: '', photo: null
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.foodName) newErrors.foodName = 'Food name is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.quantity || form.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!form.expirationDate) newErrors.expirationDate = 'Expiration date is required';
    else if (new Date(form.expirationDate) <= new Date()) newErrors.expirationDate = 'Date must be in the future';
    if (!form.photo) newErrors.photo = 'Photo is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <div className="success-box">
          <h2>✅ Listing Submitted!</h2>
          <p>Your food listing is pending approval.</p>
          <button onClick={() => navigate('/restaurant/dashboard')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-food-container">
      <div className="add-food-header">
        <button className="back-btn" onClick={() => navigate('/restaurant/dashboard')}>← Back</button>
        <h1>Add Surplus Food</h1>
        <p>Post food donation details</p>
      </div>

      <div className="add-food-form">
        <div className="form-group">
          <label>Food Name *</label>
          <input
            type="text"
            placeholder="e.g. Rice, Shawarma..."
            value={form.foodName}
            onChange={e => setForm({...form, foodName: e.target.value})}
          />
          {errors.foodName && <span className="error">{errors.foodName}</span>}
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="">Select category</option>
            <option value="meals">Meals</option>
            <option value="bakery">Bakery</option>
            <option value="vegetables">Vegetables</option>
            <option value="drinks">Drinks</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Quantity *</label>
          <input
            type="number"
            placeholder="Number of portions"
            value={form.quantity}
            onChange={e => setForm({...form, quantity: e.target.value})}
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label>Expiration Date *</label>
          <input
            type="datetime-local"
            value={form.expirationDate}
            onChange={e => setForm({...form, expirationDate: e.target.value})}
          />
          {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
        </div>

        <div className="form-group">
          <label>Upload Photo *</label>
          <input
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={e => setForm({...form, photo: e.target.files[0]})}
          />
          {errors.photo && <span className="error">{errors.photo}</span>}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit Listing</button>
      </div>
    </div>
  );
}

export default AddFoodListing;