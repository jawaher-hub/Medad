import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Registration/RegisterForm.css'; 

const Settings = () => {
    const navigate = useNavigate();
    const savedAuth = JSON.parse(localStorage.getItem('user'));
    const userRole = savedAuth?.role?.toLowerCase() || 'user';
    const userId = savedAuth?._id;
    
    const [profile, setProfile] = useState(() => {
        const savedData = JSON.parse(localStorage.getItem('userData'));
        if (savedData) return savedData; 
        
        return {
            name: savedAuth?.name || '',
            phone: savedAuth?.phone || '',
            address: savedAuth?.address || '',
            bio: savedAuth?.bio || ''
        };
    });

    const handleSave = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/api/auth/update-profile/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profile)
            });

            if (response.ok) {
                const updatedUserFromServer = await response.json();
                localStorage.setItem('userData', JSON.stringify(profile));
                localStorage.setItem('user', JSON.stringify({ ...savedAuth, ...profile }));
                
                alert('Settings updated in Database successfully!');
                const path = userRole === 'restaurant' ? '/restaurant/dashboard' : '/browse';
                navigate(path);
            } else {
                alert('Failed to update profile on server');
            }
        } catch (err) {
            console.error(err);
            alert('Error connecting to server');
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
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
                        <input 
                            type="text" 
                            value={profile.name} 
                            onChange={(e) => setProfile({...profile, name: e.target.value})} 
                        />
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
                        <input 
                            type="text" 
                            value={profile.phone} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})} 
                        />
                    </div>
                    <div className="input-group">
                        <label>Operating City / Address</label>
                        <input 
                            type="text" 
                            value={profile.address} 
                            onChange={(e) => setProfile({...profile, address: e.target.value})} 
                        />
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