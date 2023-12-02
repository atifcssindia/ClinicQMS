import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // Perform validation if needed
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (response.ok) {
        // Store the token in local storage or in-memory storage as preferred
        localStorage.setItem('token', data.token);
        console.log('here is data', data);
        // Redirect based on the role
        switch (data.role) {
          case 'doctor':
            navigate('/doctorview');
            break;
          case 'receptionist':
            navigate('/receptionview');
            break;
          default:
            // Handle other roles or lack thereof
            throw new Error('Unknown role');
        }
      } else {
        // Handle errors, such as showing an alert to the user
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      // Handle errors
      console.error('Login error:', error);
      alert(error.message || 'Network error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleLogin} style={{ marginBottom: '20px' }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Button
        variant="text"
        onClick={() => navigate('/Registration')}
      >
        Don't have an account? Register
      </Button>
    </div>
  );
};

export default Login;
