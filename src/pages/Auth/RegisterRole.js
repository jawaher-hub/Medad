import React from 'react';
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaHandsHelping } from "react-icons/fa";
import './RegisterRole.css';

const RegisterRole = () => {
  return (
    <div className="role-page">
      <h2 className="role-header">How would you like to join us?</h2>
      <div className="role-selection-container">
        
        <Link to="/register-restaurant" className="role-card">
          <div className="role-icon"><IoFastFoodOutline size={30} /></div>
          <h3>Restaurant</h3>
          <p>I want to donate surplus food</p>
        </Link>

        <Link to="/register-charity" className="role-card">
          <div className="role-icon"><FaHandsHelping size={30} /></div>
          <h3>Charity</h3>
          <p>I want to receive food for those in need</p>
        </Link>

      </div>
    </div>
  );
};
export default RegisterRole;