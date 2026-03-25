import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterCharity = () => {
  const [formData, setFormData] = useState({
    charityName: '',
    city: '',
    phone: '',
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
    const { email, phone, password, confirmPassword, city } = formData;

    if (!city) return "Please select a city";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";

    const phoneRegex = /^05[0-9]{8}$/;
    if (!phoneRegex.test(phone)) return "Phone must be 10 digits starting with 05";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be +8 characters with a letter, number, and special character.";
    }

    if (password !== confirmPassword) return "Passwords do not match";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    
    if (validationError) {
      setError(validationError);
      return;
    }

    console.log("Charity Data:", formData);
    alert("Registration submitted! an admin will review your registration soon");
  };

  return (
    <div className="form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Charity</h2>
        <p>Join Medad to help distribute surplus food</p>

        {error && <div className="error-banner">{error}</div>}

        <div className="input-group">
          <label>Charity Organization Name</label>
          <input type="text" name="charityName" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>City</label>
          <select name="city" required onChange={handleChange} className="form-select">
            <option value="">Select your city</option>
            <optgroup label="Eastern Province">
              <option value="Dhahran">Dhahran</option>
              <option value="Dammam">Dammam</option>
              <option value="Khobar">Khobar</option>
              <option value="Al-Ahsa">Al-Ahsa</option>
              <option value="Jubail">Jubail</option>
            </optgroup>
            <optgroup label="Central or West">
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Makkah">Makkah</option>
              <option value="Madinah">Madinah</option>
            </optgroup>
            <optgroup label="Other">
              <option value="Abha">Abha</option>
              <option value="Tabuk">Tabuk</option>
              <option value="Hail">Hail</option>
            </optgroup>
          </select>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input type="tel" name="phone" placeholder="05xxxxxxxx" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Email Address</label>
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
export default RegisterCharity;