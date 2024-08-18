import { object, number, string } from "yup";
export const transferValid = object({
    To: string().required("is required").max(45, "More than 45 characters"),
    From: string().required("is required").max(45, "More than 45 characters"),
    ID: number("just number")
        .required("is required")
        .integer("Decimals are not allowed")
        .typeError("Amount must be a number")
        .min(0, "less than Zero"),
});
export const transferFromWithBytesValid = object({
    To: string().required("is required").max(45, "More than 45 characters"),
    From: string().required("is required").max(45, "More than 45 characters"),
    ID: number("just number")
        .required("is required")
        .integer("Decimals are not allowed")
        .typeError("Amount must be a number")
        .min(0, "less than Zero"),
    bytes: string().required("is required").max(145, "More than 45 characters"),
});
