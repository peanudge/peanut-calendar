import React from 'react'
import { createContainer } from './domManipulator';
import { AppointmentForm } from "../src/AppointmentForm";
import ReactTestUtils from "react-dom/test-utils";
import { AppointmentFormData } from '../src/types';

const findOption = (dropdownNode: HTMLSelectElement, textContent: string) => {
    const options = Array.from(dropdownNode.childNodes) as HTMLOptionElement[];
    return options.find(o => o.textContent === textContent);
}

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
    ): HTMLSelectElement | null => {
      const parentForm = form("appointment");
      if (!parentForm) return null;

      const fields = parentForm.elements.namedItem(fieldName);
      if (!fields) return null;
      if (fields instanceof NodeList) {
        return [...fields][0] as HTMLSelectElement;
      } else {
        return fields as HTMLSelectElement;
      }
    };

    const labelFor = (
        fieldName: string
    ): HTMLLabelElement | null => {
        return container.querySelector(`label[for=${fieldName}]`)
    }

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
        it("initially has a blank value chosen", () => {
            render(<AppointmentForm />);
            const firstNode = field("service")?.firstChild as HTMLOptionElement;
            expect(firstNode!.value).toEqual("");
            expect(firstNode!.selected).toBeTruthy();
        })

        it("lists all salon services", () => {
            const selectableServices = [
                "Cut",
                "Blow-dry",
            ];

            render(<AppointmentForm selectableServices={selectableServices} />);
            const optionNodes = Array.from(field("service")!.childNodes);
            const renderedServices = optionNodes.map(
                (node) => node.textContent
            );
            
            expect(renderedServices).toEqual(
                expect.arrayContaining(selectableServices)
            );
        });

        it("pre-selects the existing value", () => {
            const selectableServices = ["Cut", "Blow-dry"];
            render(<AppointmentForm selectableServices={selectableServices} service="Blow-dry" />);
            const option = findOption(field("service")!, "Blow-dry");
            expect(option!.selected).toBeTruthy();
        });

        it("renders a label", () => {
            render(
                <AppointmentForm />
            );
            expect(labelFor("service")?.textContent).toEqual("Service")
        });

        it("assign an id that matches the label id", () => {
            render(
                <AppointmentForm />
            );
            expect(field("service")?.id).toEqual("service")
        })

        it("saves existing value when submitted", async () => {
            expect.hasAssertions();
            render(
              <AppointmentForm
                service={"existing value"}
                onSubmit={(props: AppointmentFormData) => {
                  expect(props.service).toEqual("existing value");
                }}
              />
            );
            await ReactTestUtils.Simulate.submit(form("appointment")!);
        })

        it("saves new value when submitted", async () => {
            expect.hasAssertions();
            render(
                <AppointmentForm service={"existing value"} onSubmit={(props: AppointmentFormData) => {
                    expect(props.service).toEqual("new value");
                }}/>
            )
            await ReactTestUtils.Simulate.change(field("service")!, {
              target: { name: "service", value: "new value" } as HTMLSelectElement,
            });

            await ReactTestUtils.Simulate.submit(form("appointment")!);
        })
    })
})
