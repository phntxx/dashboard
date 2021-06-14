import { fireEvent, render, screen } from "@testing-library/react";
import Icon, { IconButton } from "../../components/icon"

const props = {
  name: "bug_report",
  size: "20px",
  onClick: () => console.log("test")
}

it('Icon test', () => {
  const { asFragment } = render(<Icon name={props.name} size={props.size}/>);
  expect(asFragment).toMatchSnapshot();
})

it('IconButton test', () => {
  const { asFragment } = render(<IconButton icon={props.name} onClick={props.onClick} />);
  expect(asFragment).toMatchSnapshot();
  
  const handleClick = jest.fn()
  render(<IconButton icon="question_answer" onClick={handleClick} />);
  fireEvent.click(screen.getByText(/question_answer/i))
  expect(handleClick).toHaveBeenCalledTimes(1)
})