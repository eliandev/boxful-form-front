import { FormValuesType } from "../components/form/utils/types/typing";

const URL = `${import.meta.env.VITE_API_URL}/user/createUserWithOrders`;

const postUser = async (data: FormValuesType): Promise<FormValuesType> => {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to post user: ${res.statusText}`);
  }

  const responseData: FormValuesType = await res.json();
  return responseData;
};

export default postUser;
