import * as Yup from "yup";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const WALLET_PREVIEW_KEY = "WALLET_PREVIEW";
export const WALLET_PREVIEW_URL = API_ENDPOINTS.FUNDING.WALLET_PREVIEW;

// ─── Filter Form ────────────────────────────────────────────────────────────

export interface WalletPreviewFilterForm {
    hierarchyType: string;
}

export const walletPreviewFilterInitialValues: WalletPreviewFilterForm = {
    hierarchyType: "",
};

export const walletPreviewFilterValidationSchema: Record<
    keyof WalletPreviewFilterForm,
    Yup.AnySchema
> = {
    hierarchyType: Yup.string().nullable().optional(),
};

// Member-role options shown in the filter dropdown (RT, DT, SD, etc.)
export const memberRoleOptions = [
    { label: "Retailer (RT)", value: "RT" },
    { label: "Distributor (DT)", value: "DT" },
    { label: "Partner (PT)", value: "PT" },
    { label: "Super Distributor (SD)", value: "SD" },
    { label: "White Label (WL)", value: "WL" },
];

// ─── Table Type ──────────────────────────────────────────────────────────────

export interface WalletPreviewTableType {
    hierarchyType: string;
    hierarchyId: string;
    outletName: string;
    fullName: string;
    prepaidAmount: number | string;
    postpaidAmount: number | string;
    cutoffPrepaidBalance: number | string;
    cutoffPostpaidBalance: number | string;
    mobile: string;
    email: string;
    remark: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
}

// ─── Edit Form ───────────────────────────────────────────────────────────────

export interface WalletPreviewEditForm {
    hierarchyId?: string;
    prepaidCutoffAmount: number | string;
    postpaidCutoffAmount: number | string;
    remark?: string;
}

export const walletPreviewEditInitialValues: WalletPreviewEditForm = {
    hierarchyId: "",
    prepaidCutoffAmount: "",
    postpaidCutoffAmount: "",
    remark: ""
};

export const walletPreviewEditValidationSchema: Record<
    keyof WalletPreviewEditForm,
    Yup.AnySchema
> = {
    hierarchyId: Yup.string().required("HierarchyId is required"),
    prepaidCutoffAmount: Yup.number()
        .typeError("Prepaid Cutoff Amount must be a number")
        .required("Prepaid Cutoff Amount is required")
        .min(0, "Must be ≥ 0"),
    postpaidCutoffAmount: Yup.number()
        .typeError("Postpaid Cutoff Amount must be a number")
        .required("Postpaid Cutoff Amount is required")
        .min(0, "Must be ≥ 0"),
    remark: Yup.string().optional()
};

/** Dynamic schema — enforces lien: cutoff amount cannot exceed actual wallet balance */
export const buildWalletPreviewEditSchema = (
    prepaidBalance: number | null,
    postpaidBalance: number | null
) =>
    Yup.object({
        hierarchyId: Yup.string().optional(),
        prepaidCutoffAmount: Yup.number()
            .typeError("Prepaid Cutoff Amount must be a number")
            .required("Prepaid Cutoff Amount is required")
            .min(0, "Must be ≥ 0")
            .test(
                "lien-prepaid",
                prepaidBalance !== null
                    ? `Cutoff Amount cannot exceed actual balance (${prepaidBalance})`
                    : "Cutoff Amount cannot exceed actual balance",
                (value) =>
                    prepaidBalance === null ||
                    value === undefined ||
                    value <= prepaidBalance
            ),
        postpaidCutoffAmount: Yup.number()
            .typeError("Postpaid Cutoff Amount must be a number")
            .required("Postpaid Cutoff Amount is required")
            .min(0, "Must be ≥ 0")
            .test(
                "lien-postpaid",
                postpaidBalance !== null
                    ? `Cutoff Amount cannot exceed actual balance (${postpaidBalance})`
                    : "`Cutoff Amount cannot exceed actual balance",
                (value) =>
                    postpaidBalance === null ||
                    value === undefined ||
                    value <= postpaidBalance
            ),
        remark: Yup.string().optional(),
    });

// ─── Table Headers ───────────────────────────────────────────────────────────

export const walletPreviewHeaders: GenericTableHeader<WalletPreviewTableType>[] =
    [
        { key: "hierarchyType", label: "Hierarchy Type", filterType: "text", searchable: true },
        { key: "hierarchyId", label: "Hierarchy Id", filterType: "text" },
        { key: "outletName", label: "Outlet Name", filterType: "text" },
        { key: "fullName", label: "Full Name", filterType: "text" },
        { key: "prepaidAmount", label: "Prepaid Amount", filterType: "amount" },
        { key: "postpaidAmount", label: "Postpaid Amount", filterType: "amount" },
        {
            key: "cutoffPrepaidBalance",
            label: "Cutoff Prepaid Balance",
            filterType: "amount",
        },
        {
            key: "cutoffPostpaidBalance",
            label: "Cutoff Postpaid Balance",
            filterType: "amount",
        },
        { key: "mobile", label: "Mobile", filterType: "number" },
        { key: "email", label: "Email", filterType: "text" },
        { key: "remark", label: "Remark", filterType: "text" },
        { key: "createdOn", label: "Created On", filterType: "date" },
        { key: "createdBy", label: "Created By", filterType: "text" },
        { key: "updatedOn", label: "Updated On", filterType: "date" },
        { key: "updatedBy", label: "Updated By", filterType: "text" },
    ];

// ─── Transformers ─────────────────────────────────────────────────────────────

export function transformWalletPreviewToTableType(
    item: Record<string, any>
): WalletPreviewTableType {
    return {
        hierarchyType: item.hierarchyType ?? "",
        // API may return hierarchyId as memberNo; fallback chain
        hierarchyId: item.hierarchyId ?? "",
        outletName: item.outletCompanyName ?? "",
        fullName: item.fullName ?? "",
        prepaidAmount: item.prepaidBalance ?? 0,
        postpaidAmount: item.postpaidBalance ?? 0,
        cutoffPrepaidBalance: item.prepaidCutoffAmount ?? 0,
        cutoffPostpaidBalance: item.postpaidCutoffAmount ?? 0,
        mobile: item.mobileNumber ?? "",
        email: item.emailId ?? "",
        remark: item.remark ?? item.remarks ?? "",
        createdOn: item.createdOn ?? item.createdAt ?? "",
        createdBy: item.createdBy ?? "",
        updatedOn: item.lastUpdatedDate ?? "",
        updatedBy: item.updatedBy ?? "",
    };
}

export function transformWalletPreviewToEditForm(
    item: Record<string, any>
): WalletPreviewEditForm {
    return {
        hierarchyId: item.hierarchyId ?? "",
        prepaidCutoffAmount:
            item.prepaidCutoffAmount ?? item.cutoffPrepaidBalance ?? "",
        postpaidCutoffAmount:
            item.postpaidCutoffAmount ?? item.cutoffPostpaidBalance ?? "",
        remark: item.remark ?? item.remarks ?? ""
    };
}
