import React, { useState } from 'react';

function PendingApprovals() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Rayeq Restaurant',
            role: 'Restaurant',
            email: 'rayeq@mail.com',
            date: '2026-03-01',
            status: 'Pending'
        },
        {
            id: 2,
            name: 'Hope Foundation',
            role: 'Charity',
            email: 'hope@mail.com',
            date: '2026-03-02',
            status: 'Pending'
        }
    ]);

    const handleApprove = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleReject = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Pending User Approvals</h1>

            <div style={styles.table}>
                <div style={styles.headerRow}>
                    <span>Name</span>
                    <span>Role</span>
                    <span>Email</span>
                    <span>Date</span>
                    <span>Actions</span>
                </div>

                {users.map(user => (
                    <div key={user.id} style={styles.row}>
                        <span>{user.name}</span>
                        <span>{user.role}</span>
                        <span>{user.email}</span>
                        <span>{user.date}</span>

                        <div style={styles.actions}>
                            <button
                                style={styles.approveBtn}
                                onClick={() => handleApprove(user.id)}
                            >
                                Approve
                            </button>

                            <button
                                style={styles.rejectBtn}
                                onClick={() => handleReject(user.id)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {users.length === 0 && (
                <p style={{ marginTop: '20px' }}>No pending users 🎉</p>
            )}
        </div>
    );
}

const styles = {
    page: {
        padding: '30px',
        backgroundColor: '#f5f7fb',
        minHeight: '100vh'
    },
    title: {
        color: '#1f3b64',
        marginBottom: '20px'
    },
    table: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    },
    headerRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        padding: '10px 0',
        borderTop: '1px solid #eee',
        alignItems: 'center'
    },
    actions: {
        display: 'flex',
        gap: '10px'
    },
    approveBtn: {
        backgroundColor: '#7fbf4d',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer'
    },
    rejectBtn: {
        backgroundColor: '#e74c3c',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer'
    }
};

export default PendingApprovals;