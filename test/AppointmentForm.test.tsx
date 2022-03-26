import React from 'react'
import { createContainer } from './domManipulator';
import { AppointmentForm } from "../src/AppointmentForm";

describe("AppointmentForm", () => {
    let render: Function;
    let container: ReactDOM.Container;
    
    beforeEach(() => {
        ({ render, container } = createContainer());
    })

    const form = (id: string): HTMLFormElement | null =>
      container.querySelector(`form[id="${id}"]`);

    const field = (
      fieldName: string
    ): HTMLInputElement | HTMLSelectElement | null => {
      const parentForm = form("appointment");
      if (!parentForm) return null;

      const fields = parentForm.elements.namedItem(fieldName);
      if (!fields) return null;
      if (fields instanceof NodeList) {
        return [...fields][0] as HTMLInputElement;
      } else {
        return fields as HTMLInputElement;
      }
    };

    it("renders a form", () => {
        render(<AppointmentForm />);
        expect(form('appointment')).not.toBeNull();
    });

    describe("service field", () => {
        it("renders as a select box", () => {
            render(<AppointmentForm />);
            expect(field("service")).not.toBeNull();
            expect(field("service")?.tagName).toEqual("SELECT");
        })
    })
})
