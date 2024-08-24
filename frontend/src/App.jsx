import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Todo from './components/Todo';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogOff = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/todo" /> : <LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/todo" /> : <RegisterForm />}
          />
          <Route
            path="/todo"
            element={isAuthenticated ? <Todo onLogOff={handleLogOff} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
