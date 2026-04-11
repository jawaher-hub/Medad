import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || "");
  const location = useLocation();

  useEffect(() => {
    const updateRole = () => {
      const role = localStorage.getItem('userRole') || "";
      setUserRole(role);
    };

    updateRole(); 
    window.addEventListener('storage', updateRole);
    return () => window.removeEventListener('storage', updateRole);
  }, [location]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = '/'; 
    }
  };

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
            {userRole === 'charity' && (
              <>
                <li><Link to="/browse" className="nav-item"> Browse Food</Link></li>
                <li><Link to="/my-requests" className="nav-item"> My Requests</Link></li>
              </>)
            }
            
            {(userRole === 'restaurant' || userRole === 'charity') && (
              <li><Link to="/settings" className="nav-item" style={{fontSize: '22px'}}>⚙️</Link></li>
            )}
            {userRole === 'admin' && (
              <li><button onClick={handleLogout} className="nav-item" style={{background:'none', border:'none', cursor:'pointer'}}>Logout</button></li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;