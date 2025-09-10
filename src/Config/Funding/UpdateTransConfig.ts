import moment from "moment";
import {
  dateRangeValidationSchema,
  GenericTableHeader,
} from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { DatesRangeValue } from "@mantine/dates";
import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

export const UPDATE_TRANS_URL = API_ENDPOINTS.FUNDING.FUNDING;
export const UPDATE_TRANS_KEY = "UPDATE_TRANSACTION";

interface UpdateTransFormType {
  dateRange: DatesRangeValue;
  productId: string | number;
  subProductId: string | number;
  vendorId: string | number;
  walletType: string;
}
export interface UpdateTransTableType {
  id: string | number;
  userId: string | number;
  mobileNo: string;
  amount: string | number;
  product: string;
  subProductName: string;
  txId: string;
  txStatus: string;
  txType: string;
  schemeName: string;
  remarks: string;
  walletType: string;
  updatedAt: string;
  created: string;
  userOutletName: string;
  refNo: string;
  txRef: string;
  txMode: string;
  txStart: string;
  txEnd: string;
  createdBy: string;
  medium: string;
  site: string;
}

export const updateTransInitialValues = {
  dateRange: [
    moment().subtract(6, "days").toDate(), // from: 6 days ago
    moment().toDate(), // to: today
  ] as DatesRangeValue,
  productId: "",
  subProductId: "",
  vendorId: "",
  walletType: "",
};

export const UpdateTransValidationSchema: Record<
  keyof UpdateTransFormType,
  Yup.AnySchema
> = {
  dateRange: dateRangeValidationSchema,
  productId: textField("Product", 100, true, true),
  subProductId: textField("Sub Product", 100, true, true),
  vendorId: textField("Vendor", 100, false, true),
  walletType: textField("Wallet Type", 150, false, true),
};

export const updateTransHeaders: GenericTableHeader<UpdateTransTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "userId", label: "User ID", filterType: "text" },
  { key: "mobileNo", label: "Mobile Number", filterType: "text" },
  { key: "amount", label: "Amount", filterType: "text" },
  { key: "subProductName", label: "Sub Product", filterType: "text" },
  { key: "txId", label: "Transaction Id", filterType: "text" },
  { key: "product", label: "Product", filterType: "text" },
  { key: "txStatus", label: "Status", filterType: "text" },
  { key: "walletType", label: "Wallet Type", filterType: "text" },
  { key: "remarks", label: "Remarks", filterType: "text" },
  { key: "txType", label: "Transaction Type", filterType: "text" },
  { key: "schemeName", label: "Scheme Name", filterType: "text" },
  { key: "updatedAt", label: "Last Update", filterType: "date" },
  { key: "medium", label: "Medium", filterType: "text" },
  { key: "created", label: "Created", filterType: "text" },
  { key: "userOutletName", label: "User Outlet Name", filterType: "text" },
  { key: "refNo", label: "Ref No", filterType: "text" },
  { key: "txRef", label: "TX Ref", filterType: "text" },
  { key: "txMode", label: "TX Mode", filterType: "text" },
  { key: "txStart", label: "TX Start", filterType: "text" },
  { key: "txEnd", label: "TX End", filterType: "text" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "site", label: "Site", filterType: "text" },
];

export const transformToUpdateTransPayload = (values: any) => {
  const [fromDate, toDate] = values.dateRange || [];

  return {
    fromDate: moment(fromDate).format("YYYY-MM-DD"),
    toDate: moment(toDate).format("YYYY-MM-DD"),
    subProductId: values.subProductId ?? "",
    vendorId: values.vendorId ?? "",
    walletType: values.walletType ?? "",
    tranStatus: "PENDING",
  };
};
