import React from 'react';
import ReactDOM from "react-dom";
import ReacTestUtils from "react-dom/test-utils";
import { Appointment, AppointmentsDayView } from "../src/AppointmentsDayView";
import { AppointmentData, CustomerData } from '../src/types';
import { createContainer } from './domManipulator';

describe("Appointment", () => {
    let container: ReactDOM.Container;
    let render: Function;
   
    const today = new Date();
    
    beforeEach(() => {
        ({ container, render } = createContainer());
    })

    it("renders the customer Name, PhoneNumber, Service, Notes, Stylist", () => {
        const customer: CustomerData = {
            firstName: "Ashley",
            lastName: "Kim",
            phoneNumber: "010-0000-0000"
        }
        
         render(
          <Appointment
            customer={customer}
            startsAt={today.setHours(13, 0)}
            stylist={"Test Stylist"}
            notes={"This is test notes"}
            service={"Cleaning"}
          />
        );
        expect(container?.textContent).toMatch("13:00");
        expect(container?.textContent).toMatch("Ashley Kim");
        expect(container?.textContent).toMatch("010-0000-0000");
        expect(container?.textContent).toMatch("Test Stylist");
        expect(container?.textContent).toMatch("This is test notes");
        expect(container?.textContent).toMatch("Cleaning");
    });

    it("renders another customer Name, PhoneNumber, Service, Notes", () => {
        const customer = {
            firstName: "Jordan",
            lastName: "Kim",
            phoneNumber: "010-0000-0000",
        };
         render(<Appointment customer={customer} startsAt={0} />);
        expect(container?.textContent).toMatch("Jordan Kim");
        expect(container?.textContent).toMatch("010-0000-0000");
    });
});
 
describe("AppointmentsDayView", () => {
    let container: ReactDOM.Container;
    let render: Function;

    const today = new Date();
    const appointments: AppointmentData[] = [
      { startsAt: today.setHours(12, 0), customer: { firstName: "Ashley" } },
      { startsAt: today.setHours(13, 0), customer: { firstName: "Jordan" } },
    ];
    beforeEach(() => {
        ({ container, render } = createContainer());
    })

    it("renders a div with the right id", () => {
         render(<AppointmentsDayView appointments={appointments} />);
        expect(container?.querySelector('div#appointmentsDayView')).not.toBeNull();
    });

    it("renders multiple appointments in a ol elements", () => {
         render(<AppointmentsDayView appointments={appointments} />);
        expect(container?.querySelector('ol')).not.toBeNull();
        expect(container?.querySelector('ol')?.children).toHaveLength(2);
    })

    it("renders each appointment in a li", () => {
         render(<AppointmentsDayView appointments={appointments} />);
        expect(container?.querySelectorAll('li')).toHaveLength(2);
        expect(container?.querySelectorAll("li")[0].textContent)
            .toEqual("12:00");
        expect(container?.querySelectorAll('li')[1].textContent)
            .toEqual('13:00');
    });

    it("initially shows a message saying there are no appointments today", () => {
         render(<AppointmentsDayView appointments={[]} />);
        expect(container?.textContent).toMatch(
            'There are no appointments scheduled for today'
        );
    });

    it("selects the first appointment by default", () => {
         render(<AppointmentsDayView appointments={appointments} />);
        expect(container?.textContent).toMatch('Ashley');
    })

    it("has a button element in each li", () => {
         render(<AppointmentsDayView appointments={appointments} />);
        expect(container?.querySelectorAll('li > button')).toHaveLength(2);
        expect(container?.querySelectorAll('li > button')[0].tagName).toEqual('BUTTON');
    })

    it('renders another appointment when selected', () => {
         render(<AppointmentsDayView appointments={appointments} />);
        const button: HTMLButtonElement = container?.querySelectorAll(
          "button"
        )[1] as HTMLButtonElement;

        ReacTestUtils.Simulate.click(button);

        expect(container?.textContent).toMatch('Jordan');
    })
})