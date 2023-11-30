const { Pool } = require('pg');
const pool = new Pool({
  user: 'yashitgarg',
  host: 'localhost',
  database: 'data',
  port: 5432,
});

const insertPatient = async (patientName, patientAge, patientWeight, patientContactNumber) => {
  const res = await pool.query(
    'INSERT INTO Patient(patient_name, patient_age, patient_weight, patient_contact_number) VALUES($1, $2, $3, $4) RETURNING *',
    [patientName, patientAge, patientWeight, patientContactNumber]
  );
  return res.rows[0];
};

const insertAppointment = async (patientId) => {
  const res = await pool.query(
    'INSERT INTO Appointment(patient_id, date_time, status) VALUES($1, NOW(), 0) RETURNING *',
    [patientId]
  );
  return res.rows[0];
};

module.exports = { insertPatient, insertAppointment };
