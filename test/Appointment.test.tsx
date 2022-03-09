import React from 'react';
import ReactDOM from "react-dom";
import { Appointment } from "../src/Appointment";

describe("Appointment", () => {
    let container: ReactDOM.Container | null = null;
    let customer;

    beforeEach(() => {
        container = document.createElement('div');
    })

    const render = (
      component: React.ReactElement
    ) => ReactDOM.render(component, container);

    it("renders the customer first name", () => {
        const customer = { firstName: "Ashley" }
        render(<Appointment customer={customer} />);
        expect(container!.textContent).toMatch("Ashley");
    });

    it("renders another customer first name", () => {
        const customer = { firstName: "Jordan" };
        render(<Appointment customer={customer} />);
        expect(container!.textContent).toMatch("Jordan");
    });
 });