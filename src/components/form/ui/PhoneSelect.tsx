import React, { useState } from "react";
import { Form, InputNumber, Select } from "antd";
import { RuleObject } from "antd/es/form";
import Countries from "../utils/data/Countries.ts";

type Country = {
  name: string;
  flag: string;
  code: string;
  dialCode: string;
  mask: string;
};

const PhoneSelect: React.FC<{ defaultValue: string }> = ({ defaultValue }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    Countries.find((country) => country.code === "SV")
  );

  const handleCountryChange = (value: string) => {
    const country = Countries.find((country) => country.name === value);
    setSelectedCountry(country);
  };

  const phoneValidation = (
    _: RuleObject,
    value: string | undefined
  ): Promise<void> => {
    if (!value) {
      return Promise.resolve();
    }

    if (selectedCountry) {
      const maskRegex = new RegExp(
        `^${selectedCountry.mask
          .replace(/\s/g, "\\s*")
          .replace(/\(/g, "\\(?")
          .replace(/\)/g, "\\)?")
          .replace(/-/g, "-?")
          .replace(/9/g, "\\d")}$`
      );

      if (!maskRegex.test(value.toString())) {
        return Promise.reject(
          new Error(`El formato es: ${selectedCountry.mask}`)
        );
      }
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      label="Teléfono"
      name="phone"
      rules={[
        { required: true, message: "Por favor, ingrese teléfono." },
        { validator: phoneValidation },
      ]}
    >
      <InputNumber
        addonBefore={
          <Select
            defaultValue={selectedCountry?.name}
            onChange={handleCountryChange}
            style={{ width: 120 }}
            showSearch
          >
            {Countries.map((country: Country) => (
              <Select.Option key={country.code} value={country.name}>
                {country.flag} {country.name} ({country.dialCode})
              </Select.Option>
            ))}
          </Select>
        }
        stringMode={true}
        defaultValue={defaultValue || ""}
        style={{ width: "300px" }}
        placeholder={`Ej, ${selectedCountry?.mask}`}
        size="large"
      />
    </Form.Item>
  );
};

export default PhoneSelect;
