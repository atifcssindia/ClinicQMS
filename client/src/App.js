import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PatientRegistrationForm from "./PatientRegistrationForm";
import Login from "./Login";
import DoctorView from "./doctorview";
import Registration from "./Registration";
import "./main.css";
import { SidebarProvider } from "./services/SidebarContext";
import QR from "./components/QR";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/patientregistration" element={<PatientRegistrationForm />} />
          <Route path="/doctorview/*" element={<DoctorView />} />
          <Route path="/qr/*" element={<QR />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;