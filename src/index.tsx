import React from 'react'
import ReactDOM from 'react-dom';
import { AppointmentForm } from './AppointmentForm';
import { AppointmentsDayView } from './AppointmentsDayView'; 
import { sampleAppointments } from "./sampleData";

ReactDOM.render(
  <AppointmentForm selectableServices={["A","B", "C"]} />,
  document.getElementById("root")
);