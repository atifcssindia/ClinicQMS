import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppointmentsTable from "./AppointmentsTable";
import Header from "./components/header";
import SideBar from "./components/SideBar";
import { Button } from '@mui/material';
import { io } from 'socket.io-client';


const DoctorView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (decodedToken) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/today?userId=${decodedToken.user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.ok) {
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
      } else {
        console.error("Failed to fetch appointments", response);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleNextPatient = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/next`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: decodedToken.user_id }),
        }
      );
  
      if (response.ok) {
        await fetchAppointments(decodedToken); // Re-fetch appointments after updating the status
      } else {
        console.error("Failed to update the next patient", response);
      }
    } catch (error) {
      console.error("Error updating the next patient:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();

      // Check if token is expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (decodedToken.role === "doctor") {
        setIsLoggedIn(true);

        // Fetch appointments only if the user is a doctor
        fetchAppointments(decodedToken);
      } else {
        navigate("/login"); // Redirect if the user is not a doctor
      }
    } else {
      navigate("/login"); // Redirect if there is no token
    }
  }, [navigate]);


  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);
    
    // Listen for 'appointmentsUpdated' event
    socket.on('appointmentsUpdated', () => {
      // Fetch updated appointments list
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        fetchAppointments(decodedToken); // This will update the appointments based on the userId
      }
    });
  
    // Cleanup function to run when the component is unmounted
    return () => {
      socket.off('appointmentsUpdated');
      socket.disconnect();
    };
  }, []);

  if (!isLoggedIn) {
    // Render nothing or a loading indicator while checking for token and role
    return null; // or <LoadingIndicator />;
  }



  


  
  

  return (
    <div className="app-layout-classic flex flex-auto flex-col  bg-[#f3f4f6]">
      <div className="flex flex-auto min-w-0">
        <SideBar />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <Header />
          <div className="h-full flex flex-auto flex-col">
            <div className="h-full flex flex-auto flex-col justify-between">
              <main className="h-full">
                <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8">
                  <h1 className=" text-xl font-semibold text-gray-800 mb-2">
                    Doctor Dashboard
                  </h1>
                  <AppointmentsTable appointments={appointments} />{" "}
                  {/* Render the table */}
                  <div className="mt-4"> {/* Add some margin to the top */}
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextPatient}
                  className="self-end" // Tailwind class to align the button to the end of its container
                  >
                  Next Patient
                  </Button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
