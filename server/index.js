const express = require('express');
const { insertPatient, insertAppointment, findPatientByContactNumber, insertDoctor, updateDoctorQRCode } = require('./db');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
app.use(cors());

app.use(cors({
  origin: 'http://localhost:3000'
}));

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

      // Update QR code URL with doctor_id (this is a workaround)
      doctor.qr_code_url += doctor.doctor_id;
      await updateDoctorQRCode(doctor.doctor_id, doctor.qr_code_url);

      res.status(201).json({ doctor });
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
