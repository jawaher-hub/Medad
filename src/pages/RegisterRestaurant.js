import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterRestaurant = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  const validate = () => {
    const { email, password, confirmPassword } = formData;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address (example: name@gmail.com)";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be 8+ chars with a letter, a number, and a special character.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    console.log("Success!", formData);
    alert("Account created successfully!");
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Restaurant</h2>
        <p>Be the reason a meal isn't wasted</p>
        {error && <div className="error-banner">{error}</div>}

        <div className="input-group">
          <label>Restaurant Name</label>
          <input type="text" name="restaurantName" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="at least 8 characters" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" required onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Create Account</button>
      </form>
    </div>
  );
};
export default RegisterRestaurant;