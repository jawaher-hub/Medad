import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">Medad</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-item">Home</Link></li>
        <li><Link to="/login" className="nav-item">Login</Link></li>
        <li>
          <Link to="/register-role" className="signup-btn">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;