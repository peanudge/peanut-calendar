import React, { useState } from "react";

type CustomerFormProps = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  onSubmit?: ({ firstName }: { firstName?: string }) => void;
};
export const CustomerForm: React.FC<CustomerFormProps> = ({
  firstName,
  lastName,
  phoneNumber,
  onSubmit,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });
  const handleChangeFirstName = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, firstName: target.value }));
  };
  const handleChangeLastName = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, lastName: target.value }));
  };
  const handleChangePhoneNumber = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((prev) => ({ ...prev, phoneNumber: target.value }));
  };
  return (
    <form id="customer" onSubmit={() => onSubmit && onSubmit(customer)}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChangeFirstName}
        value={firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={lastName}
        onChange={handleChangeLastName}
      />
      <label htmlFor="phoneNumber">Phone Number</label>

      <input
        id="phoneNumber"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChangePhoneNumber}
      ></input>
    </form>
  );
};
