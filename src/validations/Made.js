import { object, number, string } from "yup";
export const MadeValid = object({
  name: string().required("is required").max(145, "More than 45 characters"),
  symbol: string().required("is required").max(145, "More than 45 characters"),
});
