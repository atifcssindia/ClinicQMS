import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // Perform validation if needed
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Store the token in local storage or in-memory storage as preferred
        localStorage.setItem("token", data.token);
        console.log("here is data", data);
        // Redirect based on the role
        switch (data.role) {
          case "doctor":
            // console.log(data);
            navigate("/doctorview");
            break;
          case "receptionist":
            navigate("/receptionview");
            break;
          default:
            // Handle other roles or lack thereof
            throw new Error("Unknown role");
        }
      } else {
        // Handle errors, such as showing an alert to the user
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      // Handle errors
      console.error("Login error:", error);
      alert(error.message || "Network error");
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/generateOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber, // replace this with the actual state variable you have for phoneNumber
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data.message);
        // Handle UI changes, like showing an input field for entering OTP
      } else {
        // Handle the case where OTP sending failed
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.log(error);
      console.error("Error sending OTP:", error);
      // Handle errors, maybe show a message to the user
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/verifyDoctorOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            otp: otp,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store the token in local storage or in-memory storage as preferred
        localStorage.setItem("token", data.token);
        console.log("here is data", data);
        // Redirect based on the role
        switch (data.role) {
          case "doctor":
            navigate("/doctorview");
            break;
          case "receptionist":
            navigate("/receptionview");
            break;
          default:
            // Handle other roles or lack thereof
            throw new Error("Unknown role");
        }
      } else {
        // Handle the case where OTP sending failed
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message || "Login failed");
      // Handle errors, maybe show a message to the user
    }
  };

  const handleToggleOtpForm = () => {
    setShowOtpForm(!showOtpForm);
  };

  return (
    <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
      <div className="flex h-full">
        <div
          // style={{
          //   backgroundImage: `url("images/intro.png")`,
          // }}
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex  relative bg-[#2E37A4]  xl:w-5/12"
        >
          <img src="images/pattern.png" className=" absolute  z-0 left-0" />
          <img src="images/login-02.png" className=" absolute  z-0 left-0" />
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

        <div className="flex flex-col justify-center items-center  xl:w-7/12 bg-[#f5f5f6]">
          <div className="xl:w-7/12">
            <div className=" bg-white  px-14 py-12  rounded-2xl">
              <div className="mb-8">
                <h3 className="mb-1 text-xl font-bold">Welcome back!</h3>
                <p className="text-gray-600">
                  Please enter your credentials to sign in!
                </p>
              </div>

              {showOtpForm ? (
                <>
                  <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Button onClick={handleSendOtp} variant="contained" fullWidth>
                    Send OTP
                  </Button>
                  <TextField
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Button
                    onClick={handleVerifyOtp}
                    variant="contained"
                    fullWidth
                  >
                    Verify OTP
                  </Button>
                  <Button variant="text" onClick={handleToggleOtpForm}>
                    Back to Email/Password
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Button
                    type="submit"
                    onClick={handleLogin}
                    variant="contained"
                    fullWidth
                  >
                    Login
                  </Button>
                  <Button variant="text" onClick={handleToggleOtpForm}>
                    Or login through OTP
                  </Button>
                </>
              )}

              <Button variant="text" onClick={() => navigate("/Registration")}>
                Don't have an account? Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
