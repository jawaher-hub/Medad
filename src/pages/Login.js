import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!credentials.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (
        credentials.email === 'admin@medad.com' &&
        credentials.password === '123456'
    ) {
      navigate('/admin/dashboard');
      return;
    }

    setError('Invalid email or password');
  };

  return (
      <div className="form-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="brand-title">Medad</h1>
          <p className="brand-subtitle">Bridging the Gap Between Surplus and Need.</p>

          <h2 className="form-type-title">Sign In</h2>

          {error && <div className="error-banner">{error}</div>}

          <div className="input-group">
            <label>Email Address</label>
            <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                value={credentials.email}
                onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={credentials.password}
                onChange={handleChange}
            />
          </div>

          <div className="forgot-pass">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button type="submit" className="submit-btn">Sign In</button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="footer-text">
            Don't have an account? <Link to="/register-role">Sign Up</Link>
          </p>
        </form>
      </div>
  );
};

export default Login;