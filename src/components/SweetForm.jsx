import React, { useState, useEffect } from 'react';

const SweetForm = ({ mode, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [restockAmount, setRestockAmount] = useState('');

  // Effect to populate form when switching to 'update' mode
  useEffect(() => {
    if (mode === 'update' && initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price || '',
        quantity: initialData.quantity || '',
      });
      setRestockAmount(''); // Clear restock field when updating details
    } else {
        // Reset form for 'add' mode
        setFormData({ name: '', category: '', price: '', quantity: '' });
        setRestockAmount('');
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (onSubmit.restock) {
        // Pass the sweet ID and amount to the restock handler in AdminPage
        onSubmit.restock(initialData._id, restockAmount); 
    }
  };

  const handleMainSubmit = (e) => {
    e.preventDefault();
    // Validate required fields for the main form
    if (!formData.name || !formData.category || !formData.price || formData.quantity === '') {
        return alert('All fields are required.');
    }
    
    // Convert price and quantity to numbers
    const submittedData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
    };
    
    // Pass the data to the handler in AdminPage
    if (onSubmit.main) {
        onSubmit.main(submittedData);
    }
  };
  
  const title = mode === 'add' ? 'Add New Sweet' : `Update Details for ${initialData?.name}`;

  return (
    <div>
        <h3>{title}</h3>
        <form onSubmit={handleMainSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            {/* Input fields for all required properties */}
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} min="0.01" step="0.01" />
            <input type="number" name="quantity" placeholder="Initial Stock Quantity" value={formData.quantity} onChange={handleChange} min="0" />
            
            <button type="submit" style={{ gridColumn: '1 / 3' }}>
                {mode === 'add' ? 'Add Sweet' : 'Save Details'}
            </button>
        </form>

        {/* Restock form, visible only in update mode */}
        {mode === 'update' && (
            <div style={{ marginTop: '20px', borderTop: '1px dashed #ccc', paddingTop: '15px' }}>
                <h4>Quick Restock/Replenish</h4>
                <form onSubmit={handleRestockSubmit} style={{ display: 'flex', gap: '10px' }}>
                    <input type="number" placeholder="Amount to Add" value={restockAmount} onChange={(e) => setRestockAmount(e.target.value)} min="1" required />
                    <button type="submit">Restock</button>
                </form>
            </div>
        )}
    </div>
  );
};

export default SweetForm;