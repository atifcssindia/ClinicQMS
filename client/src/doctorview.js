import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppointmentsTable from "./AppointmentsTable";
import Header from "./components/header";
import SideBar from "./components/SideBar";

const DoctorView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

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
        const fetchAppointments = async () => {
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
              console.log(appointmentsData); // Log the appointments
              setAppointments(appointmentsData);
            } else {
              console.error("Failed to fetch appointments", response);
              // Handle HTTP errors
            }
          } catch (error) {
            console.error("Error fetching appointments:", error);
            // Handle network errors
          }
        };

        fetchAppointments();
      } else {
        navigate("/login"); // Redirect if the user is not a doctor
      }
    } else {
      navigate("/login"); // Redirect if there is no token
    }
  }, [navigate]);

  if (!isLoggedIn) {
    // Render nothing or a loading indicator while checking for token and role
    return null; // or <LoadingIndicator />;
  }

  return (
    <div className="app-layout-classic flex flex-auto flex-col  bg-gray-50">
      <div className="flex flex-auto min-w-0">
        <SideBar />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
          <Header />
          <div className="h-full flex flex-auto flex-col">
            <div className="h-full flex flex-auto flex-col justify-between">
              <main className="h-full">
                <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8">
                  <h1 className=" text-xl font-semibold text-gray-800 mb-2">
                    Doctor Dashboard
                  </h1>
                  <AppointmentsTable appointments={appointments} />{" "}
                  {/* Render the table */}
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
