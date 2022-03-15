import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import { CustomerForm } from "../src/CustomerForm";
import { createContainer } from "./domManipulator";

describe("CustomerForm", () => {
  let render: Function;
  let container: ReactDOM.Container;

  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  const form = (id: string): HTMLFormElement | null =>
    container.querySelector(`form[id=${id}]`);

  const field = (fieldName: string): HTMLInputElement | null => {
    const parentForm = form("customer");
    if (!parentForm) return null;

    const fields = parentForm.elements.namedItem(fieldName);
    if (!fields) return null;
    if (fields instanceof NodeList) {
      return [...fields][0] as HTMLInputElement;
    } else {
      return fields as HTMLInputElement;
    }
  };

  const labelFor = (formElement: string) =>
    container.querySelector(`label[for=${formElement}]`);

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });

  const expectToBeInputFieldOfTypeText = (formElement: HTMLInputElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const itRenderAsTextBox = (fieldName: string) =>
    it("renders as a text box", () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName)!);
    });

  const itIncludesTheExistingValue = (fieldName: string) =>
    it("includes the existing value", () => {
      render(<CustomerForm {...{ [fieldName]: "value" }} />);
      expect(field(fieldName)!.value).toEqual("value");
    });

  const itRenderLabel = (fieldName: string, value: string) =>
    it("renders a label", () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName)?.textContent).toEqual(value);
    });

  const itAssignLabelId = (fieldName: string) =>
    it("assign an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field(fieldName)?.id).toEqual(fieldName);
    });

  const itSubmitsExistingValue = (fieldName: string) =>
    it("saves existing value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "existing value" }}
          onSubmit={(props: any) => {
            expect(props[fieldName]).toEqual("existing value");
          }}
        />
      );
      await ReactTestUtils.Simulate.submit(form("customer")!);
    });
  const itSubmitsNewValue = (fieldName: string, value: string) =>
    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "existing value" }}
          onSubmit={(props: any) => {
            expect(props[fieldName]).toEqual(value);
          }}
        />
      );

      await ReactTestUtils.Simulate.change(field(fieldName)!, {
        target: { value } as HTMLInputElement,
      });

      await ReactTestUtils.Simulate.submit(form("customer")!);
    });
  describe("first name field", () => {
    itRenderAsTextBox("firstName");
    itIncludesTheExistingValue("firstName");
    itRenderLabel("firstName", "First Name");
    itAssignLabelId("firstName");
    itSubmitsExistingValue("firstName");
    itSubmitsNewValue("firstName", "firstName");
  });
    
  describe("last name field", () => {
    itRenderAsTextBox("lastName");
    itIncludesTheExistingValue("lastName");
    itRenderLabel("lastName", "Last Name");
    itAssignLabelId("lastName");
    itSubmitsExistingValue("lastName");
    itSubmitsNewValue("lastName", "lastName");
  });
  describe("phone number field", () => {
     itRenderAsTextBox("phoneNumber");
     itIncludesTheExistingValue("phoneNumber");
     itRenderLabel("phoneNumber", "Phone Number");
     itAssignLabelId("phoneNumber");
     itSubmitsExistingValue("phoneNumber");
     itSubmitsNewValue("phoneNumber", "phoneNumber");
  });
});
