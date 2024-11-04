import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, Space } from "antd";

import Departments from "./utils/data/deparment.json";
import { Location, StatesType } from "./utils/types/typing";

import PhoneSelect from "./ui/PhoneSelect.tsx";
import { SelectUI } from "./ui/SelectUI.tsx";

import AddresIcon from "../../assets/images/address-icon.svg";
import ForwardIcon from "../../assets/images/forward-icon.svg";

type UserFormProps = {
  location: Location;
  handleDepartmentChange: (department: string) => void;
  filteredStates: StatesType[];
  handleStateChange: (state: string) => void;
};

export const UserForm: React.FC<UserFormProps> = ({
  location,
  handleDepartmentChange,
  filteredStates,
  handleStateChange,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          className="col-span-2"
          label="📍 Dirección de recolección"
          name="collect-address"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese dirección de recolección.",
            },
          ]}
        >
          <Input size="large" placeholder="Ingrese dirección de recolección" />
        </Form.Item>

        <Form.Item
          label="📅 Fecha Programada"
          name="date"
          rules={[{ required: true, message: "Por favor, ingrese una fecha." }]}
        >
          <DatePicker
            size="large"
            style={{ width: "100%" }}
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
          <Input size="large" placeholder="Ingrese nombres" />
        </Form.Item>

        <Form.Item
          label="Apellidos"
          name="last-name"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese apellidos.",
            },
          ]}
        >
          <Input size="large" placeholder="Ingrese apellidos" />
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
          <Input size="large" placeholder="Ingrese correo electrónico" />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <PhoneSelect />

        <Space.Compact style={{ width: "100%" }}>
          <img
            className="max-h-[30px] m-auto pr-2"
            src={AddresIcon}
            alt="Adress Icon"
          />
          <Form.Item
            label="📍Dirección del destinatario"
            name="delivery-address"
            className="w-full"
            rules={[
              {
                required: true,
                message: "Por favor, ingrese dirección del destinatario.",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Ingrese dirección del destinatario"
            />
          </Form.Item>
        </Space.Compact>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Form.Item
          label="Departamento"
          name="departament"
          rules={[
            {
              required: true,
              message: "Por favor, seleccione un departamento.",
            },
          ]}
        >
          <SelectUI
            placeholder="Departamento"
            defaultValue={location.department}
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
            defaultValue={location.state}
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
          name="reference-point"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese un punto de referencia.",
            },
          ]}
        >
          <Input size="large" placeholder="Ingrese punto de referencia" />
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
        <Input size="large" placeholder="Indicaciones al repartidor" />
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
    </>
  );
};
