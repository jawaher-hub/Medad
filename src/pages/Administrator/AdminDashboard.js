import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [stats, setStats] = useState([
        { title: 'Total Restaurants', value: 0 },
        { title: 'Total Charities', value: 0 },
        { title: 'Food Listings', value: 0 },
        { title: 'Pending Approvals', value: 0 }
    ]);

    const styles = {
        page: { padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' },
        adminTopNav: { display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '10px' },
        adminNavLink: { textDecoration: 'none', color: '#007bff', fontWeight: 'bold' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
        title: { fontSize: '24px', color: '#333' },
        select: { padding: '8px', borderRadius: '5px', border: '1px solid #ccc' },
        cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' },
        card: { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' },
        cardTitle: { fontSize: '16px', color: '#666', marginBottom: '10px' },
        cardValue: { fontSize: '28px', fontWeight: 'bold', color: '#333' }
    };

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                
                setStats([
                    { title: 'Total Restaurants', value: data.restaurantsCount || 0 },
                    { title: 'Total Charities', value: data.charitiesCount || 0 },
                    { title: 'Food Listings', value: data.listingsCount || 0 },
                    { title: 'Pending Approvals', value: data.pendingUsersCount || 0 }
                ]);
            } catch (error) {
                console.error("Error fetching admin stats", error);
            }
        };
        fetchAdminStats();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.adminTopNav}>
                <Link to="/admin/pending-approvals" style={styles.adminNavLink}>Pending Approvals</Link>
                <Link to="/admin/safety-monitor" style={styles.adminNavLink}>Safety Monitor</Link>
                <Link to="/admin/user-management" style={styles.adminNavLink}>User Management</Link>
                <Link to="/admin/settings" style={styles.adminNavLink}>Settings</Link>
            </div>

            <div style={styles.header}>
                <h1 style={styles.title}>Admin Analytics Dashboard</h1>
            </div>

            <div style={styles.cardGrid}>
                {stats.map((item, index) => (
                    <div key={index} style={styles.card}>
                        <h3 style={styles.cardTitle}>{item.title}</h3>
                        <p style={styles.cardValue}>{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f5f7fb',
        padding: '30px'
    },
    adminTopNav: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '28px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    adminNavLink: {
        textDecoration: 'none',
        color: '#2d2d2d',
        fontSize: '18px',
        fontWeight: '600'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '15px'
    },
    title: {
        color: '#1f3b64',
        margin: 0
    },
    select: {
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px'
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textAlign: 'left'
    },
    cardTitle: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '10px'
    },
    cardValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1f3b64',
        margin: 0
    },
    sectionWrapper: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px'
    },
    chartSection: {
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    activitySection: {
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    sectionTitle: {
        color: '#1f3b64',
        marginBottom: '20px'
    },
    chartBox: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        height: '250px',
        borderTop: '1px solid #eee',
        paddingTop: '20px'
    },
    barItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
    },
    bar: {
        width: '40px',
        backgroundColor: '#7fbf4d',
        borderRadius: '8px 8px 0 0'
    },
    barLabel: {
        color: '#555',
        fontSize: '14px'
    },
    activityList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    activityItem: {
        backgroundColor: '#f5f7fb',
        padding: '14px',
        borderRadius: '10px',
        marginBottom: '12px',
        color: '#333',
        textAlign: 'left'
    }
};

export default AdminDashboard;