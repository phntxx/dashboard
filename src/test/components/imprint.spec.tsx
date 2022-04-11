import { fireEvent, render } from "@testing-library/react";
import Imprint, {
  IImprintProps,
  ImprintField,
  onClose,
} from "../../components/imprint";

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
  const location: Location = window.location;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;

    window.location = {
      ...location,
      reload: jest.fn(),
    };
  });

  it("Tests Imprint", () => {
    const { baseElement } = render(<Imprint imprint={props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it("Tests onClose with #imprint", () => {
    const location = window.location.href;
    window.location.href = location + "#imprint";
    onClose();
    expect(window.location.href).toEqual(location);
  });

  it("Tests onClose without #imprint", () => {
    const location = window.location.href;
    onClose();
    expect(window.location.href).toEqual(location);
  });

  it("Tests ImprintField", () => {
    const { baseElement } = render(<ImprintField field={props.name} />);
    expect(baseElement).toMatchSnapshot();
  });
});
