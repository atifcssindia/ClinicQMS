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

const getDoctorIdFromUserId = async (userId) => {
  const res = await pool.query(
    'SELECT doctor_id FROM doctor WHERE user_id = $1',
    [userId]
  );
  
  return res.rows[0].doctor_id; // Assuming that each user_id has exactly one doctor_id
};

const getTodaysAppointments = async (userId, date = new Date()) => {
  console.log('userId in getTodaysAppointments: ', userId);
  const doctorId = await getDoctorIdFromUserId(userId);
  // Format the date as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0];
  
  const query = `
    SELECT * FROM appointment
    WHERE doctor_id = $1 AND date_time::date = $2
    ORDER BY date_time ASC;`;
  
  const values = [doctorId, formattedDate];
  
  try {
    const res = await pool.query(query, values);
    return res.rows;
  } catch (err) {
    console.error('Error fetching appointments:', err);
    throw err; // Rethrow the error and handle it in your route
  }
};

const getNextAppointmentNumber = async (doctorId) => {
  const currentDate = new Date().toISOString().slice(0, 10); // Format as YYYY-MM-DD
  const res = await pool.query(
    'SELECT COUNT(*) FROM Appointment WHERE doctor_id = $1 AND date_time::date = $2',
    [doctorId, currentDate]
  );
  const nextNumber = parseInt(res.rows[0].count) + 1;
  return nextNumber;
}

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

const insertDoctor = async (userId, doctorName, clinicName) => {
  // Insert doctor without QR code URL initially
  const insertRes = await pool.query(
    'INSERT INTO Doctor(user_id, doctor_name, clinic_name) VALUES($1, $2, $3) RETURNING doctor_id',
    [userId, doctorName, clinicName]
  );
  const doctorId = insertRes.rows[0].doctor_id;

  // Generate QR Code URL with doctor_id
  const qrCodeURL = `https://thriving-bonbon-27d691.netlify.app/?doctorId=${doctorId}`;

  // Update doctor with QR code URL
  await pool.query('UPDATE Doctor SET qr_code_url = $1 WHERE doctor_id = $2', [qrCodeURL, doctorId]);

  return { doctor_id: doctorId, doctor_name: doctorName, clinic_name: clinicName, qr_code_url: qrCodeURL };
};



const insertUser = async (email, hashedPassword, role) => {
  const res = await pool.query(
    'INSERT INTO users (email, hashed_password, role) VALUES ($1, $2, $3) RETURNING user_id, role',
    [email, hashedPassword, role]
  );
  return res.rows[0];
};

const findUserByEmail = async (email) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return res.rows[0];
};


module.exports = { insertPatient,getTodaysAppointments, insertAppointment, findPatientByContactNumber, insertDoctor, updateDoctorQRCode,insertUser, findUserByEmail };
