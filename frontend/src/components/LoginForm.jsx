import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import "../index.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState(''); // שדה כניסה כללי לשם משתמש או אימייל
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', { identifier, password }); // שימוש ב-identifier
      const token = response.data.token;

      // שמור את הטוקן ב-localStorage
      localStorage.setItem('token', token);

      // קריאה לפונקציה שקוראת להתמדה במידע ולשינוי מצב האותנטיקציה
      onLoginSuccess(token);

      // ניתוב לדף רשימת המשימות
      navigate('/todo');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Username or Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?{' '}
        <button type="button" onClick={() => navigate('/register')}>
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
