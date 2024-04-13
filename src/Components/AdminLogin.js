import React, { useState } from 'react';
import './signup.css';

function AdminLogin() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://127.0.0.1:5000/adminLogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usernameOrEmail,
              password,
            }),
          });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }
      
      setUsernameOrEmail('');
      setPassword('');

      const data = await response.json();

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('isAuthenticated',true)

      window.location.href = '/admin/adminDashboard' ;


    } catch (error) {
      console.error('Signin failed:', error.message);

    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username or Email:</label>
          <input type="text" value={usernameOrEmail} onChange={(e) => setUsernameOrEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  );
}

export default AdminLogin;
