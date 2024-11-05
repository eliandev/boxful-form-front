import { useState } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, Space } from "antd";
import type { FormProps } from "antd";

import Departments from "./utils/data/deparment.json";
import States from "./utils/data/municipalities.json";
import { Location, StatesType, FormValuesType } from "./utils/types/typing";

import PhoneSelect from "./ui/PhoneSelect.tsx";
import { SelectUI } from "./ui/SelectUI.tsx";

import AddresIcon from "../../assets/images/address-icon.svg";
import ForwardIcon from "../../assets/images/forward-icon.svg";

type UserFormProps = {
  data: FormValuesType;
  onFinish: FormProps["onFinish"];
  onFinishFailed: FormProps["onFinishFailed"];
};

export const UserForm: React.FC<UserFormProps> = ({
  data,
  onFinish,
  onFinishFailed,
}) => {
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

  return (
    <Form
      name="user-form"
      layout="vertical"
      initialValues={{
        department: data.department ? data.department : location.department,
        state: data.state ? data.state : location.state,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError={true}
      preserve={true}
      className="mt-6 pt-10 px-12 pb-1"
    >
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          className="col-span-2"
          label="📍 Dirección de recolección"
          name="collectAddress"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese dirección de recolección.",
            },
          ]}
        >
          <Input
            defaultValue={data.collectAddress || ""}
            size="large"
            placeholder="Ingrese dirección de recolección"
          />
        </Form.Item>

        <Form.Item
          label="📅 Fecha Programada"
          name="date"
          rules={[{ required: true, message: "Por favor, ingrese una fecha." }]}
        >
          <DatePicker
            size="large"
            style={{ width: "100%" }}
            defaultValue={data.date || ""}
            value={data.date || ""}
            placeholder="Fecha"
            minDate={dayjs()}
          />
        </Form.Item>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label="Nombres"
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese nombres.",
            },
          ]}
        >
          <Input
            defaultValue={data.name || ""}
            size="large"
            placeholder="Ingrese nombres"
          />
        </Form.Item>

        <Form.Item
          label="Apellidos"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese apellidos.",
            },
          ]}
        >
          <Input
            defaultValue={data.lastName || ""}
            size="large"
            placeholder="Ingrese apellidos"
          />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[
            {
              type: "email",
              message: "Por favor, ingrese un correo electrónico válido.",
            },
            {
              required: true,
              message: "Por favor, ingrese email.",
            },
          ]}
        >
          <Input
            defaultValue={data.email || ""}
            size="large"
            placeholder="Ingrese correo electrónico"
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <PhoneSelect defaultValue={data.phone} />

        <Space.Compact style={{ width: "100%" }}>
          <img
            className="max-h-[30px] m-auto pr-2"
            src={AddresIcon}
            alt="Adress Icon"
          />
          <Form.Item
            label="📍Dirección del destinatario"
            name="deliveryAddress"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese dirección del destinatario.",
              },
            ]}
          >
            <Input
              defaultValue={data.deliveryAddress || ""}
              size="large"
              placeholder="Ingrese dirección del destinatario"
            />
          </Form.Item>
        </Space.Compact>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label="Departamento"
          name="department"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione un departamento.",
            },
          ]}
        >
          <SelectUI
            placeholder="Departamento"
            value={data.department ? data.department : location.department}
            options={Departments}
            onChange={handleDepartmentChange}
          />
        </Form.Item>
        <Form.Item
          label="Municipio"
          name="state"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione un municipio.",
            },
          ]}
        >
          <SelectUI
            placeholder="Municipio"
            value={data.state ? data.state : location.state}
            options={filteredStates}
            onChange={handleStateChange}
          />
        </Form.Item>
        {/* TODO: Add select distritos according to the current state */}
        {/* <Form.Item
          label="Distrito"
          name="district"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione un distrito.",
            },
          ]}
        >
          <SelectUI
            placeholder="Distrito"
            defaultValue={location.district}
            options={Districts}
            onChange={handleChange}
          ></SelectUI>
        </Form.Item> */}
        <Form.Item
          label="Punto de Referencia"
          name="referencePoint"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese un punto de referencia.",
            },
          ]}
        >
          <Input
            defaultValue={data.referencePoint || ""}
            size="large"
            placeholder="Ingrese punto de referencia"
          />
        </Form.Item>
      </div>

      <Form.Item
        label="Indicaciones"
        name="indications"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input
          defaultValue={data.indications || ""}
          size="large"
          placeholder="Indicaciones al repartidor"
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 19, span: 5 }}>
        <Button
          className="bg-primary py-6 w-full text-left flex justify-between"
          type="primary"
          htmlType="submit"
        >
          Siguiente
          <img
            className=" w-[20px] h-[20px]"
            src={ForwardIcon}
            alt="Forward Icon"
          />
        </Button>
      </Form.Item>
    </Form>
  );
};
