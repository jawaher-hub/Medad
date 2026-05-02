import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyListings.css';
import { getMyListings, deleteListing, updateListing } from '../../services/api';

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const fetchListings = async () => {
    try {
      const data = await getMyListings();
      const normalised = data.map(item => ({
        id: item._id || item.id,
        name: item.title || item.name,
        category: item.category,
        quantity: item.quantity,
        expiration: item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : (item.expiration || 'N/A'),
        status: item.status || 'Active',
      }));
      setListings(normalised);
    } catch (err) {
      console.error("Failed to load listings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await deleteListing(id);
        setListings(listings.filter(l => l.id !== id));
      } catch (err) {
        alert("Failed to delete listing");
      }
    }
  };

  const handleEdit = (item) => setEditItem({ ...item });

  const handleSave = async () => {
    try {
      await updateListing(editItem.id, {
        title: editItem.name,
        category: editItem.category,
        quantity: editItem.quantity,
        expiryDate: editItem.expiration,
      });
      setEditItem(null);
      fetchListings();
    } catch (err) {
      alert("Failed to update listing");
    }
  };

  if (loading) return <div className="listings-container"><p>Loading listings...</p></div>;

  return (
    <div className="listings-container">
      <div className="listings-header">
        <button className="back-btn" onClick={() => navigate('/restaurant/dashboard')}>← Back</button>
        <h1>My Listings</h1>
      </div>

      <button className="add-btn" onClick={() => navigate('/restaurant/add-food')}>+ Add New Food</button>

      <div className="listings-list">
        {listings.map(item => (
          <div key={item.id} className={`listing-card ${item.status === 'Completed' ? 'completed' : ''}`}>
            <div className="listing-info">
              <h3>{item.name}</h3>
              <p>📦 {item.quantity} units | 🏷️ {item.category}</p>
              <p>📅 Expires: {item.expiration}</p>
              <span className={`status ${item.status === 'Active' || item.status === 'active' ? 'active' : 'done'}`}>
                {item.status}
              </span>
            </div>
            {(item.status === 'Active' || item.status === 'active') && (
              <div className="listing-actions">
                <button className="edit-btn" onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {editItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Listing</h3>
            <label>Food Name</label>
            <input value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} />
            <label>Quantity</label>
            <input type="number" value={editItem.quantity} onChange={e => setEditItem({...editItem, quantity: e.target.value})} />
            <div className="modal-actions">
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