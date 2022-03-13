import React from 'react';
import { CustomerForm } from '../src/CustomerForm';
import { createContainer } from './domManipulator';

describe("CustomerForm", () => {
    let render: Function;
    let container: ReactDOM.Container;

    beforeEach(() => {
        ({ render, container } = createContainer());
    })
    const form = (id: string): HTMLFormElement | null =>
      container.querySelector(`form[id=${id}]`);

    const field = (fieldName: string): HTMLInputElement | null => {
        const parentForm = form('customer');
        if (!parentForm) return null;
        
        const fields = parentForm.elements.namedItem(fieldName);
        if (!fields) return null;
        if (fields instanceof NodeList) {
            return [...fields][0] as HTMLInputElement;
        } else {
            return fields as HTMLInputElement;
        }
    }
        
    const expectToBeInputFieldOfTypeText = (formElement: HTMLInputElement) => {
        expect(formElement).not.toBeNull();
        expect(formElement.tagName).toEqual('INPUT');
        expect(formElement.type).toEqual('text');
    }

    it("renders a form", () => {
        render(<CustomerForm />);
        expect(form("customer")).not.toBeNull();
    });

    const firstNameField = () => field("firstName");

    it("renders the first name field as a text box", () => {
        render(<CustomerForm />);
        expectToBeInputFieldOfTypeText(firstNameField()!);
    });

    it("includes the existing value for the first name", () => {
        render(<CustomerForm firstName="Ashley" />);
        expect(firstNameField()!.value).toEqual("Ashley");
    })

    const labelFor = (formElement:string) => container.querySelector(`label[for=${formElement}]`)

    it("renders a label for the first name field", () => {
        render(<CustomerForm />);
        expect(labelFor("firstName")).not.toBeNull();
        expect(labelFor("firstName")?.textContent).toEqual("First Name");
    });

    it("assign an id that matches the label id to the first name field", () => {
        render(<CustomerForm />);
        expect(firstNameField()?.id).toEqual('firstName');
    })
});