import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegistrationForm from "./PatientRegistrationForm";
import Login from "./Login";
import DoctorView from "./doctorview";
import Registration from "./Registration"; // Import your new component
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
          <Route path="/" element={<PatientRegistrationForm />} />
          <Route path="/doctorview/*" element={<DoctorView />} />
          <Route path="/qr/*" element={<QR />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
