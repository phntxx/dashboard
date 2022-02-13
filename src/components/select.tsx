import React, { useState } from "react";
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

const Select = ({
  items,
  onChange,
  current,
  className,
  testId,
}: ISelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(current);

  const update = (
    items: Array<IItemProps>,
    onChange: (item: any) => void,
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelected(event.target.value);
    onChange(
      items.find((item) => item.value.toString() === event.target.value),
    );
  };

  return (
    <List
      data-testid={"select" + (testId ? `-${testId}` : "")}
      onChange={(e) => update(items, onChange, e)}
      className={className}
      value={selected}
    >
      {items.map(({ label, value }, index) => (
        <option
          data-testid={"option-" + (testId ? `${testId}-` : "") + index}
          key={[label, index].join("")}
          value={value.toString()}
        >
          {label}
        </option>
      ))}
    </List>
  );
};

export default Select;
