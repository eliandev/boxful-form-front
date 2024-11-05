import { Select } from "antd";
import React from "react";

type SelectOption = {
  value: string;
  label: string;
  department?: string;
};

type SelectUIProps = {
  placeholder: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export const SelectUI: React.FC<SelectUIProps> = ({
  placeholder,
  value,
  options,
  onChange,
}) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue={value}
      value={value}
      onChange={onChange}
      options={options}
      size="large"
      placeholder={placeholder}
    />
  );
};
