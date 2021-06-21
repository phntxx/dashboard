import { fireEvent, render } from "@testing-library/react";
import Imprint, { IImprintProps, ImprintField } from "../../components/imprint";

const props: IImprintProps = {
  name: {
    text: "Test Name",
    link: "#",
  },
  address: {
    text: "Test Address",
    link: "#",
  },
  phone: {
    text: "Test Phone",
    link: "#",
  },
  email: {
    text: "Test Email",
    link: "#",
  },
  url: {
    text: "Test URL",
    link: "#",
  },
  text: "This is a test!",
};

describe("imprint.tsx", () => {
  beforeEach(() => {
    delete global.window.location;
    global.window = Object.create(window);
    global.window.location = {
      port: "123",
      protocol: "http:",
      hostname: "localhost",
      href: "test",
    };
  });

  it("Tests Imprint", () => {
    const { asFragment } = render(<Imprint imprint={props} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("Tests #imprint", () => {
    const location = window.location.href;
    window.location.href = location + "#imprint";

    const imprintModal = render(<Imprint imprint={props} />);

    fireEvent.click(imprintModal.getByTestId("toggle-button"));
    //fireEvent.click(imprintModal.getByTestId("close-button"));

    expect(window.location.href).toEqual(location);
  });

  it("Tests ImprintField", () => {
    const { asFragment } = render(<ImprintField field={props.name} />);
    expect(asFragment).toMatchSnapshot();
  });
});
