import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SweetForm from '../components/SweetForm'; // Assuming this component is created

function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // State for the main list of sweets
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the form's mode
  const [formMode, setFormMode] = useState('add'); // 'add' or 'update'
  const [currentSweet, setCurrentSweet] = useState(null); // Sweet being updated/edited

  // Check if user is Admin on mount (extra check, though the route is protected)
  useEffect(() => {
    if (user?.role !== 'Admin') {
      alert("Access Denied: Admin role required.");
      navigate('/dashboard', { replace: true });
    } else {
      fetchSweets();
    }
  }, [user, navigate]);


  // Function to fetch the sweet list
  const fetchSweets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/sweets');
      setSweets(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load sweets. Check backend or token.');
      setLoading(false);
    }
  };

  // --- CRUD HANDLERS ---

  const handleAddUpdate = async (sweetData) => {
    try {
      if (formMode === 'add') {
        await axios.post('/api/sweets', sweetData);
        alert(`${sweetData.name} added successfully.`);
      } else {
        // Use sweetData from the form to update, not just currentSweet
        await axios.put(`/api/sweets/${currentSweet._id}`, sweetData);
        alert(`${sweetData.name} updated successfully.`);
      }

      // Clear form and refresh list
      setFormMode('add');
      setCurrentSweet(null);
      fetchSweets();

    } catch (err) {
      alert(`Operation failed: ${err.response?.data?.msg || 'Check console.'}`);
      console.error(err);
    }
  };

  const handleDelete = async (sweetId, sweetName) => {
    if (window.confirm(`Are you sure you want to delete ${sweetName}? THIS IS ADMIN ONLY!`)) {
      try {
        await axios.delete(`/api/sweets/${sweetId}`);
        alert(`${sweetName} deleted successfully.`);
        fetchSweets(); // Refresh list
      } catch (err) {
        alert(`Deletion failed: ${err.response?.data?.msg || 'Check console.'}`);
        console.error(err);
      }
    }
  };

  const handleRestock = async (sweetId, amount) => {
    // Note: The SweetForm handles the amount validation, but we keep a safety check
    if (!amount || amount <= 0) return alert('Please enter a positive restock amount.');

    try {
      await axios.post(`/api/sweets/${sweetId}/restock`, { amount: Number(amount) });
      alert(`Restocked ${amount} units.`);
      fetchSweets(); // Refresh list
    } catch (err) {
      alert(`Restock failed: ${err.response?.data?.msg || 'Check console.'}`);
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading Admin Panel...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* --- HEADER --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>🍭 Sweet Shop Admin Panel</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* --- ADD/UPDATE FORM (SweetForm Component Integration) --- */}
      <section style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '30px', borderRadius: '8px', backgroundColor: '#fff' }}>
        <SweetForm
          mode={formMode}
          initialData={currentSweet}
          onSubmit={{
            main: handleAddUpdate,
            // Pass the restock handler to the SweetForm component
            restock: handleRestock, 
          }}
        />
        {/* Button to clear the form, only shown when in 'update' mode */}
        {formMode === 'update' && (
          <button 
            onClick={() => { setFormMode('add'); setCurrentSweet(null); }}
            style={{ marginTop: '15px', color: '#d9534f', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Clear Form / Switch to Add Mode
          </button>
        )}
      </section>

      {/* --- INVENTORY LIST --- */}
      <section>
        <h3>Inventory Management ({sweets.length})</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'left' }}>Name/Category</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Stock</th>
              <th style={{ padding: '10px', border: '1px solid #ccc', width: '300px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sweets.map(sweet => (
              <tr key={sweet._id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <strong>{sweet.name}</strong> ({sweet.category})
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>${sweet.price}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc', textAlign: 'center' }}>{sweet.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc', display: 'flex', gap: '5px' }}>
                  {/* EDIT BUTTON: Sets the form mode and data */}
                  <button onClick={() => { setFormMode('update'); setCurrentSweet(sweet); }}>
                    Edit
                  </button>
                  {/* RESTOCK BUTTON: Sets the form mode and data to use the restock input in the form */}
                  <button 
                    style={{ backgroundColor: '#f0ad4e', color: 'white' }} 
                    onClick={() => { setFormMode('update'); setCurrentSweet(sweet); }}
                  >
                    Restock
                  </button>
                  {/* DELETE BUTTON: Calls the handleDelete function */}
                  <button 
                    style={{ backgroundColor: '#d9534f', color: 'white' }} 
                    onClick={() => handleDelete(sweet._id, sweet.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
}

export default AdminPage;