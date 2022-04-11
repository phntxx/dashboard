import { fireEvent, render } from "@testing-library/react";
import Modal, { IModalProps } from "../../components/modal";

const iconProps: IModalProps = {
  element: "icon",
  icon: "bug_report",
  title: "Test Modal",
  onClose: jest.fn(),
  children: <p>Hello</p>,
};

const invalidIconProps: IModalProps = {
  element: "icon",
  title: "Test Modal",
  onClose: jest.fn(),
  children: <p>Hello</p>,
};

const textProps: IModalProps = {
  element: "text",
  text: "Test",
  title: "Test Modal",
  onClose: jest.fn(),
  children: <p>Hello</p>,
};

const noneProps: IModalProps = {
  element: "none",
  title: "Test Modal",
  children: <p>Hello</p>,
};

const setup = (props: IModalProps) => {
  const modal = render(
    <Modal
      element={props.element}
      icon={props.icon}
      text={props.text}
      title={props.title}
      onClose={props.onClose}
    >
      {props.children}
    </Modal>,
  );

  return modal;
};

describe("modal.tsx", () => {
  it("Tests modal with icon button", () => {
    const modal = setup(iconProps);
    expect(modal.baseElement).toMatchSnapshot();
    fireEvent.click(modal.getByTestId("toggle-button"));
    fireEvent.click(modal.getByTestId("close-button"));
    expect(iconProps.onClose).toHaveBeenCalledTimes(2);
  });

  it("Tests modal with text button", () => {
    const modal = setup(textProps);
    expect(modal.baseElement).toMatchSnapshot();
    fireEvent.click(modal.getByTestId("toggle-button"));
    fireEvent.click(modal.getByTestId("close-button"));
    expect(textProps.onClose).toHaveBeenCalledTimes(2);
  });

  it("Tests modal with neither", () => {
    const modal = setup(noneProps);
    expect(modal.baseElement).toMatchSnapshot();
  });

  it("Tests modal with icon", () => {
    const modal = setup(invalidIconProps);
    expect(modal.baseElement).toMatchSnapshot();
    fireEvent.click(modal.getByTestId("toggle-button"));
    fireEvent.click(modal.getByTestId("close-button"));
    expect(invalidIconProps.onClose).toHaveBeenCalledTimes(2);
  });

  it("Tests modal without onClose behaviour", () => {
    const modal = setup(noneProps);
    expect(modal.baseElement).toMatchSnapshot();
    fireEvent.click(modal.getByTestId("close-button"));
    expect(iconProps.onClose).toHaveBeenCalledTimes(0);
  });
});
