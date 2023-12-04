import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(process.env.REACT_APP_API_URL);
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

  // const backgroundImageAuth = "./auth-side-bg.jpg";

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
              <h3 className="mb-1 text-xl font-bold">Welcome back!</h3>
              <p className="text-gray-600">
                Please enter your credentials to sign in!
              </p>
            </div>

            <div style={{ padding: "0" }}>
              <form onSubmit={handleLogin} style={{ marginBottom: "20px" }}>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </form>
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
