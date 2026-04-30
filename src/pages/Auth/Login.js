import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Registration/RegisterForm.css';
import { loginUser } from '../../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError]   = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!credentials.email.includes('@')) {
            setError('Please enter a valid email address');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(credentials.email, credentials.password);
            const role = data.role || localStorage.getItem('userRole');
            window.dispatchEvent(new Event('storage'));
            if (role === 'admin')           navigate('/admin/dashboard');
            else if (role === 'restaurant') navigate('/restaurant/dashboard');
            else                            navigate('/browse');
        } catch (err) {
            // Fallback to demo accounts if backend not running
            const { email, password } = credentials;
            let role = '';
            if (email === 'admin@medad.com'   && password === '123456') role = 'admin';
            if (email === 'rest@medad.com'    && password === '123456') role = 'restaurant';
            if (email === 'charity@medad.com' && password === '123456') role = 'charity';
            if (role) {
                localStorage.setItem('userRole', role);
                window.dispatchEvent(new Event('storage'));
                if (role === 'admin')           navigate('/admin/dashboard');
                else if (role === 'restaurant') navigate('/restaurant/dashboard');
                else                            navigate('/browse');
            } else {
                setError(err.message || 'Invalid email or password');
            }
        } finally {
            setLoading(false);
        }
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
                    <input type="email" name="email" placeholder="your@email.com" required
                        value={credentials.email} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="••••••••" required
                        value={credentials.password} onChange={handleChange} />
                </div>
                <div className="forgot-pass">
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
                <div className="divider"><span>OR</span></div>
                <p className="footer-text">
                    Don't have an account?{' '}
                    <Link to="/register-role" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;