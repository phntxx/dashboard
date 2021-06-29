import { fireEvent, render, screen } from "@testing-library/react";
import Icon, { IconButton } from "../../components/icon";

const props = {
  name: "bug_report",
  size: "20px",
  onClick: jest.fn(),
};

it("Icon test", () => {
  const { asFragment } = render(<Icon name={props.name} size={props.size} />);
  expect(asFragment).toMatchSnapshot();
});

it("Icon test (no size)", () => {
  const { asFragment } = render(<Icon name={props.name} />);
  expect(asFragment).toMatchSnapshot();
});

it("IconButton test", () => {
  const iconButton = render(
    <IconButton icon={props.name} onClick={props.onClick} />,
  );

  expect(iconButton.asFragment).toMatchSnapshot();

  fireEvent.click(screen.getByText(/bug_report/i));
  expect(props.onClick).toHaveBeenCalledTimes(1);
});
