import { useState } from "react";
import type { FormProps } from "antd";

import { FormValuesType } from "./utils/types/typing";
import { Product } from "./utils/types/typing";

import { UserForm } from "./UserForm";
import { OrderForm } from "./OrderForm";

import postUser from "../../actions/post-user";
import { Success } from "./ui/Success";

export const FormContainer = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormValuesType>({
    collectAddress: "",
    date: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    department: "",
    state: "",
    referencePoint: "",
    indications: "",
    orders: [
      {
        product: "",
        large: 0,
        width: 0,
        height: 0,
        weight: 0,
      },
    ],
  });

  const [products, setProducts] = useState<Product[]>([]);

  const onFinish: FormProps["onFinish"] = (values) => {
    setData(values);
    if (step === 0) {
      setStep(1);
    }
  };

  const onFinishOrder: FormProps["onFinish"] = () => {
    const updatedData = { ...data, orders: products }; // Create the updated data object

    setData(updatedData);

    if (step === 1) {
      setStep(2);
    }

    postUser(updatedData)
      .then((response) => {
        console.log("User posted successfully:", response);
      })
      .catch((error) => {
        console.error("Failed to post user:", error);
      });
  };

  const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRemove = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <>
      {step === 0 && (
        <UserForm
          data={data}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        />
      )}

      {step === 1 && (
        <OrderForm
          setStep={setStep}
          onFinishOrder={onFinishOrder}
          onFinishFailed={onFinishFailed}
          setProducts={setProducts}
          handleRemove={handleRemove}
          products={products}
        />
      )}

      {step === 2 && <Success data={data} />}
    </>
  );
};
