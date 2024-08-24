import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import "../index.css";

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // שדה אימייל
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/auth/register', { username, email, password }); // שליחת אימייל
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email" // שדה אימייל
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <button type="button" onClick={() => navigate('/')}>
          Login
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
