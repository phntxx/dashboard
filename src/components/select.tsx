import React from "react";

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
  <select
    data-testid={"select" + (testId ? "-" + testId : "")}
    onChange={(e) => update(items, onChange, e)}
    className={className}
    defaultValue={current}
  >
    {items.map(({ label, value }, index) => (
      <option
        data-testid={"option-" + (testId ? testId + "-" : "") + index}
        key={[label, index].join("")}
        value={value.toString()}
      >
        {label}
      </option>
    ))}
  </select>
);

export default Select;
