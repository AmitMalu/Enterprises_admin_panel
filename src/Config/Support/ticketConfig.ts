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
}

export interface TicketTableType extends TicketFormType {
  transactionId: string;
  raisedBy: string;
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
};

export const validationSchema: Record<keyof TicketFormType, Yup.AnySchema> = {
  id: textField("Id", 50, false, true),
  issueType: textField("Subject", 100, false, true),
  description: textField("Description", 150, false, true),
  screenshotImage: fileValidation(
    "Document",
    ["image/png", "image/jpeg"],
    1.5,
    false
  ),
  status: Yup.boolean().default(false),
  remark: Yup.boolean().default(false),
};

export const headers: GenericTableHeader<TicketTableType>[] = [
  { key: "id", label: "Ticket ID", filterType: "text" },
  { key: "transactionId", label: "Transaction ID", filterType: "text" },
  { key: "raisedBy", label: "Raised By", filterType: "text" },
  { key: "issueType", label: "Issue Type", filterType: "text" },
  {
    key: "status",
    label: "Status",
    filterType: "boolean",
    filterOptions: [
      { label: "PENDING", value: "PENDING" },
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "REJECTED", value: "REJECTED" },
    ],
  },
  {
    key: "tranStatus",
    label: "Transaction Status",
    filterType: "boolean",
    filterOptions: [
      { label: "PENDING", value: "PENDING" },
      { label: "SUCCESS", value: "SUCCESS" },
      { label: "FAILED", value: "FAILED" },
    ],
  },
  { key: "amount", label: "Amount", filterType: "text" },
  { key: "balBeforeTran", label: "Balance Before", filterType: "text" },
  { key: "balAfterTran", label: "Balance After", filterType: "text" },
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
  raw: Record<string, any>
): TicketTableType => {
  return {
    id: raw.id ?? "",
    transactionId: raw.transactionId ?? "",
    raisedBy: raw.raisedBy ?? "",
    issueType: raw.issueType ?? "",
    status: raw.status ?? "PENDING",
    tranStatus: raw.tranStatus ?? "",
    amount: raw.amount != null ? String(raw.amount) : "",
    balBeforeTran:
      raw.balBeforeTran != null ? String(raw.balBeforeTran) : "",
    balAfterTran:
      raw.balAfterTran != null ? String(raw.balAfterTran) : "",

    dateOfTransaction: raw.dateOfTransaction ?? "",
    service: raw.service ?? "",
    subProductName: raw.subProductName ?? "",
    actionOnBalanceAmount: raw.actionOnBalanceAmount ?? "",
    createdAt: raw.createdAt ?? "",
  };
};

export const transformTicketListToFormData = (
  raw: Record<string, any>
): TicketFormType => ({
  id: raw.id ?? "",
  issueType: raw.issueType ?? "",
  description: raw.description ?? "",
  screenshotImage: raw.screenshotImage ?? null,
  status: raw.status ?? "PENDING",
  remark: raw.remark ?? "",
});
