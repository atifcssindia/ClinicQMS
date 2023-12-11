import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PatientRegistrationForm from "./PatientRegistrationForm";
import Login from "./Login";
import DoctorView from "./doctorview";
import Registration from "./Registration";
import "./main.css";
import { SidebarProvider } from "./services/SidebarContext";
import QR from "./components/QR";

const RedirectToLoginOrForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Check if there are any query parameters
  if (queryParams.toString()) {
    // If there are query parameters, render the PatientRegistrationForm
    return <PatientRegistrationForm />;
  } else {
    // If there are no query parameters, redirect to '/login'
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<RedirectToLoginOrForm />} />
          <Route path="/doctorview/*" element={<DoctorView />} />
          <Route path="/qr/*" element={<QR />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;