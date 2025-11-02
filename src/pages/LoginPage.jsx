import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'; // <-- Import Link

function LoginPage() {
  const { login } = useAuth();
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

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>LOGIN</h2> {/* <-- Move H2 INSIDE the form */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">LOGIN</button>
        
        {/* --- ADD REGISTRATION LINK --- */}
        <p style={{ marginTop: '20px' }}>
            New user? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;