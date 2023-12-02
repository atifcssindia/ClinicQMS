import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import AppointmentsTable from './AppointmentsTable';

const DoctorView = () => {
    
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();
  
      // Check if token is expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('token');
        navigate('/login');
      } else if (decodedToken.role === 'doctor') {
        setIsLoggedIn(true);
  
        // Fetch appointments only if the user is a doctor
        const fetchAppointments = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/appointments/today?userId=${decodedToken.user_id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`, // Authorization header
                'Content-Type': 'application/json'
              },
            });
  
            if (response.ok) {
              const appointmentsData = await response.json();
              console.log(appointmentsData); // Log the appointments
              setAppointments(appointmentsData);
            } else {
              console.error('Failed to fetch appointments', response);
              // Handle HTTP errors
            }
          } catch (error) {
            console.error('Error fetching appointments:', error);
            // Handle network errors
          }
        };
  
        fetchAppointments();
      } else {
        navigate('/login'); // Redirect if the user is not a doctor
      }
    } else {
      navigate('/login'); // Redirect if there is no token
    }
  }, [navigate]);
  

  if (!isLoggedIn) {
    // Render nothing or a loading indicator while checking for token and role
    return null; // or <LoadingIndicator />;
  }

  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <AppointmentsTable appointments={appointments} /> {/* Render the table */}
    </div>
  );
};

export default DoctorView;
