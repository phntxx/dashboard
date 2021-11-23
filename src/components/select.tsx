import React from "react";
import styled from "styled-components";

export interface IItemProps {
  label: string;
  value: any;
}

export interface ISelectProps {
  items: Array<IItemProps>;
  onChange: (item: any) => void;
  current?: string;
  className?: string;
  testId?: string;
}

const List = styled.select`
  border-radius: 0;
  padding: 0.5rem;
`;

const update = (
  items: Array<IItemProps>,
  onChange: (item: any) => void,
  e: React.ChangeEvent<HTMLSelectElement>,
) => {
  onChange(items.find((item) => item.value.toString() === e.target.value));
};

const Select = ({
  items,
  onChange,
  current,
  className,
  testId,
}: ISelectProps) => (
  <List
    data-testid={"select" + (testId ? "-" + testId : "")}
    onChange={(e) => update(items, onChange, e)}
    className={className}
  >
    {items.map(({ label, value }, index) => {
      if (label === current) {
        return (
          <option
            data-testid={"option-" + (testId ? testId + "-" : "") + index}
            key={[label, index].join("")}
            value={value.toString()}
            selected
          >
            {label}
          </option>
        );
      } else {
        return (
          <option
            data-testid={"option-" + (testId ? testId + "-" : "") + index}
            key={[label, index].join("")}
            value={value.toString()}
          >
            {label}
          </option>
        );
      }
    })}
  </List>
);

export default Select;
