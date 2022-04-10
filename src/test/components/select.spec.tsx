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
  it("Tests Select rendering", () => {
    const { baseElement } = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests rendering of multiple Select elements", () => {
    const { baseElement } = render(
      <>
        <Select
          testId="1"
          items={items}
          onChange={(item) => onChange(item)}
        ></Select>
        <Select
          testId="2"
          items={items}
          onChange={(item) => onChange(item)}
        ></Select>
      </>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests Select onChange", () => {
    const select = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    fireEvent.change(select.getByTestId("select"), { target: { value: 1 } });
    expect(onChange).toBeCalledWith(items[1]);
  });

  it("Tests Select onChange with undefined item", () => {
    const select = render(
      <Select items={items} onChange={(item) => onChange(item)}></Select>,
    );

    fireEvent.change(select.getByTestId("select"), { target: { value: 5 } });
    expect(onChange).toBeCalledWith(undefined);
  });

  it("Tests `current`-value without testId", () => {
    const { baseElement } = render(
      <Select
        current={items[1].label}
        items={items}
        onChange={(item) => onChange(item)}
      ></Select>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("Tests `current`-value with testId", () => {
    const { baseElement } = render(
      <Select
        current={items[1].label}
        testId="1"
        items={items}
        onChange={(item) => onChange(item)}
      ></Select>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
