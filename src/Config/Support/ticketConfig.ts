import { GenericTableHeader } from "../../Utils/utils";
import { fileValidation, textField } from "../../Utils/ValidationUtils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import * as Yup from "yup";

export const TICKET_KEY = "ticket";
export const TICKET_URL = API_ENDPOINTS.SUPPORT.TICKET;

export interface TicketFormType {
  id: string;
  issueType: string;
  description?: string;
  status: string;
  screenshotImage?: string | null;
  remark?: string;
  raisedBy: string;
}

export interface TicketTableType extends TicketFormType {
  transactionId: string;
  balBeforeTran: string;
  balAfterTran: string;
  amount: string;
  tranStatus: string;
  dateOfTransaction: string;
  service: string;
  subProductName: string;
  actionOnBalanceAmount: string;
  createdAt: string;
}

export type FetchTicketListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: TicketFormType = {
  id: "",
  issueType: "",
  description: "",
  status: "PENDING",
  screenshotImage: null,
  remark: "",
  raisedBy: "",
};

export const validationSchema: Record<keyof TicketFormType, Yup.AnySchema> = {
  id: textField("Id", 50, false, true),
  issueType: textField("Subject", 100, false, true),
  description: textField("Description", 150, false, true),
  screenshotImage: fileValidation(
    "Document",
    ["image/png", "image/jpeg"],
    1.5,
    false,
  ),
  raisedBy: textField("Raised By", 150, false, true),
  status: textField("Status", 100, false, true),
  remark: textField("Remark", 150, false, true),
};

export const headers: GenericTableHeader<TicketTableType>[] = [
  { key: "id", label: "Ticket ID", filterType: "number" },
  { key: "transactionId", label: "Transaction ID", filterType: "text" },
  {
    key: "status",
    label: "Ticket Status",
    filterType: "boolean",
    renderType: "statusBadge",
    filterOptions: [
      { label: "PENDING", value: "PENDING" },
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "REJECTED", value: "REJECTED" },
      { label: "FAILED", value: "FAILED" },
      { label: "FAILURE", value: "FAILURE" },
    ],
  },
  { key: "raisedBy", label: "Raised By", filterType: "text" },
  { key: "issueType", label: "Issue Type", filterType: "text" },
  {
    key: "tranStatus",
    label: "Transaction Status",
    renderType: "statusBadge",
    filterType: "boolean",
    filterOptions: [
      { label: "PENDING", value: "PENDING" },
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "REJECTED", value: "REJECTED" },
      { label: "FAILED", value: "FAILED" },
      { label: "FAILURE", value: "FAILURE" },
    ],
  },
  { key: "amount", label: "Amount", filterType: "number" },
  { key: "balBeforeTran", label: "Balance Before", filterType: "number" },
  { key: "balAfterTran", label: "Balance After", filterType: "number" },
  { key: "dateOfTransaction", label: "Transaction Date", filterType: "date" },
  { key: "service", label: "Service", filterType: "text" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  {
    key: "actionOnBalanceAmount",
    label: "Action On Balance",
    filterType: "text",
  },
  { key: "createdAt", label: "Created At", filterType: "date" },
];

export const transformToTicketTableType = (
  raw: Record<string, any>,
): TicketTableType => {
  return {
    id: raw.id ?? "",
    transactionId: raw.transactionId ?? "",
    raisedBy: raw.raisedBy ?? "",
    issueType: raw.issueType ?? "",
    status: raw.status ?? "PENDING",
    tranStatus: raw.tranStatus ?? "",
    amount: raw.amount != null ? String(raw.amount) : "",
    balBeforeTran: raw.balBeforeTran != null ? String(raw.balBeforeTran) : "",
    balAfterTran: raw.balAfterTran != null ? String(raw.balAfterTran) : "",

    dateOfTransaction: raw.dateOfTransaction ?? "",
    service: raw.service ?? "",
    subProductName: raw.subProductName ?? "",
    actionOnBalanceAmount: raw.actionOnBalanceAmount ?? "",
    createdAt: raw.createdAt ?? "",
  };
};

export const transformTicketListToFormData = (
  raw: Record<string, any>,
): TicketFormType => ({
  id: raw.id ?? "",
  issueType: raw.issueType ?? "",
  raisedBy: raw.raisedBy ?? "",
  description: raw.description ?? "",
  screenshotImage: raw.screenshotImage ?? null,
  status: raw.status ?? "PENDING",
  remark: raw.remark ?? "",
});
