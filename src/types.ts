export type Timestamp = number;

export type AppointmentData = {
  startsAt: Timestamp;
  customer: CustomerData;
  stylist?: string;
  service?: string;
  notes?: string;
};
export type CustomerData = {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
};