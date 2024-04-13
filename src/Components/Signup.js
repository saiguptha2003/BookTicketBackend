import React, { useState } from 'react';
import './signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          username,
          phoneNumber,
          country,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
  
      // Reset the form fields after successful signup
      setEmail('');
      setPassword('');
      setUsername('');
      setPhoneNumber('');
      setCountry('');
  
      // Handle success response from the server
      const data = await response.json();
      console.log(data);
      window.location.href = '/signin';
      console.log('Signup successful:', data);
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Handle error
    }
  };
  
  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Country:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <p style={{
        textAlign: 'center',
        color: '#000000',
      }}>Already have an account? <a href="/signin">Log In</a></p>
    </div>
  );
}

export default Signup;
