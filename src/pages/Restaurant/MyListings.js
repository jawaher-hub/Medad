import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyListings.css';
import { getMyListings, deleteListing, updateListing } from '../../services/api';

// Fallback demo data (used when backend is not running)
const DEMO_LISTINGS = [
  { id: 1, name: 'Pizza',        category: 'Meals',      quantity: 20, expiration: '2026-05-10', status: 'Active' },
  { id: 2, name: 'Fresh Salads', category: 'Vegetables', quantity: 15, expiration: '2026-05-08', status: 'Active' },
  { id: 3, name: 'Lasagna',      category: 'Meals',      quantity: 30, expiration: '2026-02-26', status: 'Completed' },
];

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(''); // eslint-disable-line
  const [editItem, setEditItem]   = useState(null);

  // ── Load listings from API on mount ──────────────────────
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getMyListings();
        // Normalise field names from backend (title → name, expiryDate → expiration)
        const normalised = data.map(item => ({
          id:         item._id || item.id,
          name:       item.title || item.name,
          category:   item.category,
          quantity:   item.quantity,
          expiration: item.expiryDate || item.expiration,
          status:     item.status || 'Active',
        }));
        setListings(normalised);
      } catch {
        // Backend not running — use demo data
        setListings(DEMO_LISTINGS);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // ── Delete ────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      await deleteListing(id);
    } catch {
      // Demo mode: ignore network error, still remove from UI
    }
    setListings(listings.filter(l => l.id !== id));
  };

  // ── Edit / Save ───────────────────────────────────────────
  const handleEdit = (item) => setEditItem({ ...item });

  const handleSave = async () => {
    try {
      await updateListing(editItem.id, {
        title:      editItem.name,
        category:   editItem.category,
        quantity:   editItem.quantity,
        expiryDate: editItem.expiration,
      });
    } catch {
      // Demo mode: ignore error, still update UI
    }
    setListings(listings.map(l => l.id === editItem.id ? editItem : l));
    setEditItem(null);
  };

  if (loading) {
    return (
      <div className="listings-container">
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading listings…</p>
      </div>
    );
  }

  return (
    <div className="listings-container">
      <div className="listings-header">
        <button className="back-btn" onClick={() => navigate('/restaurant/dashboard')}>← Back</button>
        <h1>My Listings</h1>
        <p>Manage your food donations</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

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
                <button className="edit-btn"   onClick={() => handleEdit(item)}>✏️ Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Edit Modal ── */}
      {editItem && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Listing</h3>
            <label>Food Name</label>
            <input value={editItem.name}
              onChange={e => setEditItem({...editItem, name: e.target.value})} />
            <label>Category</label>
            <input value={editItem.category}
              onChange={e => setEditItem({...editItem, category: e.target.value})} />
            <label>Quantity</label>
            <input type="number" value={editItem.quantity}
              onChange={e => setEditItem({...editItem, quantity: e.target.value})} />
            <label>Expiration Date</label>
            <input type="date" value={editItem.expiration}
              onChange={e => setEditItem({...editItem, expiration: e.target.value})} />
            <div className="modal-actions">
              <button className="save-btn"   onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setEditItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyListings;