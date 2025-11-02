import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSweets = async () => {
        try {
            const res = await axios.get('/api/sweets');
            setSweets(res.data);
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch sweets', err);
            setError('Failed to load sweets. Please check your backend.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets();
    }, []);

    const handlePurchase = async (sweetId, currentQuantity) => {
        if (currentQuantity === 0) return;
        try {
            await axios.post(`/api/sweets/${sweetId}/purchase`);
            setSweets((prevSweets) =>
                prevSweets.map((sweet) =>
                    sweet._id === sweetId ? { ...sweet, quantity: sweet.quantity - 1 } : sweet
                )
            );
        } catch (err) {
            console.error('Purchase failed:', err);
            alert('Purchase failed.');
            fetchSweets();
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <h2>Loading sweets...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container" style={{ color: 'var(--color-primary)' }}>
                <h2>Dashboard Error</h2>
                <p>{error}</p>
                <button onClick={logout}>LOGOUT</button>
            </div>
        );
    }

    return (
        <div className="page-container dashboard-page">
            {/* --- HEADER --- */}
            <div className="dashboard-header">
                <h2 className="welcome-text">
                    Welcome, {user?.role?.toUpperCase() || 'User'}!
                </h2>
                <div className="header-actions">
                    {user?.role === 'Admin' && (
                        <a href="/admin" className="admin-link">Admin Panel</a>
                    )}
                    <button className="action-button" onClick={logout}>Logout</button>
                </div>
            </div>

            {/* --- SWEETS --- */}
            <div className="sweet-section">
                <h3 className="sweet-heading">Available Sweets</h3>

                {sweets.length === 0 ? (
                    <p className="no-sweets">No sweets currently available.</p>
                ) : (
                    <div className="sweet-grid centered">
                        {sweets.map((sweet) => (
                            <div key={sweet._id} className="sweet-card">
                                <h4>{sweet.name}</h4>
                                <p>Category: {sweet.category}</p>
                                <p>Price: <strong>${sweet.price}</strong></p>
                                <p>In Stock: <strong>{sweet.quantity}</strong></p>

                                <button
                                    disabled={sweet.quantity === 0}
                                    onClick={() => handlePurchase(sweet._id, sweet.quantity)}
                                >
                                    {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
