import { Form, InputNumber, Input, Button } from "antd";
import type { FormProps } from "antd";
import { useState } from "react";
import PlusIcon from "../../assets/images/plus-icon.svg";
import ForwardIcon from "../../assets/images/forward-icon.svg";
import BackIcon from "../../assets/images/back-icon.svg";
import RemoveIcon from "../../assets/images/remove-icon.svg";

type OrderForm = {
  setStep: (step: number) => void;
  onFinishOrder: FormProps["onFinish"];
  onFinishFailed: FormProps["onFinishFailed"];
};

type Product = {
  large: string;
  width: string;
  height: string;
  weight: string;
  content: string;
};

export const OrderForm: React.FC<OrderForm> = ({
  setStep,
  onFinishOrder,
  onFinishFailed,
}) => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setErrors] = useState("");

  const handleAdd = () => {
    const values = form.getFieldsValue();

    if (
      values.large === undefined ||
      values.width === undefined ||
      values.height === undefined ||
      values.weight === undefined
    ) {
      setErrors("Todos los campos son obligatorios");
      return;
    }

    setProducts([
      ...products,
      {
        large: values.large,
        width: values.width,
        height: values.height,
        weight: values.weight,
        content: values.product,
      },
    ]);

    form.resetFields();
    setErrors("");
  };

  const resetErrors = () => {
    setErrors("");
  };

  const handleRemove = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <Form
      form={form}
      name="order-form"
      layout="vertical"
      onFinish={onFinishOrder}
      onFinishFailed={onFinishFailed}
      onChange={resetErrors}
      scrollToFirstError={true}
      className="mt-6 pt-10 px-12 pb-1"
    >
      <h2 className="mb-3 text-mainText text-lg font-bold">
        Agrega tus bultos
      </h2>
      <section className="bg-layer p-5 rounded-lg">
        <div className="flex gap-2">
          <div className="flex pr-2 w-[70%]">
            <Form.Item label="Largo" name="large">
              <InputNumber
                className="input-measurement"
                addonAfter={"cm"}
                value=""
                min="1"
                controls
              />
            </Form.Item>
            <Form.Item label="Alto" name="height">
              <InputNumber
                className="input-measurement"
                addonAfter={"cm"}
                value=""
                min="1"
                controls
              />
            </Form.Item>
            <Form.Item label="Ancho" name="width">
              <InputNumber
                className="input-measurement"
                addonAfter={"cm"}
                value=""
                min="1"
                controls
              />
            </Form.Item>
          </div>
          <Form.Item label="Peso en libras" name="weight">
            <InputNumber min="1" value="" addonAfter={"lb"} controls />
          </Form.Item>
          <Form.Item className="w-full" label="Contenido" name="product">
            <Input size="large" value="" placeholder="Contenido" />
          </Form.Item>
        </div>

        <p className="text-danger">{error}</p>

        <div className="flex justify-end gap-2">
          <Form.Item>
            <Button onClick={handleAdd} className="bg-secondary p-6">
              Agregar <img src={PlusIcon} alt="Add icon" />
            </Button>
          </Form.Item>
        </div>
      </section>

      <section className="py-5">
        {products.length !== 0 && (
          <h2 className="mb-3 text-mainText text-lg font-bold">
            Agrega tus bultos
          </h2>
        )}

        {products.map((product, index) => (
          <div
            key={index}
            className="flex gap-2 border border-succes px-5 pt-5 pb-7 rounded-lg relative mb-4"
          >
            <Form.Item label="Peso en libras" name={`weight-${index}`}>
              <InputNumber
                defaultValue={product.weight}
                min="1"
                addonAfter={"lb"}
                controls
              />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Contenido"
              name={`product-${index}`}
            >
              <Input
                defaultValue={product.content}
                size="large"
                placeholder="Contenido"
              />
            </Form.Item>
            <div className="flex pr-2 w-[70%]">
              <Form.Item label="Largo" name={`large-${index}`}>
                <InputNumber
                  className="input-measurement"
                  addonAfter={"cm"}
                  defaultValue={product.large}
                  min="1"
                  controls
                />
              </Form.Item>
              <Form.Item label="Alto" name={`height-${index}`}>
                <InputNumber
                  className="input-measurement"
                  addonAfter={"cm"}
                  defaultValue={product.height}
                  min="1"
                  controls
                />
              </Form.Item>
              <Form.Item label="Ancho" name={`width-${index}`}>
                <InputNumber
                  className="input-measurement"
                  addonAfter={"cm"}
                  defaultValue={product.width}
                  min="1"
                  controls
                />
              </Form.Item>
            </div>

            <Button
              className="absolute bottom-2 right-0 border-none bg-opacity-0 p-5 text-lg"
              onClick={handleRemove}
            >
              <img src={RemoveIcon} alt="Remove Icon" />
            </Button>
          </div>
        ))}
      </section>

      <div className="flex justify-between">
        <Form.Item>
          <Button
            className="bg-secondary text-mainText text-lg py-6 w-full text-left flex justify-between gap-4"
            type="primary"
            onClick={handleBack}
          >
            <img src={BackIcon} alt="Send Icon" />
            Regresar
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-primary py-6 w-full text-left text-lg flex justify-between gap-16"
            type="primary"
            htmlType="submit"
          >
            Enviar <img src={ForwardIcon} alt="Send Icon" />
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
