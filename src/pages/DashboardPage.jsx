import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; 

function DashboardPage() {
    const { user, logout } = useAuth();
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- JAVASCRIPT LOGIC BLOCK ---

    useEffect(() => {
        const fetchSweets = async () => {
            // ... (rest of useEffect code)
        };
        fetchSweets();
    }, []);

    const handlePurchase = async (sweetId, currentQuantity) => {
        if (currentQuantity === 0) return;

        try {
            await axios.post(`/api/sweets/${sweetId}/purchase`);

            // Update the local state
            setSweets((prevSweets) =>
                prevSweets.map((sweet) =>
                    sweet._id === sweetId ? { ...sweet, quantity: sweet.quantity - 1 } : sweet
                )
            );
        } catch (err) {
            console.error('Purchase failed:', err);
            alert('Purchase failed. Please try again.'); 
        }
    };
    
    // --- END JAVASCRIPT LOGIC BLOCK ---


    if (loading) {
        // ... (loading return)
    }
    if (error) {
        // ... (error return)
    }

    // --- MAIN JSX RETURN BLOCK ---
    return (
        <div style={{ padding: '20px' }}>
            {/* ... (rest of the component) */}
            
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
                                // CORRECT: Call the function we defined above
                                onClick={() => handlePurchase(sweet._id, sweet.quantity)} 
                            >
                                {sweet.quantity > 0 ? 'Purchase' : 'Out of Stock'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
            
            {/* ... (rest of the component) */}
        </div>
    );
}

export default DashboardPage;