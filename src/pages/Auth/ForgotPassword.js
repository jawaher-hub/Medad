import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Registration/RegisterForm.css';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="brand-title">Medad</h1>
        <p className="brand-subtitle">Bridging the Gap Between Surplus and Need.</p>
        
        <h2 className="form-type-title">Reset Password</h2>

        {!submitted ? (
          <>
            <div className="input-group">
              <label>Enter your email address</label>
              <input 
                type="email" 
                placeholder="your@email.com" 
                required 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <button type="submit" className="submit-btn">Send Reset Link</button>
          </>
        ) : (
          <div className="success-message" style={{ textAlign: 'center', padding: '20px 0' }}>
            <p>If an account exists for <strong>{email}</strong>, you will receive a password reset link</p>
          </div>
        )}

        <div className="divider"><span>OR</span></div>

        <p className="footer-text">
          Remembered your password? <Link to="/login" style={{color: '#2e7d32', fontWeight: 'bold'}}>Back to Sign In</Link>
        </p>
      </form>
    </div>
  );
};
export default ForgotPassword;