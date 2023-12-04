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
  return (
    <TableContainer component={Paper} className=" !shadow-none !drop-shadow-md">
      <Table sx={{ minWidth: 650 }} aria-label="appointments table">
        <TableHead className=" !border-b-2">
          <TableRow>
            <TableCell className=" !font-semibold !text-gray-700">
              Appointment ID
            </TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">
              Patient ID
            </TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">
              Date & Time
            </TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">
              Status
            </TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">
              Doctor ID
            </TableCell>
            <TableCell className=" !font-semibold !text-gray-700" align="right">
              Appointment Number
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className=" ">
          {appointments.map((appointment) => (
            <TableRow
              key={appointment.appointment_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {appointment.appointment_id}
              </TableCell>
              <TableCell align="right">{appointment.patient_id}</TableCell>
              <TableCell align="right">
                {new Date(appointment.date_time).toLocaleString()}
              </TableCell>
              <TableCell align="right">{appointment.status}</TableCell>
              <TableCell align="right">{appointment.doctor_id}</TableCell>
              <TableCell align="right">
                {appointment.appointment_number}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
