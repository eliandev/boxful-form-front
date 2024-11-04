import { Select } from "antd";

export const SelectUI = ({ placeholder, defaultValue, options, onChange }) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue={defaultValue}
      value={defaultValue}
      onChange={onChange}
      options={options}
      size="large"
      placeholder={placeholder}
    />
  );
};
