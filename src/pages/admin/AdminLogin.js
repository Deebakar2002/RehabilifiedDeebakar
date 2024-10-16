// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Axios instance for API requests
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/login', { email, password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('adminToken', token); // Save token
        navigate('/admin/dashboard'); // Redirect to admin dashboard
      }
    } catch (error) {
      // Enhanced error handling based on error response
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please try again.');
        } else if (error.response.status === 400) {
          setError('Bad request. Please check your input.');
        } else {
          setError('Server error. Please try again later.');
        }
      } else if (error.request) {
        setError('Network error. Please check your internet connection.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
