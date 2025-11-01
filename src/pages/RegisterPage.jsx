import React, { useState } from 'react'; // <-- Import useState

function RegisterPage() {
  // --- ADD STATE ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  // --- ADD ONCHANGE HANDLER ---
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}        // <-- Set value from state
            onChange={onChange} // <-- Add onChange handler
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}       // <-- Set value from state
            onChange={onChange} // <-- Add onChange handler
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}    // <-- Set value from state
            onChange={onChange} // <-- Add onChange handler
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;