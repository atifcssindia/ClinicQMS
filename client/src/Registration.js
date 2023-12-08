import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
// import QRCode from 'qrcode.react';

const Registration = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  // const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generateOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // replace this with the actual state variable you have for phoneNumber
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log(data.message);
        // Handle UI changes, like showing an input field for entering OTP
      } else {
        // Handle the case where OTP sending failed
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.log(error);
      console.error('Error sending OTP:', error);
      // Handle errors, maybe show a message to the user
    }
  };

  const handleVerifyOtp = async () => {
    const otpPayload = {
      phoneNumber: phoneNumber, 
      otp: otp, 
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(otpPayload),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log(data.message);
        // Set your state based on the response
        setIsOtpVerified(true);
      } else {
        console.error('Invalid OTP');
        // Set your state based on the response
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle errors, maybe show a message to the user
    }
  };
  

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      // Add proper error handling for UI
      alert("Passwords do not match"); // Simple alert, consider a better UX for displaying errors
      return;
    }

    // Define the role, for example, 'doctor' or 'receptionist'
    const role = "doctor"; // This should be dynamic based on the form, if you have different roles to register

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role,
            doctor_name: doctorName,
            clinic_name: clinicName,
            phone_number: phoneNumber,
            isMobileOTPAuthenticated: true
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle successful registration
        console.log("Registration successful:", data);
        // Redirect to /doctorview or /receptionview based on the user type
        if (role === "doctor") {
          navigate("/doctorview");
        } else {
          // Handle other roles or a default case
        }
      } else {
        // Handle errors, such as invalid input or user already exists
        console.error("Registration failed:", response.statusText);
        alert("Registration failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      <div className="grid lg:grid-cols-3 h-full">
        <div
          style={{
            backgroundImage: `url("images/intro.png")`,
          }}
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex  relative"
        >
          <div className="logo text-5xl text-white">VitalX</div>

          <div>
            {/* <div className="mb-6 flex items-center gap-4">
              <span className="avatar avatar-circle avatar-md border-2 border-white"></span>
              <div className="text-white">
                <div className="font-semibold text-base">Brittany Hale</div>
                <span className="opacity-80">CTO, Onward</span>
              </div>
            </div> */}
            <p className="text-lg text-white opacity-80">
            Transform your clinic with digital efficiency in under 30 minutes.
            </p>
          </div>

          
        </div>

        <div className="col-span-2 flex flex-col justify-center items-center bg-white ">
          <div className="xl:w-6/12 px-8">
            <div className="mb-8">
              <h3 className="mb-1 text-xl font-bold">Sign Up</h3>
              <p className="text-gray-600">
                And lets get started with your free trial
              </p>
            </div>

            <div style={{ padding: "0" }}>
              <form onSubmit={handleRegister} style={{ marginBottom: "20px" }}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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
                  <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button onClick={handleSendOtp}>Send OTP</Button>
                  <TextField
                    label="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <Button onClick={handleVerifyOtp}>Verify OTP</Button>

                <Button type="submit" variant="contained" color="primary" disabled={!isOtpVerified}>
                  Register
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
