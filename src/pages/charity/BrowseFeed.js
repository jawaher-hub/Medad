import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDonations, categories } from '../../data/mockDonations';
import '../../styles/charity/BrowseFeed.css';
import { getListings } from '../../services/api';

const BrowseFeed = () => {
  const navigate = useNavigate();
  const [donations, setDonations]             = useState([]);
  const [filteredDonations, setFiltered]      = useState([]);
  const [searchTerm, setSearchTerm]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading]             = useState(true);
  const [apiError, setApiError]               = useState(''); // eslint-disable-line

  // ── Fetch listings: try API first, fall back to mock ─────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListings();
        // Normalise backend field names to match what the UI expects
        const normalised = data.map(item => ({
          id:             item._id || item.id,
          title:          item.title || item.foodName,
          restaurantName: item.restaurantName || 'Restaurant',
          quantity:       item.quantity,
          expiryDate:     item.expiryDate || item.expirationDate,
          category:       item.category,
          distance:       item.distance || '—',
          image:          item.image || item.photoUrl ||
                          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        }));
        setDonations(normalised);
        setFiltered(normalised);
      } catch {
        // Backend not ready — use mock data
        setDonations(mockDonations);
        setFiltered(mockDonations);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Filter whenever search/category changes ───────────────
  useEffect(() => {
    let results = donations;
    if (searchTerm) {
      results = results.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }
    setFiltered(results);
  }, [searchTerm, selectedCategory, donations]);

  if (isLoading) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <p>Loading available donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="browse-container">
      <div className="browse-header">
        <h1 className="browse-title">Food Donations Near You</h1>
        <p className="browse-subtitle">Browse and request surplus food from local restaurants</p>
      </div>

      {apiError && <div className="error-banner">{apiError}</div>}

      <div className="browse-search-section">
        <input type="text" placeholder="Search by food name or restaurant..."
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          className="browse-search-input" />
      </div>

      <div className="browse-categories">
        {categories.map(cat => (
          <button key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="browse-results-count">Found {filteredDonations.length} donations</div>

      <div className="browse-grid">
        {filteredDonations.map(donation => (
          <div key={donation.id} className="donation-card"
            onClick={() => navigate(`/donation/${donation.id}`)}>
            <img src={donation.image} alt={donation.title} className="donation-card-image" />
            <div className="donation-card-content">
              <h3 className="donation-card-title">{donation.title}</h3>
              <p className="donation-card-restaurant">{donation.restaurantName}</p>
              <div className="donation-card-details">
                <span>🍽️ {donation.quantity}</span>
                <span>📍 {donation.distance}</span>
              </div>
              <div className="donation-card-expiry">
                ⏰ Expires: {new Date(donation.expiryDate).toLocaleString('en-US')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDonations.length === 0 && (
        <div className="auth-form" style={{ textAlign: 'center', marginTop: '40px' }}>
          <p>No donations found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowseFeed;