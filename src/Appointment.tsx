import React from 'react';
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
}) => <div id="appointmentsDayView">
        <ol>
            {appointments.map(appointment => <li key={appointment.startsAt}>
                {appointmentTimeOfDay(appointment.startsAt)}
            </li>)}
    </ol>
</div>;