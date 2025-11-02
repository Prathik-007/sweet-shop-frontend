import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // We'll use this soon

function DashboardPage() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSweets = async () => {
      try {
        // This is the API call our test is mocking
        const res = await axios.get('/api/sweets');
        setSweets(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch sweets', err);
        setLoading(false);
      }
    };

    fetchSweets();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading sweets...</div>;
  }

  return (
    <div>
      <h2>Sweets Dashboard</h2>
      {sweets.length === 0 ? (
        <p>No sweets available.</p>
      ) : (
        <ul>
          {sweets.map((sweet) => (
            <li key={sweet._id}>
              {sweet.name} - ${sweet.price} - (In stock: {sweet.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardPage;