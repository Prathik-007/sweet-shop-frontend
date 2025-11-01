import React, { useState } from 'react';
import axios from 'axios'; // <-- Import axios

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // --- ADD ONSUBMIT HANDLER ---
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    try {
      const registerData = { name, email, password };
      
      // This is the call our test is looking for
      const res = await axios.post('/api/auth/register', registerData);

      console.log('Registration successful:', res.data.token);
      // We'll handle storing the token and redirecting later
      
    } catch (err) {
      console.error('Registration failed:', err.response.data);
      // We'll handle errors later
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {/* Add the onSubmit handler to the form */}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            required // Add required for good practice
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            required // Add required for good practice
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            required // Add required for good practice
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;