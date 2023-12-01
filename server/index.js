const express = require('express');
const { insertPatient, insertAppointment, findPatientByContactNumber, insertDoctor, updateDoctorQRCode } = require('./db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
app.use(cors());
require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://thriving-bonbon-27d691.netlify.app'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const { patient_name, patient_age, patient_weight, patient_contact_number } = req.body;

    // Check if patient already exists
    let patient = await findPatientByContactNumber(patient_contact_number);

    if (!patient) {
      // If patient doesn't exist, create new patient
      patient = await insertPatient(patient_name, patient_age, patient_weight, patient_contact_number);
    }
    // Create a new appointment
    const appointment = await insertAppointment(patient.patient_id);

    res.status(201).json({ patient, appointment });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/registerDoctor', async (req, res) => {
  try {
    const { doctor_name, clinic_name } = req.body;
    let doctor = await insertDoctor(doctor_name, clinic_name);

    // Generate QR code URL with doctor_id
    const qrCodeURL = `https://thriving-bonbon-27d691.netlify.app/?doctorId=${doctor.doctor_id}`;
    await updateDoctorQRCode(doctor.doctor_id, qrCodeURL);

    // Send updated doctor info, including QR code URL
    res.status(201).json({ doctor: {...doctor, qr_code_url: qrCodeURL} });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



app.get('/', (req, res) => {
  res.send('Hello, VitalX!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
