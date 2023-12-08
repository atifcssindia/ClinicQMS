import { Button } from "@mui/material";
import AdminLayout from "../AdminLayout";

const QR = () => {
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
              <img
                src="images/QR_Code_example.png"
                className=" mx-auto w-full "
                alt="test"
              />
            </div>
            <div className=" text-2xl font-bold  text-gray-800 text-center pt-5">
              Scan me (QR Code){" "}
            </div>
            <div className=" text-lg pt-4 text-center">
              Patients often forget to ask questions about their upcoming
              procedure.
            </div>

            <div className="mx-auto text-center mt-3">
              <Button variant="contained">Print</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QR;
