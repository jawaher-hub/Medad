import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyListings.css';

const initialListings = [
  { id: 1, name: 'Pizza', category: 'Meals', quantity: 20, expiration: '2026-04-10', status: 'Active' },
  { id: 2, name: 'Fresh Salads', category: 'Vegetables', quantity: 15, expiration: '2026-04-08', status: 'Active' },
  { id: 3, name: 'Lasagna', quantity: 30, category: 'Meals', expiration: '2026-02-26', status: 'Completed' },
];

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(initialListings);
  const [editItem, setEditItem] = useState(null);

  const handleDelete = (id) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const handleEdit = (item) => {
    setEditItem({...item});
  };

  const handleSave = () => {
    setListings(listings.map(l => l.id === editItem.id ? editItem : l));
    setEditItem(null);
  };

  return (
    <div className="listings-container">
      <div className="listings-header">
        <button className="back-btn" onClick={() => navigate('/restaurant/dashboard')}>← Back</button>
        <h1>My Listings</h1>
        <p>Manage your food donations</p>
      </div>

      <button className="add-btn" onClick={() => navigate('/restaurant/add-food')}>+ Add New Food</button>

      <div className="listings-list">
        {listings.map(item => (
          <div key={item.id} className={`listing-card ${item.status === 'Completed' ? 'completed' : ''}`}>
            <div className="listing-info">
              <h3>{item.name}</h3>
              <p>📦 {item.quantity} units &nbsp;|&nbsp; 🏷️ {item.category}</p>
              <p>📅 Expires: {item.expiration}</p>
              <span className={`status ${item.status === 'Active' ? 'active' : 'done'}`}>
                {item.status}
              </span>
            </div>
            {item.status === 'Active' && (
              <div className="listing-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Listing</h2>
            <div className="form-group">
              <label>Food Name</label>
              <input value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" value={editItem.quantity} onChange={e => setEditItem({...editItem, quantity: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Expiration Date</label>
              <input type="date" value={editItem.expiration} onChange={e => setEditItem({...editItem, expiration: e.target.value})} />
            </div>
            <div className="modal-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListings;