import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken.doctor_id);
    }
  }, []);

  useEffect(() => {
    // Only fetch patients if doctorId is set
    if (doctorId) {
      const fetchPatients = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/patients?doctorId=${doctorId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPatients(data);
          console.log(data); // Console logging the response
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };

      fetchPatients();
    }
  }, [doctorId]);

  return (
    <div>
      <h2>Patient List</h2>
      {/* Render patient data here */}
    </div>
  );
};

export default PatientList;