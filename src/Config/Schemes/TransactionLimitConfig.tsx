import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";

export const TRANSACTION_LIMIT_KEY = "transactionLimit";
export const TRANSACTION_LIMIT_URL = API_ENDPOINTS.SCHEMES.TRANSACTION_LIMIT;

export interface TransactionLimitFormType {
    description: string;
    productId: string;
    subProductId: string;
    paymentCurrency: string;
    isAllowPerDayCardLimit: boolean;
    isAllowMonthlyCardLimit: boolean;
    perDayTransactionLimit: string;
    monthlyTransactionLimit: string;
    checkAmountPattern: boolean;
    // maxAmountSMSCollect: string;
    maxAmount: string;
    blocked: boolean;
}

export interface TransactionLimitTableType {
    id: string;
    description: string;
    subProductName: string;
    productName: string;
    paymentCurrency: string;
    isAllowPerDayCardLimit: boolean;
    isAllowMonthlyCardLimit: boolean;
    perDayTransactionLimit: string;
    monthlyTransactionLimit: string;
    checkAmountPattern: boolean;
    // maxAmountSMSCollect: string;
    maxAmount: string;
    blocked: boolean;
    createdOn: string;
    createdBy: string;
    editedOn: string;
    editedBy: string;
}

export interface TransactionLimitCreatePayload extends TransactionLimitFormType {
    createdBy: string;
}

export interface TransactionLimitUpdatePayload extends TransactionLimitFormType {
    editedBy: string;
}

export const initialValues: TransactionLimitFormType = {
    description: "",
    productId: "",
    subProductId: "",
    paymentCurrency: "",
    isAllowPerDayCardLimit: false,
    isAllowMonthlyCardLimit: false,
    perDayTransactionLimit: "0",
    monthlyTransactionLimit: "0",
    checkAmountPattern: false,
    // maxAmountSMSCollect"",string;
    maxAmount: "",
    blocked: false,
};

export const validationSchema: Record<
    keyof TransactionLimitFormType,
    Yup.AnySchema
> = {
    description: textField("Description", 150, true, true),
    productId: textField("Product", 150, true, true),
    subProductId: textField("sub Product", 150, true, true),
    paymentCurrency: textField("Payment Currency", 50, true, true),
    perDayTransactionLimit: Yup.string().when("isAllowPerDayCardLimit", {
        is: true,
        then: (schema) =>
            schema
                .required("Per Day Transaction Limit is required")
                .matches(/^\d+(\.\d+)?$/, "Must be a valid value")
                .test(
                    "not-zero",
                    "Per Day Transaction Limit cannot be 0",
                    (value) => value !== "0" && parseFloat(value || "") !== 0
                ),
        otherwise: (schema) => schema.notRequired(),
    }),

    monthlyTransactionLimit: Yup.string().when("isAllowMonthlyCardLimit", {
        is: true,
        then: (schema) =>
            schema
                .required("Monthly Transaction Limit is required")
                .matches(/^\d+(\.\d+)?$/, "Must be a valid value")
                .test(
                    "not-zero",
                    "Monthly Transaction Limit cannot be 0",
                    (value) => value !== "0" && parseFloat(value || "") !== 0
                ),
        otherwise: (schema) => schema.notRequired(),
    }),
    maxAmount: Yup.string()
        .required("Max Amount is required")
        .max(50, "Max Amount must be at most 50 characters")
        .matches(/^\d+(\.\d+)?$/, "Must be a valid number"),
    isAllowPerDayCardLimit: Yup.boolean().default(false),
    isAllowMonthlyCardLimit: Yup.boolean().default(false),
    checkAmountPattern: Yup.boolean().default(false),
    blocked: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<TransactionLimitTableType>[] = [
    { key: "id", label: "ID", filterType: "number" },
    { key: "description", label: "Description" },
    { key: "productName", label: "Product" },
    { key: "subProductName", label: "Sub Product" },
    { key: "paymentCurrency", label: "Currency" },
    { key: "isAllowPerDayCardLimit", label: "Per Day Card Limit", filterType: "boolean" },
    { key: "isAllowMonthlyCardLimit", label: "Monthly Card Limit", filterType: "boolean" },
    { key: "perDayTransactionLimit", label: "Customer Per Day Limit", filterType: "number" },
    { key: "monthlyTransactionLimit", label: "Customer Monthly Limit", filterType: "number" },
    { key: "checkAmountPattern", label: "Check Amount Pattern", filterType: "boolean" },
    // { key: "maxAmountSMSCollect", label: "Max Amount (SMS Collect)" },
    { key: "maxAmount", label: "Max Amount", filterType: "number" },
    { key: "blocked", label: "Blocked", filterType: "boolean" },
    { key: "createdOn", label: "Created On", filterType: "date" },
    { key: "createdBy", label: "Created By" },
    { key: "editedOn", label: "Edited On", filterType: "date" },
    { key: "editedBy", label: "Edited By" },
];

export const transformTransactionLimitToFormData = (
    raw: Record<string, any>
): TransactionLimitFormType => ({
    description: raw.description ?? "",
    productId: String(raw.productId) ?? "",
    subProductId: String(raw.subProductId) ?? "",
    paymentCurrency: raw.paymentCurrency ?? "",
    isAllowPerDayCardLimit: raw.isAllowPerDayCardLimit ?? false,
    isAllowMonthlyCardLimit: raw.isAllowMonthlyCardLimit ?? false,
    perDayTransactionLimit:
        raw.perDayTransactionLimit === "-" ? "0" : raw.perDayTransactionLimit ?? "0",
    monthlyTransactionLimit:
        raw.monthlyTransactionLimit === "-" ? "0" : raw.monthlyTransactionLimit ?? "0",
    checkAmountPattern: raw.checkAmountPattern ?? false,
    maxAmount: raw.maxAmount ?? "",
    blocked: raw.blocked ?? false,
})

export const transformFormToCreateTransactionLimitPayload = (
    formData: TransactionLimitFormType
): TransactionLimitCreatePayload => ({
    ...formData,
    perDayTransactionLimit: formData.isAllowPerDayCardLimit
        ? String(formData.perDayTransactionLimit)
        : "-",
    monthlyTransactionLimit: formData.isAllowMonthlyCardLimit
        ? String(formData.monthlyTransactionLimit)
        : "-",
    createdBy: localStorage.getItem("username") || "system",
});

export const transformFormToUpdateTransactionLimitPayload = (
    formData: TransactionLimitFormType
): TransactionLimitUpdatePayload => ({
    ...formData,
    perDayTransactionLimit: formData.isAllowPerDayCardLimit
        ? String(formData.perDayTransactionLimit)
        : "-",
    monthlyTransactionLimit: formData.isAllowMonthlyCardLimit
        ? String(formData.monthlyTransactionLimit)
        : "-",
    editedBy: localStorage.getItem("username") || "system",
});

