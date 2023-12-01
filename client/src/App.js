import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientRegistrationForm from './PatientRegistrationForm';
import DoctorRegistration from './DoctorRegistration'; // Import your new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/doctor" element={<DoctorRegistration />} />
                <Route path="/" element={<PatientRegistrationForm />} />
            </Routes>
        </Router>
    );
}

export default App;
