import React, { useState } from "react";
import { AppointmentFormData } from "./types";

type AppointmentFormProps = {
  selectableServices?: string[];
  service?: string;
  onSubmit?: (appointment: AppointmentFormData) => void;
};

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectableServices = [],
  service = "",
  onSubmit,
}) => {
  const [appointment, setAppointment] = useState<AppointmentFormData>({
    service,
  });

  const handleSubmit = () => {
    onSubmit && onSubmit(appointment);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setAppointment((appointment) => ({
      ...appointment,
      [target.name]: target.value,
    }));
  };

  return (
    <form id="appointment" onSubmit={handleSubmit}>
      <label htmlFor="service">Service</label>
      <select
        id="service"
        name="service"
        value={appointment.service}
        onChange={handleChange}
      >
        <option/>
        {selectableServices.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>
    </form>
  );
};
