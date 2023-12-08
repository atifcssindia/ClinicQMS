const express = require('express');
const { insertPatient, getTodaysAppointments, insertAppointment, findPatientByContactNumber, insertDoctor, updateDoctorQRCode,insertUser, findUserByEmail,setNextPatientStatus ,setPatientStatusTreated ,getDoctorIdFromUserId,updateAppointmentStatuses,getPeopleAheadCount,storeOTP, verifyOTP, findUserByPhoneNumber} = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
const { createServer } = require('http');
const { Server } = require('socket.io');
const axios = require('axios');


require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://thriving-bonbon-27d691.netlify.app', 'https://app.vitalx.in'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // Be sure to restrict the origin in production
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket) => {
  socket.on('requestPeopleAheadUpdate', async ({ doctorId, appointmentNumber }) => {
    try {
      const peopleAhead = await getPeopleAheadCount(appointmentNumber, doctorId);
      console.log("peopleAhead", peopleAhead);
      socket.emit('updatePeopleAhead', { peopleAhead });
    } catch (error) {
      console.error('Error fetching people ahead count:', error);
    }
  });

  socket.on('disconnect', () => {
  });
});

app.post('/register', async (req, res) => {
  try {
    const { patient_name, patient_age, patient_weight, patient_contact_number, doctor_id, gender } = req.body;
    // Check if patient already exists
    let patient = await findPatientByContactNumber(patient_contact_number);

    if (!patient) {
      // If patient doesn't exist, create new patient
      patient = await insertPatient(patient_name, patient_age, patient_weight, patient_contact_number, gender);
    }

    // Create a new appointment with doctorId
    const { appointment, peopleAhead } = await insertAppointment(patient.patient_id, doctor_id);

    
    res.status(201).json({ patient, appointment, peopleAhead });
    io.emit('appointmentsUpdated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


const generateOTP = () => {
  // Generate a 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
};

app.post('/generateOTP', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();

  try {
    await storeOTP(phoneNumber, otp);
    // Send OTP via SMS
    const url=`http://control.yourbulksms.com/api/sendhttp.php?authkey=39306c4031323332303650&mobiles=91${phoneNumber}&message=OTP ${otp} ERP login : VITALX EVOKES&sender=URBLKM&route=2&country=91&DLT_TE_ID=1707169641090797992`;
    const response = await axios.get(url);
    console.log(response.data); // Log the response from the SMS service for debugging
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending OTP');
  }
});

app.post('/verifyOTP', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const isVerified = await verifyOTP(phoneNumber, otp);
    if (isVerified) {
      res.json({ success: true, patientExists: await findPatientByContactNumber(phoneNumber), message: "OTP verified successfully." });
    } else {
      res.status(401).send('Invalid OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send('Server error');
  }
});

app.post('/verifyDoctorOTP', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const isOtpValid = await verifyOTP(phoneNumber, otp); // Implement this function to check OTP validity

    if (isOtpValid) {
      // Find the user by phone number
      const user = await findUserByPhoneNumber(phoneNumber); // Implement this function

      if (user) {
        // Generate a JWT token for the user
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with token and user role
        res.json({ success: true, token, role: user.role });
      } else {
        // Handle case where user is not found
        res.status(404).send('User not found');
      }
    } else {
      // Handle invalid OTP
      res.status(401).send('Invalid OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).send('Server error');
  }
});

app.get('/peopleAhead', async (req, res) => {
  const { doctorId, appointmentNumber } = req.query;

  try {
    const peopleAhead = await getPeopleAheadCount(appointmentNumber, doctorId);
    res.json({ peopleAhead });
  } catch (error) {
    console.error('Error fetching people ahead count:', error);
    res.status(500).send('Server error');
  }
});

app.post('/registerDoctor', async (req, res) => {
  try {
    const { doctor_name, clinic_name } = req.body;
    let doctor = await insertDoctor(doctor_name, clinic_name);

    // Generate QR code URL with doctor_id
    const qrCodeURL = `https://app.vitalx.in/?doctorId=${doctor.doctor_id}`;
    await updateDoctorQRCode(doctor.doctor_id, qrCodeURL);

    // Send updated doctor info, including QR code URL
    res.status(201).json({ doctor: {...doctor, qr_code_url: qrCodeURL} });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/auth/register', async (req, res) => {
  const { email, password, role, doctor_name, clinic_name, phone_number, isMobileOTPAuthenticated } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user and get user_id
    const user = await insertUser(email, hashedPassword, role, phone_number, isMobileOTPAuthenticated);

    let doctor;
    if (role === 'doctor') {
      // Insert doctor and get doctor_id
      doctor = await insertDoctor(user.user_id, doctor_name, clinic_name);

      // Generate QR code URL with doctor_id
      const qrCodeURL = `https://thriving-bonbon-27d691.netlify.app/?doctorId=${doctor.doctor_id}`;
      await updateDoctorQRCode(doctor.doctor_id, qrCodeURL);

      doctor.qr_code_url = qrCodeURL;
    }

    // Create a token
    const token = jwt.sign({ user_id: user.user_id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user info
    res.status(201).json({ token, user, doctor }); // doctor will be undefined if role is not 'doctor'
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Server error');
  }
});


app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.hashed_password)) {
      const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

app.post('/appointments/next', async (req, res) => {
  const userId = req.body.userId;

  try {
    const doctorId = await getDoctorIdFromUserId(userId);
    if (!doctorId) {
      return res.status(404).send('Doctor not found');
    }

    const nextAppointmentId = await updateAppointmentStatuses(doctorId);

    if (nextAppointmentId) {
      res.status(200).json({ message: 'Queue updated', nextAppointmentId });

      // Emitting to all sockets to update their people ahead count
      io.emit('queueUpdated', { doctorId });
    } else {
      res.status(200).json({ message: 'No more appointments in the queue' });
    }
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).send('Server error');
  }
});


app.get('/', (req, res) => {
  res.send('Hello, VitalX!');
});

app.get('/appointments/today', async (req, res) => {
  const userId = req.query.userId; // Assuming you pass doctorId as a query parameter
  const date = req.query.date; // Optional: if a date is passed as a query parameter

  try {
    const appointments = await getTodaysAppointments(userId, date ? new Date(date) : undefined);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).send('Server error');
  }
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});