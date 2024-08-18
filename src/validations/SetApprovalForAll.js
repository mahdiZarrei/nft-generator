import { object, string } from "yup";
export const SetApprovalForAllValid = object({
  operator: string().required("is required").max(45, "More than 45 characters"),
});
