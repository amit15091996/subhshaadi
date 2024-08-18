import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Start loading

    try {
      const response = await axios.get('http://localhost:7878/api/v1/auth/login-profile', {
        params: {
          mobileNumber,
          password,
        },
      });

      const data = response.data;
      const jwtToken = data.jwtToken;
      const statusMessage = data.statusMessage;
      const statusCode = data.statusCode;

      if (statusCode === 200) {
        // Save JWT token and other necessary data in local storage or state
        localStorage.setItem('jwtToken', jwtToken);
        // Optionally save other user data if needed
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('fullName', data.fullName);
        localStorage.setItem('gender', data.gender);
        localStorage.setItem('tokenExpirationInMilis', data.tokenExpirationInMilis);

        // Navigate to the profiles page after a delay
        setTimeout(() => {
          navigate('/profiles');
        }, 1000); // 1-second delay
      } else {
        // Handle errors
        setError(statusMessage || 'An error occurred');
      }
    } catch (error) {
      setError(error.response?.data?.statusMessage || 'An unexpected error occurred');
    } finally {
      // Delay hiding the loading spinner by 2 seconds
      setTimeout(() => {
        setIsLoading(false); // End loading
      }, 2000); // 2-second delay
    }
  };

  return (
    <div className="login-container">
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <h2>Welcome to MatchMade</h2>
      <p>Find your perfect match</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="mobileNumber">Phone Number:</label>
          <input
            type="text"
            placeholder="Please enter your phone number"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Please enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={isLoading}>Login</button>
        <p className="signup-link">
          Don't have an account? <a href="/">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
