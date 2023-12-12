import React, { useState } from "react";
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
    <div className="app-layout-blank flex flex-auto flex-wrap xl:flex-nowrap flex-col h-[100vh]">
      <div className="flex h-full w-full">
        <div
          // style={{
          //   backgroundImage: `url("images/intro.png")`,
          // }}
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex  relative bg-gradient-to-t from-[#2E37A4] from-5% via-[#81bbf5] via-30% to-white to-80% w-full xl:w-5/12 drop-shadow"
        >
          <img
            src="images/pattern.png"
            className=" absolute  z-0 left-0 bottom-0 opacity-100 w-full h-full"
            alt=""
          />
          <img
            src="images/login-02.png"
            className=" absolute  z-0 left-0 bottom-0"
            alt=""
          />
          <div className=" relative overflow-hidden">
            <img src="images/new_vitalX_logo.svg" className=" w-4/12" />
          </div>

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

        <div className="flex flex-col  lg:justify-center items-center w-full  xl:w-7/12 bg-[#f5f5f6] pt-5 xl:pt-0">
          <div className="xl:w-7/12 px-5">
            <div className=" bg-white  px-8 md:px-10 xl:px-14 py-12  rounded-2xl drop-shadow">
              <div className="mb-8">
                <h3 className="mb-1 text-xl font-bold">Welcome back!</h3>
                <p className="text-gray-600">
                  Please enter your credentials to sign in!
                </p>
              </div>

              {showOtpForm ? (
                <>
                  <div className=" inline-flex flex-col w-full relative mb-5">
                    <label
                      htmlFor="phoneNumber"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phoneNumber"
                      value={phoneNumber}
                      type="contact"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleSendOtp}
                    className="min-w-[131px]  w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                  >
                    Send OTP
                  </button>

                  <div className=" inline-flex flex-col w-full relative mb-5 mt-10">
                    <label
                      htmlFor="otp"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      OTP
                    </label>

                    <input
                      id="otp"
                      value={otp}
                      type="contact"
                      onChange={(e) => setOtp(e.target.value)}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={handleVerifyOtp}
                    className="min-w-[131px]  w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                  >
                    Verify OTP
                  </button>

                  <div className="flex gap-x-2 mt-5">
                    <span className=" text-gray-500"> Back to</span>
                    <button
                      onClick={handleToggleOtpForm}
                      className="text-[#2E37A4] font-semibold"
                    >
                      {" "}
                      Email/Password
                    </button>{" "}
                  </div>

                  {/* <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                    fullWidth
                  />
                  <Button onClick={handleSendOtp} variant="contained" fullWidth disabled={otpSent}>
                    Send OTP
                  </Button>
                  {otpSent && ( // Conditionally render these fields
                    <>
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
                    </>
                  )}
                  <Button variant="text" onClick={handleToggleOtpForm}>
                    Back to Email/Password
                  </Button> */}
                </>
              ) : (
                <>
                  <div className=" inline-flex flex-col w-full relative mb-6">
                    <label
                      htmlFor="email"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  <div className=" inline-flex flex-col w-full relative  mb-6">
                    <label
                      htmlFor="password"
                      className=" absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className=" min-h-[45px] w-full px-5 outline-none border-2 border-gray-200  rounded-md  focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>

                  {/* <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    fullWidth
                    className=" h-10"
                  /> */}
                  {/* <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    fullWidth
                  /> */}
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="min-w-[131px] w-full text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] hover:bg-[#1a238f] text-white"
                  >
                    Login
                  </button>
                </>
              )}

              <div className=" mt-5">
                <span className=" text-gray-500">
                  {" "}
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/Registration")}
                    className="text-[#2E37A4] font-semibold"
                  >
                    {" "}
                    Register
                  </button>{" "}
                </span>
              </div>
            </div>
          </div>
          {showOtpForm ? (
            <></>
          ) : (
            <>
              {" "}
              <div className=" inline-flex gap-x-2 mt-5 text-gray-500">Or</div>
              <div className=" inline-flex gap-x-2 mt-5">
                <button
                  onClick={handleToggleOtpForm}
                  className="min-w-[131px] w-full text-base font-medium rounded-lg py-2 px-5 border bg-white hover:text-white border-[#2E37A4] hover:bg-[#2E37A4] text-[#1a238f]"
                >
                  {" "}
                  Login via OTP
                </button>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
