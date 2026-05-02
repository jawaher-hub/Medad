import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDonations, categories } from '../../data/mockDonations';
import '../../styles/charity/BrowseFeed.css';
import { getListings } from '../../services/api';

const BrowseFeed = () => {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getListings();
      const normalised = data.map(item => ({
        id: item._id || item.id,
        title: item.foodName || item.title || 'Unknown Item',
        restaurantName: item.restaurantName || 'Local Partner',
        quantity: item.quantity || 0,
        expiryDate: item.expiryDate || item.expirationDate || new Date(),
        category: item.category || 'other',
        distance: item.distance || 'Nearby',
        image: item.image || item.photoUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'
      }));
      setDonations(normalised);
    } catch (err) {
      console.log("Using fallback mock data");
      setDonations(mockDonations);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const results = donations.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.restaurantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
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

      <div className="browse-search-section">
        <input 
          type="text" 
          placeholder="Search by food name or restaurant..."
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
          className="browse-search-input" 
        />
      </div>

      <div className="browse-categories">
        {categories.map(cat => (
          <button 
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="browse-results-count">Found {filteredDonations.length} donations</div>

      <div className="browse-grid">
        {filteredDonations.map(donation => (
          <div key={donation.id} className="donation-card" onClick={() => navigate(`/donation/${donation.id}`)}>
            <img src={donation.image} alt={donation.title} className="donation-card-image" />
            <div className="donation-card-content">
              <h3 className="donation-card-title">{donation.title}</h3>
              <p className="donation-card-restaurant">{donation.restaurantName}</p>
              <div className="donation-card-details">
                <span>🍽️ {donation.quantity} portions</span>
                <span>📍 {donation.distance}</span>
              </div>
              <div className="donation-card-expiry">
                ⏰ Expires: {new Date(donation.expiryDate).toLocaleString()}
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