import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { io } from "socket.io-client";
import InputComponent from "./components/InputComponent";

const PatientRegistrationForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [doctorId, setDoctorId] = useState(null);
  const [appointmentNumber, setAppointmentNumber] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [peopleAhead, setPeopleAhead] = useState(null);
  const [gender, setGender] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(false); // New state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  // const [patientDetails, setPatientDetails] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages


  useEffect(() => {
    // Extract doctorId from URL query parameters
    const query = new URLSearchParams(window.location.search);
    const doctorId = query.get("doctorId");
    setDoctorId(doctorId);
  }, []);

  useEffect(() => {
    // Connect to WebSocket server
    const socket = io(process.env.REACT_APP_API_URL);

    // Listen for queue updates
    socket.on("queueUpdated", async () => {
      if (doctorId && appointmentNumber) {
        // Fetch the updated people ahead count
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/peopleAhead?doctorId=${doctorId}&appointmentNumber=${appointmentNumber}&_=${new Date().getTime()}`
        );
        const data = await response.json();
        setPeopleAhead(data.peopleAhead);
      }
    });

    // Cleanup on unmount
    return () => socket.disconnect();
  }, [doctorId, appointmentNumber]);



  const isValidPhoneNumber = (number) => {
    return /^\d{10}$/.test(number); // Regex to check for a 10-digit number
  };
  
  // const isValidOTP = (otp) => {
  //   return /^\d{4}$/.test(otp); // Regex for 4-digit OTP
  // };
  
  const isNumeric = (value) => {
    return /^\d+$/.test(value); // Regex to check for numeric value
  };
  
  const allFieldsFilled = () => {
    return (
      name && age && weight && contactNumber && gender && otp
    );
  };


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeChange = (event) => {
    if (isNumeric(event.target.value)) {
      setAge(event.target.value);
    }
  };
  
  const handleWeightChange = (event) => {
    if (isNumeric(event.target.value)) {
      setWeight(event.target.value);
    }
  };
  

  const handleContactNumberChange = (event) => {
    const input = event.target.value;
    // Allow input if it's numeric and up to 10 digits long
    if (input === '' || (isNumeric(input) && input.length <= 10)) {
      setContactNumber(input);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Preventt the default form submit action
    setIsRegistering(true);
    setErrorMessage("");

    const patientData = {
      patient_name: name,
      patient_age: age,
      patient_weight: weight,
      patient_contact_number: contactNumber,
      doctor_id: doctorId,
      gender: gender,
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
        setPeopleAhead(data.peopleAhead);
        setRegistrationCompleted(true);
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
    } finally {
      setIsRegistering(false);
    }

    if (!allFieldsFilled()) {
      setErrorMessage("Please fill in all fields correctly.");
      setIsRegistering(false);
      return;
    }
  };

  const handleSendOtp = async () => {
    // Check if the phone number is valid
    if (!isValidPhoneNumber(contactNumber)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return; // Exit the function if the phone number is not valid
    }
  
    setErrorMessage(""); // Clear any previous error messages
  
    // Proceed with sending OTP
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/generateOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: contactNumber }),
        }
      );
  
      const data = await response.json();
      if (data.success) {
        setOtpSent(true); // Update state for UI change
      } else {
        // Handle error in sending OTP
        console.error("Error sending OTP");
        setErrorMessage("Error in sending OTP. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Network error:", error);
      setErrorMessage("Network error. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    // Clear any previous error messages
    setErrorMessage("");
  
    // Proceed with OTP verification
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/verifyOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: contactNumber, otp }),
        }
      );
  
      const data = await response.json();
  
      if (data.success) {
        setOtpVerified(true);
        // setPatientDetails(data.patientExists);
        if (data.patientExists) {
          setGender(data.patientExists.gender);
          setAge(data.patientExists.patient_age);
          setContactNumber(data.patientExists.patient_contact_number);
          setName(data.patientExists.patient_name);
          setWeight(data.patientExists.patient_weight);
        }
      } else {
        // Handle invalid OTP
        console.error("Invalid OTP");
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
      setErrorMessage("Error verifying OTP. Please try again.");
    }
  };

  const genderOptions = [
    { value: "", label: "" },
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "O", label: "Other" },
  ];

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh] max-h-auto">
      <div className="flex h-full">
        <div
          // style={{
          //   backgroundImage: `url("images/intro.png")`,
          // }}
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex  relative bg-[#2E37A4]  w-full xl:w-5/12"
        >
          <img
            src="images/pattern.png"
            className=" absolute  z-0 left-0"
            alt=""
          />
          <img
            src="images/login-02.png"
            className=" absolute  z-0 left-0"
            alt=""
          />
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

        <div className="flex flex-col  lg:justify-center items-center  w-full xl:w-7/12 bg-[#f5f5f6] pt-5 xl:pt-0">
          <div className="xl:w-7/12">
            <div className=" bg-white  px-14 py-12  rounded-2xl">
              <div className="mb-8">
                <h3 className="mb-1 text-xl font-bold">Hello Patient</h3>
                <p className="text-gray-600">Please enter your details</p>
              </div>
              {!otpSent && (
                <>
                  <div className=" inline-flex flex-col w-full relative  mb-6">
                    <label
                      htmlFor="contactNumber"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="contactNumber"
                      value={contactNumber}
                      type="text"
                      onChange={handleContactNumberChange}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleSendOtp}
                    className="min-w-[131px] w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                  >
                    Send OTP
                  </button>

                  {/* <div className="flex">
                    <div className=" w-8/12">
                      <TextField
                        label="Phone Number"
                        value={contactNumber}
                        onChange={handleContactNumberChange}
                        className=" w-full"
                      />
                    </div>
                    <div className=" w-4/12 text-center  self-center">
                      <Button onClick={handleSendOtp}>Send OTP</Button>
                    </div>
                  </div> */}
                </>
              )}
              {otpSent && !otpVerified && (
                <>
                  <div className=" inline-flex flex-col w-full relative  mb-6">
                    <label
                      htmlFor="otp"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      Enter OTP
                    </label>

                    <input
                      id="otp"
                      value={otp}
                      type="text"
                      onChange={(e) => setOtp(e.target.value)}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleVerifyOtp}
                    className="min-w-[131px] w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                  >
                    Verify OTP
                  </button>
                  {/* <div className="flex">
                    <div className=" w-8/12">
                      <TextField
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div className=" w-4/12 text-center  self-center">
                      <Button onClick={handleVerifyOtp}>Verify OTP</Button>
                    </div>
                  </div> */}
                </>
              )}
              {otpVerified && (
                <form onSubmit={handleSubmit}>
                  <InputComponent
                    label="Name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    type="text"
                  />
                  <InputComponent
                    label="Age"
                    id="age"
                    value={age}
                    onChange={handleAgeChange}
                    type="tel"
                  />
                  <InputComponent
                    label="Weight"
                    id="weight"
                    value={weight}
                    onChange={handleWeightChange}
                    type="text"
                  />
                  <InputComponent
                    label="Contact Number"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                    type="tel"
                  />
                  <InputComponent
                    label="Gender"
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    type="select"
                    options={genderOptions}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                  />
                  <button
                    type="submit"
                    className="min-w-[131px] w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                    disabled={isRegistering || registrationCompleted}
                  >
                    Register
                  </button>

                  {/* <TextField
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
                    <TextField
                      select
                      label="Gender"
                      value={gender}
                      onChange={handleGenderChange}
                      margin="normal"
                      fullWidth
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value=""></option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </TextField>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isRegistering || registrationCompleted}
                    >
                      Register
                    </Button> */}
                </form>
              )}

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
              {peopleAhead != null && (
                <Typography variant="body2">
                  {peopleAhead === 0 ? (
                    "Your turn is coming up next!"
                  ) : (
                    `${peopleAhead} people ahead of you.`
                  )}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="error-message" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      )}

    </div>
  );
};

export default PatientRegistrationForm;
