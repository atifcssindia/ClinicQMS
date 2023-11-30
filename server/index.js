const express = require('express');
const { insertPatient, insertAppointment, findPatientByContactNumber } = require('./db');
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

app.get('/', (req, res) => {
  res.send('Hello, VitalX!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
