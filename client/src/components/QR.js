import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import AdminLayout from "../AdminLayout";
import QRCode from "qrcode.react";

const QR = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const fetchDoctorId = async () => {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setDoctorId(decodedToken.doctor_id);
      setDoctorName(decodedToken.doctorName);
    };

    fetchDoctorId();
  }, []);

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
    const printWindow = window.open("", "_blank");
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const QRCodeElement = (
    <div
      id="printableQRCode"
      className=" flex justify-center -mt-20  drop-shadow-lg"
    >
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

        <div className=" xl:pt-8 flex justify-center">
          <div className=" lg:w-5/12 xl:w-4/12">
            <div className=" text-2xl font-bold  text-white text-center pt-5 pb-20 bg-gradient-to-r from-[#7257d8] to-[#99ccff] drop-shadow-lg">
              Dr. {doctorName}
            </div>
            <div className=" bg-white p-7 border border-gray-200">
              <div className=" mx-auto w-full  flex justify-center" />
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
              <button
                className="min-w-[131px] text-base font-medium rounded-lg py-2 px-5  bg-[#2E37A4] text-white"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QR;
