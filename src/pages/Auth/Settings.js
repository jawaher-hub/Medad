import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Registration/RegisterForm.css'; 

const Settings = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole') || 'User';
    
    const [profile, setProfile] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem('userData'));
        if (savedData) return savedData; 
        
        return {
            name: userRole === 'restaurant' ? 'Al-Baik' : 'Noor Charity',
            phone: '0501234567',
            address: 'Khobar, Eastern Province',
            bio: userRole === 'restaurant' ? 'Leading restaurant in fast food.' : 'Helping families in need.'
        };
    });

    const handleSave = (e) => {
            e.preventDefault();
            
            localStorage.setItem('userData', JSON.stringify(profile));
            alert('Settings updated successfully!');
            const path = userRole === 'restaurant' ? '/restaurant/dashboard' : '/browse';
            navigate(path);
        };

    const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem('userRole');
        localStorage.clear(); 
        window.location.href = '/'; 
    }
    };


    return (
        <div className="form-container" style={{ marginTop: '40px' }}>
            <form className="auth-form" onSubmit={handleSave} style={{ maxWidth: '600px' }}>
                <h2 className="form-type-title" style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '10px' }}>
                     {userRole.toUpperCase()} Settings
                </h2>

                <section style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#666', marginBottom: '15px' }}>General Information</h4>
                    <div className="input-group">
                        <label>Entity Name</label>
                        <input type="text" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>{userRole === 'restaurant' ? 'Restaurant Bio' : 'Charity Mission'}</label>
                        <textarea 
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
                            rows="3"
                            value={profile.bio}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        />
                    </div>
                </section>

                <section style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#666', marginBottom: '15px' }}>Contact & Location</h4>
                    <div className="input-group">
                        <label>Contact Number</label>
                        <input type="text" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                    </div>
                    <div className="input-group">
                        <label>Operating City / Address</label>
                        <input type="text" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} />
                    </div>
                </section>
                
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button type="submit" className="submit-btn">Save Changes</button>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="button" className="submit-btn" style={{ backgroundColor: '#ccc', flex: 1 }} onClick={() => navigate(-1)}>
                            Back
                        </button>
                        <button type="button" className="submit-btn" style={{ backgroundColor: '#d32f2f', flex: 1 }} onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default Settings;