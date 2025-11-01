import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // <-- Import the useAuth hook
// We no longer need axios in this file

function LoginPage() {
  const { login } = useAuth(); // <-- Get the login function from context

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // --- UPDATED ONSUBMIT HANDLER ---
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Call the login function from the context
    await login(email, password); 
    
    // The context now handles the API call, token decoding, and state update
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}> 
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;