import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AppointmentsTable = ({ appointments }) => {
  console.log('appointment data: ', appointments);

  return (
    <TableContainer component={Paper} className=" !shadow-none !drop-shadow-md">
      <Table sx={{ minWidth: 650 }} aria-label="appointments table">
        <TableHead className=" !border-b-2">
          <TableRow>
            <TableCell className=" !font-semibold !text-gray-700">Seq No</TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">Patient Details</TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className=" ">
          {appointments.map((appointment) => (
            <TableRow
              key={appointment.appointment_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {appointment.seq_no}
              </TableCell>
              <TableCell align="right">{appointment.patient_details}</TableCell>
              <TableCell align="right">{appointment.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
