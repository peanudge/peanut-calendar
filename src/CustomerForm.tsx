import React, { useState } from 'react'

type CustomerFormProps = {
    firstName?: string;
    onSubmit?: ({ firstName }: {firstName?: string})=> void
}
export const CustomerForm: React.FC<CustomerFormProps> = ({ firstName, onSubmit }) => {
    const [customer, setCustomer] = useState({firstName});
    const handleChangeFirstName = ({ target } : React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ firstName: target.value })
    }
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
        </form>
    );
};

