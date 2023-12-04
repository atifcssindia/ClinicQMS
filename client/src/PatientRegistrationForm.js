import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const PatientRegistrationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [appointmentNumber, setAppointmentNumber] = useState(null);

  useEffect(() => {
    // Extract doctorId from URL query parameters
    const query = new URLSearchParams(window.location.search);
    const doctorId = query.get("doctorId");
    setDoctorId(doctorId);
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventt the default form submit action

    const patientData = {
      patient_name: name,
      patient_age: age,
      patient_weight: weight,
      patient_contact_number: contactNumber,
      doctor_id: doctorId,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAppointmentNumber(data.appointment.appointment_number); // Set the appointment number here
        console.log("Registration successful:", data);
        // Additional logic upon successful registration, like redirecting or showing a success message
      } else {
        // Handle server errors (response not OK)
        console.error(
          "Registration failed:",
          response.status,
          response.statusText
        );
        // Show error message to the user, if appropriate
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
      // Show error message to the user, if appropriate
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
              <h3 className="mb-1 text-xl font-bold">Hello Patient</h3>
              <p className="text-gray-600">Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={handleNameChange}
              />
              <TextField
                label="Age"
                variant="outlined"
                fullWidth
                margin="normal"
                value={age}
                onChange={handleAgeChange}
              />
              <TextField
                label="Weight"
                variant="outlined"
                fullWidth
                margin="normal"
                value={weight}
                onChange={handleWeightChange}
              />
              <TextField
                label="ContactNumber"
                variant="outlined"
                fullWidth
                margin="normal"
                value={contactNumber}
                onChange={handleContactNumberChange}
              />
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </form>
            {appointmentNumber && (
              <Card style={{ marginTop: 20 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Appointment Number
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {appointmentNumber}
                  </Typography>
                  <Typography variant="body2">
                    Please wait for your turn.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistrationForm;
