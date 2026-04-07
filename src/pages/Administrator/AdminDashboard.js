import React from 'react';

function AdminDashboard() {
    const stats = [
        { title: 'Total Restaurants', value: 24 },
        { title: 'Total Charities', value: 18 },
        { title: 'Food Listings', value: 56 },
        { title: 'Completed Donations', value: 142 },
        { title: 'Pending Approvals', value: 7 },
        { title: 'Flagged Listings', value: 3 }
    ];

    const monthlyData = [
        { month: 'Jan', donations: 12 },
        { month: 'Feb', donations: 18 },
        { month: 'Mar', donations: 22 },
        { month: 'Apr', donations: 17 },
        { month: 'May', donations: 25 },
        { month: 'Jun', donations: 30 }
    ];

    const recentActivities = [
        'Rayeq Restaurant added a new food listing.',
        'Hope Foundation completed a donation pickup.',
        '2 new charity accounts are waiting for approval.',
        'One food listing was flagged for safety review.'
    ];

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Admin Analytics Dashboard</h1>
                <select style={styles.select}>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                </select>
            </div>

            <div style={styles.cardGrid}>
                {stats.map((item, index) => (
                    <div key={index} style={styles.card}>
                        <h3 style={styles.cardTitle}>{item.title}</h3>
                        <p style={styles.cardValue}>{item.value}</p>
                    </div>
                ))}
            </div>

            <div style={styles.sectionWrapper}>
                <div style={styles.chartSection}>
                    <h2 style={styles.sectionTitle}>Monthly Donations Overview</h2>
                    <div style={styles.chartBox}>
                        {monthlyData.map((item, index) => (
                            <div key={index} style={styles.barItem}>
                                <div
                                    style={{
                                        ...styles.bar,
                                        height: `${item.donations * 5}px`
                                    }}
                                ></div>
                                <span style={styles.barLabel}>{item.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.activitySection}>
                    <h2 style={styles.sectionTitle}>Recent Activity</h2>
                    <ul style={styles.activityList}>
                        {recentActivities.map((activity, index) => (
                            <li key={index} style={styles.activityItem}>
                                {activity}
                            </li>
                        ))}
                    </ul>
                </div>
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