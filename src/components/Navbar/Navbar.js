import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || "");
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole') || "";
    setUserRole(role);
  }, [location]);

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'restaurant') return '/restaurant/dashboard';
    if (userRole === 'charity') return '/browse';
    return '/';
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={getDashboardLink()} className="logo-link">Medad</Link>
      </div>
      <ul className="nav-links">
        {!userRole || userRole === "" ? (
          <>
            <li><Link to="/" className="nav-item">Home</Link></li>
            <li><Link to="/login" className="nav-item">Login</Link></li>
            <li><Link to="/register-role" className="signup-btn">Sign Up</Link></li>
          </>
        ) : (
          <>
            {userRole === 'charity' && <li><Link to="/browse" className="nav-item">Browse</Link></li>}
            
            {userRole !== 'admin' && (
              <li><Link to="/settings" className="nav-item" style={{fontSize: '22px'}}>⚙️</Link></li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;