import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // <-- Import the useAuth hook

function RegisterPage() {
  const { register } = useAuth(); // <-- Get the register function from context

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

  // --- UPDATED ONSUBMIT HANDLER ---
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Call the register function from the context
    await register(name, email, password);
    
    // The context now handles the API call, token decoding, and state update
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;