import React from 'react'

type CustomerFormProps = {
    firstName?: string;
}
export const CustomerForm:React.FC<CustomerFormProps> = ({firstName}) => {
    return <form id="customer" >
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" readOnly name="firstName" type="text" value={firstName}/>
    </form>
}

