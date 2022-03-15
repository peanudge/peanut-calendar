import React, { useState } from "react";
import { CustomerData } from "./types";

type CustomerFormProps = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  onSubmit?: (customer: CustomerData) => void;
};
export const CustomerForm: React.FC<CustomerFormProps> = ({
  firstName = "",
  lastName = "",
  phoneNumber = "",
  onSubmit,
}) => {
  const [customer, setCustomer] = useState<CustomerData>({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer((c) => ({ ...c, [target.name]: target.value }));
  };
  return (
    <form id="customer" onSubmit={() => onSubmit && onSubmit(customer)}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={firstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        value={lastName}
        onChange={handleChange}
      />
      <label htmlFor="phoneNumber">Phone Number</label>

      <input
        id="phoneNumber"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
      ></input>
    </form>
  );
};
