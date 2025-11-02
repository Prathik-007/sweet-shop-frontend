import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
    const { user, logout } = useAuth();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSweets = async () => {
        try {
            const res = await axios.get('/api/sweets');
            setSweets(res.data);
            setLoading(false);
            setError(null); // Clear any previous error
        } catch (err) {
            console.error('Failed to fetch sweets', err);
            setError('Failed to load sweets. Check if the backend is running and authenticated.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSweets(); // This is correctly placed to run once on mount
    }, []);

    const handlePurchase = async (sweetId, currentQuantity) => {
        if (currentQuantity === 0) return;

        try {
            await axios.post(`/api/sweets/${sweetId}/purchase`);

            // Optimistic UI Update
            setSweets((prevSweets) =>
                prevSweets.map((sweet) =>
                    sweet._id === sweetId ? { ...sweet, quantity: sweet.quantity - 1 } : sweet
                )
            );
        } catch (err) {
            console.error('Purchase failed:', err);
            alert('Purchase failed. Check stock or network.'); 
            // Re-fetch in case of failure to sync client state
            fetchSweets();
        }
    };
    
    // --- RENDER LOGIC ---

    if (loading) {
        return (
            <div style={{ padding: '20px' }}>
                <h2>Sweets Dashboard</h2>
                <p>Loading sweets...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Sweets Dashboard</h2>
                <p>{error}</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            {/* --- HEADER --- */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Welcome, {user?.role || 'User'}!</h2>
                <button onClick={logout}>Logout</button>
            </div>

            {/* --- SWEET LIST --- */}
            <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Available Sweets ({sweets.length})</h3>
            
            {sweets.length === 0 ? (
                <p>No sweets currently available.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {sweets.map((sweet) => (
                        <div key={sweet._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', boxShadow: '2px 2px 5px rgba(0,0,0,0.1)' }}>
                            <h4>{sweet.name} ({sweet.category})</h4>
                            <p>Price: **${sweet.price}**</p>
                            <p>In Stock: **{sweet.quantity}**</p>
                            
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
            
            {user?.role === 'Admin' && (
                <p style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                    <a href="/admin">Go to Admin Panel</a>
                </p>
            )}
        </div>
    );
}

export default DashboardPage;