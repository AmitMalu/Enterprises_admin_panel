import moment from "moment";
import { GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { DatesRangeValue } from "@mantine/dates";

export const SETTLEMENT_URL = API_ENDPOINTS.FUNDING.SETTLEMENT;
export const SETTLEMENT_KEY = "FUNDING_SETTLEMENT";

export interface PreSettlementTableType {
  id: string | number;
  created: string;
  lastUpdate: string;
  userId: string | number;
  userOutletName: string;
  userMobileNo: string;
  scheme: string;
  product: string;
  subProduct: string;
  walletType: string;
  amount: string | number;
  status: string;
  txType: string;
  refNo: string;
  txRef: string;
  remarks: string;
  txMode: string;
  txStart: string;
  txEnd: string;
  txid: string;
  createdBy: string;
  medium: string;
  site: string;
}

export interface PostSettlementTableType extends PreSettlementTableType {
  uriPath: string;
  updateBy: string;
}

export const settlementFilterInitialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  vendorId: "",
  productId: "",
  subProductId: "",
  reportType: "PRE_SETTLEMENT",
};

export const preSettlementHeaders: GenericTableHeader<PreSettlementTableType>[] =
  [
    { key: "id", label: "ID", filterType: "text" },
    { key: "created", label: "Created", filterType: "text" },
    { key: "lastUpdate", label: "Last Update", filterType: "text" },
    { key: "userId", label: "User ID", filterType: "text" },
    { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
    { key: "userMobileNo", label: "User Mobile No", filterType: "text" },
    { key: "scheme", label: "Scheme", filterType: "text" },
    { key: "product", label: "Product", filterType: "text" },
    { key: "subProduct", label: "Sub Product", filterType: "text" },
    { key: "walletType", label: "Wallet Type", filterType: "text" },
    { key: "amount", label: "Amount", filterType: "text" },
    { key: "status", label: "Status", filterType: "text" },
    { key: "txType", label: "TX Type", filterType: "text" },
    { key: "refNo", label: "Ref No", filterType: "text" },
    { key: "txRef", label: "TX Ref", filterType: "text" },
    { key: "remarks", label: "Remarks", filterType: "text" },
    { key: "txMode", label: "TX Mode", filterType: "text" },
    { key: "txStart", label: "TX Start", filterType: "text" },
    { key: "txEnd", label: "TX End", filterType: "text" },
    { key: "txid", label: "Txid", filterType: "text" },
    { key: "createdBy", label: "Created By", filterType: "text" },
    { key: "medium", label: "Medium", filterType: "text" },
    { key: "site", label: "Site", filterType: "text" },
  ];

export const postSettlementHeaders: GenericTableHeader<PostSettlementTableType>[] =
  [
    { key: "id", label: "ID", filterType: "text" },
    { key: "created", label: "Created", filterType: "text" },
    { key: "lastUpdate", label: "Last Update", filterType: "text" },
    { key: "userId", label: "User ID", filterType: "text" },
    { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
    { key: "userMobileNo", label: "User Mobile No", filterType: "text" },
    { key: "scheme", label: "Scheme", filterType: "text" },
    { key: "product", label: "Product", filterType: "text" },
    { key: "subProduct", label: "Sub Product", filterType: "text" },
    { key: "walletType", label: "Wallet Type", filterType: "text" },
    { key: "amount", label: "Amount", filterType: "text" },
    { key: "status", label: "Status", filterType: "text" },
    { key: "uriPath", label: "URI Path", filterType: "text" },
    { key: "txType", label: "TX Type", filterType: "text" },
    { key: "refNo", label: "Ref No", filterType: "text" },
    { key: "txRef", label: "TX Ref", filterType: "text" },
    { key: "remarks", label: "Remarks", filterType: "text" },
    { key: "txMode", label: "TX Mode", filterType: "text" },
    { key: "txStart", label: "TX Start", filterType: "text" },
    { key: "txEnd", label: "TX End", filterType: "text" },
    { key: "txid", label: "Txid", filterType: "text" },
    { key: "createdBy", label: "Created By", filterType: "text" },
    { key: "medium", label: "Medium", filterType: "text" },
    { key: "site", label: "Site", filterType: "text" },
    { key: "updateBy", label: "Update By", filterType: "text" },
  ];
