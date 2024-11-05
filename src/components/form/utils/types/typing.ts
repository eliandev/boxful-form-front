import { Dispatch, SetStateAction } from "react";
import type { FormProps } from "antd";

export type Location = {
  department: string;
  state: string;
};

export type StatesType = {
  label: string;
  value: string;
  department: string;
};

export type FormValuesType = {
  collectAddress: string;
  date: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  department: string;
  state: string;
  referencePoint: string;
  indications: string;
  orders?: Product[];
};

export type Product = {
  large: number;
  width: number;
  height: number;
  weight: number;
  product: string;
};

export type OrderFormProps = {
  setStep: (step: number) => void;
  onFinishOrder: FormProps["onFinish"];
  onFinishFailed: FormProps["onFinishFailed"];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  handleRemove: (index: number) => void;
  products: Product[];
};
