import React, { useState } from 'react';
import { CustomerData, AppointmentData, Timestamp } from './types';

const appointmentTimeOfDay = (startsAt: Timestamp) => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
}

type AppointmentProps = {
  startsAt: number;
  customer: CustomerData;
  stylist?: string;
  notes?: string;
  service?: string;
};
export const Appointment: React.FC<AppointmentProps> = ({
  startsAt,
  customer: { firstName, lastName, phoneNumber },
  stylist,
  notes,
  service,
}) => {
  const appointmentTitle = `${appointmentTimeOfDay(startsAt)}`;
  return (
    <div>
      <h1>{appointmentTitle}</h1>
      <table>
        <tbody>
          <tr>
            <td>Customer</td>
            <td>{`${firstName} ${lastName ?? ""}`}</td>
          </tr>
          <tr>
            <td>Phone number</td>
            <td>{phoneNumber ?? "Empty"}</td>
          </tr>
          <tr>
            <td>Stylist</td>
            <td>{stylist ?? "Empty"}</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>{service ?? "Empty"}</td>
          </tr>
          <tr>
            <td>Notes</td>
            <td>{notes ?? "Empty"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

type AppointmentsDayViewProps = {
  appointments: AppointmentData[];
};
export const AppointmentsDayView: React.FC<AppointmentsDayViewProps> = ({
  appointments,
}) => { 
  const [ selectedAppointment, setSelectedAppointment ] = useState(0);

  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  ); 
}