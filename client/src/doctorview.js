import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const DoctorView = () => {
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();
      console.log(decodedToken);
      // Check if token is expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('token');
        
        navigate('/login');
      } else if (decodedToken.role === 'doctor') {
        setIsLoggedIn(true);
        // You can fetch doctor-specific data here or in another useEffect if needed
      } else {
        navigate('/login'); // or redirect to unauthorized access page
      }
    } else {
      // If there is no token, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  if (!isLoggedIn) {
    // Render nothing or a loading indicator while checking for token and role
    return null; // or <LoadingIndicator />;
  }

  return (
    <div>
      {/* Doctor-specific content goes here */}
      <h1>Doctor Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      {/* Rest of your doctor view */}
    </div>
  );
};

export default DoctorView;
