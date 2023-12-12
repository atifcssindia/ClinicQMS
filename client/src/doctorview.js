import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import AdminLayout from "./AdminLayout";
import MyTable from "./components/MyTable";
import MyBreakcrumbs from "./components/MyBreadcrumbs";

const DoctorView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async (decodedToken) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/today?userId=${decodedToken.user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
      } else {
        console.error("Failed to fetch appointments", response);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleNextPatient = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/next`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: decodedToken.user_id }),
        }
      );

      if (response.ok) {
        await fetchAppointments(decodedToken); // Re-fetch appointments after updating the status
      } else {
        console.error("Failed to update the next patient", response);
      }
    } catch (error) {
      console.error("Error updating the next patient:", error);
    }
  };

  const handleCheckIn = async (appointmentId) => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/appointments/checkin/${appointmentId}`, // Adjust the URL according to your API endpoint
        {
          method: "POST", // or PUT, depending on your API design
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: decodedToken.user_id }), // Include any other necessary data
        }
      );

      if (response.ok) {
        await fetchAppointments(decodedToken); // Re-fetch appointments after updating the status
      } else {
        console.error("Failed to check in the patient", response);
      }
    } catch (error) {
      console.error("Error checking in the patient:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentDate = new Date();
      // Check if token is expired
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (decodedToken.role === "doctor") {
        setIsLoggedIn(true);

        // Fetch appointments only if the user is a doctor
        fetchAppointments(decodedToken);
      } else {
        navigate("/login"); // Redirect if the user is not a doctor
      }
    } else {
      navigate("/login"); // Redirect if there is no token
    }
  }, [navigate]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL);

    // Listen for 'appointmentsUpdated' event
    socket.on("appointmentsUpdated", () => {
      // Fetch updated appointments list
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        fetchAppointments(decodedToken); // This will update the appointments based on the userId
      }
    });

    // Cleanup function to run when the component is unmounted
    return () => {
      socket.off("appointmentsUpdated");
      socket.disconnect();
    };
  }, []);

  if (!isLoggedIn) {
    // Render nothing or a loading indicator while checking for token and role
    return null; // or <LoadingIndicator />;
  }

  const columns = [
    { Header: "Seq No", accessor: "seq_no" },
    { Header: "Patient Details", accessor: "patient_details" },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        // Check if the city is "Indore"
        if (value === "Completed") {
          // Render custom HTML for "Indore"
          return (
            <span className="bg-green-100 text-green-800  text-[12px] xl:text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              {" "}
              {value}
            </span>
          );
        }

        // Default rendering for other cities
        return (
          <span className="bg-yellow-100 text-yellow-800  text-[12px] xl:text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {value}
          </span>
        );
      },
    },
    {
      Header: "Check-in",
      accessor: "checkin", // This can be a dummy accessor since the actual functionality will be in the Cell
      Cell: ({ row }) => {
        // Check if the status of the patient is 'waiting'
        if (row.original.status === "waiting") {
          // Render the check-in button
          return (
            <button
              className=" px-2.5 py-1 bg-[#2E37A4] rounded-md shadow-lg text-[12px] xl:text-sm text-white cursor-pointer hover:bg-[#1a238f]"
              onClick={() => handleCheckIn(row.original.id)}
            >
              Check-in
            </button>
          );
        }
        // If the patient is not waiting, you can return null or some placeholder
        return null;
      },
    },
    // Add more columns as needed
  ];

  const breadcrumbs = [
    {
      label: "Home",
      href: "#",

      class: "text-[#2E37A4]",
    },
    { label: "Appointments List", class: "text-[#2E37A4]" },
  ];

  //

  return (
    <AdminLayout>
      {/* other compoent  */}
      <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8">
        <div className="pt-2 pb-6">
          <MyBreakcrumbs data={breadcrumbs} />
        </div>

        <div className=" bg-white rounded-xl shadow-md shadow-gray-200 ">
          <div className=" px-5 py-3 flex flex-wrap md:flex-nowrap justify-between items-center gap-y-5">
            <div>
              <div className=" text-lg  font-semibold  text-gray-800">
                Appointments List
              </div>
            </div>

            <div className=" inline-flex hidden">
              <form className=" relative w-[200px] xl:w-[270px]">
                <input
                  type="text"
                  className=" h-11  px-5 w-full pl-10 bg-transparent rounded-lg

                  text-gray-900 ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 outline-none focus:ring-inset focus:ring-indigo-600
                  "
                  placeholder="Search here"
                />
                <a
                  className=" absolute left-2.5 top-2.5"
                  href="https://www.app.vitalx.in"
                >
                  <img src="images/icons/search-normal.svg" alt="" />
                </a>
              </form>
            </div>
          </div>

          <div className=" overflow-auto">
            <MyTable
              columns={columns}
              data={appointments}
              onCheckIn={handleCheckIn}
            />
          </div>
          {/* Render the table */}
          <div className="px-5 py-5">
            <button
              onClick={handleNextPatient}
              className="min-w-[131px] text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] text-white"
            >
              Next Patient
            </button>{" "}
          </div>
        </div>
      </div>
      {/* other compoent  */}
    </AdminLayout>
  );
};

export default DoctorView;
