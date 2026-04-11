import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { saveRating, hasSubmittedRating, getRating } from '../../utils/localStorageHelpers';
import '../../styles/charity/RatingFeedback.css';

const RatingFeedback = () => {
  const { deliveryId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = ['On time', 'Good packaging', 'Fresh food', 'Friendly staff', 'Good quantity'];

  useEffect(() => {
    if (hasSubmittedRating(deliveryId)) {
      const existingRating = getRating(deliveryId);
      setRating(existingRating.rating);
      setFeedbackText(existingRating.feedbackText || '');
      setSelectedTags(existingRating.selectedTags || []);
      setSubmitted(true);
    }
  }, [deliveryId]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    setTimeout(() => {
      saveRating(deliveryId, {
        rating,
        feedbackText,
        selectedTags
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="auth-form" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
          <h2>Thank You!</h2>
          <p>Your feedback helps us improve the food donation experience.</p>
          <button onClick={() => navigate('/browse')} className="submit-btn" style={{ marginTop: '20px' }}>
            Return to Browse Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="auth-form">
        <h2>Rate Your Experience</h2>
        <p>How was the food donation and pickup process?</p>

        {error && <div className="error-banner">{error}</div>}

        <div className="rating-section">
          <label>Overall Rating</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={`star ${star <= rating ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className="tags-section">
          <label>What went well? (Optional)</label>
          <div className="tags-container">
            {availableTags.map(tag => (
              <button
                key={tag}
                className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>Write a Review</label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            rows="4"
            placeholder="Share your experience with the restaurant and food quality..."
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd', fontFamily: 'inherit' }}
          />
        </div>

        <button className="submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </div>
    </div>
  );
};

export default RatingFeedback;