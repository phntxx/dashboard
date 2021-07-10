import { fireEvent, render } from "@testing-library/react";
import Select, { IItemProps } from "../../components/select";

const onChange = jest.fn();
const items: Array<IItemProps> = [
  {
    label: "Test 1",
    value: 0,
  },
  {
    label: "Test 2",
    value: 1,
  },
];

describe("select.tsx", () => {
  it("Tests select rendering", () => {
    const { asFragment } = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    expect(asFragment).toMatchSnapshot();
  });

  it("Tests select onChange", () => {
    const select = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    fireEvent.change(select.getByTestId("select"), { target: { value: 1 } });
    expect(onChange).toBeCalledWith(items[1]);
  });

  it("Tests select onChange with undefined item", () => {
    const select = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    fireEvent.change(select.getByTestId("select"), { target: { value: 5 } });
    expect(onChange).toBeCalledWith(undefined);
  });
});
