import React from 'react';
import { Customer } from './types/customer';

type Props = {
    customer: Customer;
}
export const Appointment: React.FC<Props> = ({
    customer: { firstName }
}) => {
    return <div>{firstName}</div>;
}
