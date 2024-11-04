import { Form } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";

import { UserForm } from "./UserForm";
import { OrderForm } from "./OrderForm";

import States from "./utils/data/municipalities.json";
import { Location, StatesType } from "./utils/types/typing";

export const FormContainer = () => {
  const [step, setStep] = useState(1);

  const [location, setLocation] = useState<Location>({
    department: "06", //San Salvador
    state: "33", // San Salvador Norte
  });

  const [filteredStates, setFilteredStates] = useState<StatesType[]>(
    States.filter((state) => state.department === location.department)
  );

  const handleDepartmentChange = (departmentValue: string) => {
    setLocation((prev: Location) => ({
      ...prev,
      department: departmentValue,
      state: "",
    }));

    const newFilteredStates = States.filter(
      (state) => state.department === departmentValue
    );
    setFilteredStates(newFilteredStates);
  };

  const handleStateChange = (stateValue: string) => {
    setLocation((prev: Location) => ({ ...prev, state: stateValue }));
  };

  const onFinish: FormProps["onFinish"] = (values) => {
    setStep(2);
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{
        deparment: location.department,
        state: location.state,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className="mt-6 pt-10 px-12 pb-1"
    >
      {step === 1 ? (
        <UserForm
          location={location}
          handleDepartmentChange={handleDepartmentChange}
          filteredStates={filteredStates}
          handleStateChange={handleStateChange}
        />
      ) : (
        <OrderForm />
      )}
    </Form>
  );
};
