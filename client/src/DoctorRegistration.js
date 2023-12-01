import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const DoctorRegistration = () => {
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/registerDoctor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor_name: doctorName, clinic_name: clinicName }),
      });
      const data = await response.json();
      setQrCodeUrl(data.doctor.qr_code_url); // Use the URL from the response
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Doctor Name"
        />
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Clinic Name"
        />
        <button type="submit">Register</button>
      </form>
      {qrCodeUrl && <QRCode value={qrCodeUrl} />}
    </div>
  );
};

export default DoctorRegistration;
