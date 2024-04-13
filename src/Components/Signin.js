import React, { useState } from 'react';
import './signup.css';

function Signin() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/signin', {
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
      
      // Reset the form fields after successful signin
      setUsernameOrEmail('');
      setPassword('');

      // Handle success response from the server
      const data = await response.json();

      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('isAuthenticated',true)

      window.location.href = '/' ;
      // You can add more session data if needed

      // Redirect the user to another page after successful signin
      // window.location.href = '/dashboard'; // Example redirect

    } catch (error) {
      console.error('Signin failed:', error.message);
      // Handle error
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
      <p style={{
        textAlign: 'center',
      }}
      >Don't have an account? <a href="/signup">Sign Up</a></p>

    </div>
  );
}

export default Signin;
