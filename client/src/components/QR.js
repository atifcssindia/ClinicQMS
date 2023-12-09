import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import AdminLayout from "../AdminLayout";
import QRCode from 'qrcode.react';

const QR = () => {
  const [doctorId, setDoctorId] = useState(null);


  useEffect(() => {
    const fetchDoctorId = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
  
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getDoctorId?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setDoctorId(data.doctorId);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
  
    fetchDoctorId();
    // Since we're only interested in running this effect on mount, the dependency array is empty
  }, []);
  
  // Separate useEffect for logging doctorId
  useEffect(() => {
    if (doctorId !== undefined) { // Assuming the initial state for doctorId is undefined
      console.log(doctorId);
    }
  }, [doctorId]);

  const handlePrint = () => {
    const qrCodeElement = document.getElementById("printableQRCode");
    const html = `
      <html>
        <head>
          <style>
            body {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${qrCodeElement.innerHTML}
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const QRCodeElement = (
    <div id="printableQRCode">
      {doctorId && (
        <QRCode
          value={`https://app.vitalx.in/?doctorId=${doctorId}`}
          size={256}
          level={"H"}
          includeMargin={true}
        />
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8">
        {/* <h1 className=" text-xl font-semibold text-gray-800 mb-2">
          Appointments
        </h1> */}

        <div className=" pt-8 flex justify-center">
          <div className=" lg:w-5/12 xl:w-4/12">
            <div className=" text-2xl font-bold  text-white text-center py-5 bg-blue-400 drop-shadow-lg">
              Dr. Carolyn Perkins
            </div>
            <div className=" drop-shadow-lg bg-white p-7">
              <div
                className=" mx-auto w-full "
              />
              {QRCodeElement}
            </div>
            <div className=" text-2xl font-bold  text-gray-800 text-center pt-5">
              Scan me (QR Code){" "}
            </div>
            <div className=" text-lg pt-4 text-center">
              Patients often forget to ask questions about their upcoming
              procedure.
            </div>

            <div className="mx-auto text-center mt-3">
              <Button variant="contained" onClick={handlePrint}>Print</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QR;
