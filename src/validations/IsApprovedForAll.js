import { object, number, string } from "yup";
export const IsApprovedForAllValid = object({
  owner: string().required("is required").max(45, "More than 45 characters"),
  operator: string().required("is required").max(45, "More than 45 characters"),
});
