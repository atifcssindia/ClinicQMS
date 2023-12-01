const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const insertPatient = async (patientName, patientAge, patientWeight, patientContactNumber) => {
  const res = await pool.query(
    'INSERT INTO Patient(patient_name, patient_age, patient_weight, patient_contact_number) VALUES($1, $2, $3, $4) RETURNING *',
    [patientName, patientAge, patientWeight, patientContactNumber]
  );
  return res.rows[0];
};

const getNextAppointmentNumber = async (doctorId) => {
  const currentDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
  const res = await pool.query(
    'SELECT COUNT(*) FROM Appointment WHERE doctor_id = $1 AND date_time::date = $2',
    [doctorId, currentDate]
  );
  return parseInt(res.rows[0].count) + 1; // Next appointment number
};


const insertAppointment = async (patientId, doctorId) => {
  const appointmentNumber = await getNextAppointmentNumber(doctorId);
  const res = await pool.query(
    'INSERT INTO Appointment(patient_id, doctor_id, date_time, status, appointment_number) VALUES($1, $2, NOW(), 0, $3) RETURNING *',
    [patientId, doctorId, appointmentNumber]
  );
  return res.rows[0];
};

const findPatientByContactNumber = async (contactNumber) => {
  const res = await pool.query(
    'SELECT * FROM Patient WHERE patient_contact_number = $1',
    [contactNumber]
  );
  return res.rows[0]; // Returns undefined if no patient is found
};

const updateDoctorQRCode = async (doctorId, qrCodeUrl) => {
  await pool.query('UPDATE Doctor SET qr_code_url = $1 WHERE doctor_id = $2', [qrCodeUrl, doctorId]);
};

const insertDoctor = async (doctorName, clinicName) => {
  // Insert doctor without QR code URL initially
  const insertRes = await pool.query(
    'INSERT INTO Doctor(doctor_name, clinic_name) VALUES($1, $2) RETURNING doctor_id',
    [doctorName, clinicName]
  );
  const doctorId = insertRes.rows[0].doctor_id;

  // Generate QR Code URL with doctor_id
  const qrCodeURL = `https://thriving-bonbon-27d691.netlify.app/?doctorId=${doctorId}`;

  // Update doctor with QR code URL
  await updateDoctorQRCode(doctorId, qrCodeURL);

  return { doctor_id: doctorId, doctor_name: doctorName, clinic_name: clinicName, qr_code_url: qrCodeURL };
};

module.exports = { insertPatient, insertAppointment, findPatientByContactNumber, insertDoctor, updateDoctorQRCode };
