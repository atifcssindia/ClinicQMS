import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AdminLayout from "./AdminLayout";
import MyBreakcrumbs from "./components/MyBreadcrumbs";
import MyTable from "./components/MyTable";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDoctorId(decodedToken.doctor_id);
    }
  }, []);

  useEffect(() => {
    // Only fetch patients if doctorId is set
    if (doctorId) {
      const fetchPatients = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/patients?doctorId=${doctorId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setPatients(data);
          console.log(data); // Console logging the response
        } catch (error) {
          console.error("Error fetching patients:", error);
        }
      };

      fetchPatients();
    }
  }, [doctorId]);

  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Department", accessor: "specialization" },
    { Header: "Specialization", accessor: "focus" },
    { Header: "Degree", accessor: "qualifications" },
    { Header: "Mobile", accessor: "phone" },
    { Header: "Joining Date", accessor: "date" },
    // Add more columns as needed
  ];

  const breadcrumbs = [
    {
      label: "Home",
      href: "#",

      class: "text-[#2E37A4]",
    },
    { label: "Patients List", class: "text-[#2E37A4]" },
  ];

  const data = [
    {
      name: "Andrea Lalema",
      specialization: "Otolaryngology",
      focus: "Infertility",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Smith Bruklin",
      specialization: "Urology",
      focus: "Prostate",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "William Stephin",
      specialization: "Radiology",
      focus: "Cancer",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Bernardo James",
      specialization: "Dentist",
      focus: "Prostate",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Cristina Groves",
      specialization: "Gynecology",
      focus: "Prostate",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Mark Hay Smith",
      specialization: "Gynecology",
      focus: "Prostate",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Andrea Lalema",
      specialization: "Otolaryngology",
      focus: "Infertility",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
    {
      name: "Smith Bruklin",
      specialization: "Urology",
      focus: "Prostate",
      qualifications: "MBBS, MS",
      phone: "+1 23 456890",
      date: "01.10.2022",
    },
  ];

  return (
    <div>
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
                  Patients List
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
              <MyTable columns={columns} data={data} />
            </div>
            {/* Render the table */}
          </div>
        </div>
        {/* other compoent  */}
      </AdminLayout>
    </div>
  );
};

export default PatientList;