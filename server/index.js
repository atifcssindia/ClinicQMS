const express = require('express');
const { insertPatient, insertAppointment } = require('./db');
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON bodies

app.post('/register', async (req, res) => {
  try {
    const { patient_name, patient_age, patient_weight, patient_contact_number } = req.body;

    // Insert new patient
    const patient = await insertPatient(patient_name, patient_age, patient_weight, patient_contact_number);

    // Insert new appointment
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
