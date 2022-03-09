export type Timestamp = number;

export type AppointmentData = {
  startsAt: Timestamp;
  customer: CustomerData;
};
export type CustomerData = {
  firstName: string;
};