import React from 'react';
import { Link } from 'react-router-dom'; 
import './MainWelcome.css';

const MainWelcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">
        Bridging the Gap Between <br /> 
        <span className="green-text">Surplus and Need</span>
      </h1>
      <p className="welcome-description">
        Connecting restaurants with local charities to ensure no food goes to waste.
      </p>
      <Link to="/register-role" className="start-button">
        Get Started
      </Link>
    </div>
  );
};
export default MainWelcome;