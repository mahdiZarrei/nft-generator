import { object, number, string } from "yup";
export const ApproveValid = object({
    To: string().required("is required").max(45, "More than 45 characters"),
    TokenID: number("just number")
        .required("is required")
        .integer("Decimals are not allowed")
        .typeError("Amount must be a number")
        .min(0, "less than Zero"),
});
export const GetApproveValid = object({
    TokenID: number("just number")
        .required("is required")
        .integer("Decimals are not allowed")
        .typeError("Amount must be a number")
        .min(0, "less than Zero"),
});
