import { fireEvent, render, screen } from "@testing-library/react";
import Icon, { IconButton } from "../../components/icon";

const props = {
  name: "bug_report",
  size: "20px",
  onClick: jest.fn(),
};

it("Icon test", () => {
  const { baseElement } = render(<Icon name={props.name} size={props.size} />);
  expect(baseElement).toMatchSnapshot();
});

it("Icon test (no size)", () => {
  const { baseElement } = render(<Icon name={props.name} />);
  expect(baseElement).toMatchSnapshot();
});

it("IconButton test", () => {
  const iconButton = render(
    <IconButton icon={props.name} onClick={props.onClick} />,
  );

  expect(iconButton.baseElement).toMatchSnapshot();

  fireEvent.click(screen.getByText(/bug_report/i));
  expect(props.onClick).toHaveBeenCalledTimes(1);
});
