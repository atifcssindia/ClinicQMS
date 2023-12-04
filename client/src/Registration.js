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
  // const [qrCodeUrl, setQrCodeUrl] = useState('');

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
            backgroundImage: `url("images/auth-side-bg.jpg")`,
          }}
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex  relative"
        >
          <div className="logo text-5xl text-white">ClinicQMS</div>

          <div>
            {/* <div className="mb-6 flex items-center gap-4">
              <span className="avatar avatar-circle avatar-md border-2 border-white"></span>
              <div className="text-white">
                <div className="font-semibold text-base">Brittany Hale</div>
                <span className="opacity-80">CTO, Onward</span>
              </div>
            </div> */}
            <p className="text-lg text-white opacity-80">
              Elstar comes with a complete set of UI components crafted with
              Tailwind CSS, it fulfilled most of the use case to create modern
              and beautiful UI and application
            </p>
          </div>

          <span className="text-white">
            Copyright © 2023 <span className="font-semibold">CSS India</span>{" "}
          </span>
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
                <Button type="submit" variant="contained" color="primary">
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
