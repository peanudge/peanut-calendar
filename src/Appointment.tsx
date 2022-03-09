import React, { useState } from 'react';
import { CustomerData, AppointmentData, Timestamp } from './types';

const appointmentTimeOfDay = (startsAt: Timestamp) => {
    const [h, m] = new Date(startsAt).toTimeString().split(':');
    return `${h}:${m}`;
}

type AppointmentProps = {
  customer: CustomerData;
};
export const Appointment: React.FC<AppointmentProps> = ({
  customer: { firstName },
}) => {
  return <div>{firstName}</div>;
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