import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

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
      setQrCodeUrl(data.doctor.qr_code_url);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleRegister} style={{ marginBottom: '20px' }}>
        <TextField
          label="Doctor Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
        <TextField
          label="Clinic Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      {qrCodeUrl && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Your QR Code
            </Typography>
            <QRCode value={qrCodeUrl} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DoctorRegistration;
