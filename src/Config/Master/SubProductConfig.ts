import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import moment from "moment";

export type SubProductType = {
  id: string;
  subProductCode: string;
  subProductTitle: string;
  productId: string;
  isSettlement: boolean;
  settlementName: string;
  enabled: boolean;
  product: string;
  walletType: string;
  isActive: boolean;
  createdOn: string;
  editedOn: string;
  createdBy: string;
  editedBy: string;
};

export type SubProductFormType = Pick<
  SubProductType,
  | "id"
  | "subProductCode"
  | "subProductTitle"
  | "productId"
  | "isSettlement"
  | "settlementName"
  | "enabled"
  | "product"
  | "walletType"
  | "isActive"
>;

export const initialValues: SubProductFormType = {
  id: "",
  subProductCode: "",
  subProductTitle: "",
  productId: "",
  isSettlement: false,
  settlementName: "",
  enabled: true,
  product: "",
  walletType: "",
  isActive: true,
};

export const validationSchema: Record<keyof SubProductFormType, Yup.AnySchema> =
  {
    id: textField("ID", 50, true),
    subProductCode: textField("Sub Product Code", 50, true),
    subProductTitle: textField("Sub Product Title", 100, true),
    productId: textField("Product ID", 50, true),
    isSettlement: Yup.boolean().required("Is Settlement is Required"),
    settlementName: textField("Settlement Name", 100, true),
    enabled: Yup.boolean().required("Enabled is required"),
    product: textField("Product", 50, true),
    walletType: textField("Wallet Type", 50, true),
    isActive: Yup.boolean().required("Is Active is required"),
  };

export const data: SubProductType[] = [
  {
    id: "101",
    subProductCode: "CARD-AX123",
    subProductTitle: "Prepaid Visa",
    productId: "Vendor Alpha",
    isSettlement: false,
    settlementName: "Standard Settlement",
    enabled: true,
    product: "BIN1234",
    walletType: "Digital",
    isActive: true,
    createdOn: moment().format("2024-01-15"),
    editedOn: moment().format("2024-04-12"),
    createdBy: "Alice",
    editedBy: "Bob",
  },
  {
    id: "102",
    subProductCode: "CARD-MC456",
    subProductTitle: "Mastercard Gold",
    productId: "Vendor Beta",
    isSettlement: false,
    settlementName: "None",
    enabled: false,
    product: "BIN5678",
    walletType: "Physical",
    isActive: false,
    createdOn: moment().format("2023-11-10"),
    editedOn: moment().format("2024-02-18"),
    createdBy: "Charlie",
    editedBy: "Diana",
  },
];

export const headers: { key: keyof SubProductType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "subProductCode", label: "Sub Product Code" },
  { key: "subProductTitle", label: "Sub Product Title" },
  { key: "productId", label: "Product ID" },
  { key: "isSettlement", label: "Is Settlement" },
  { key: "settlementName", label: "Settlement Name" },
  { key: "enabled", label: "Enabled" },
  { key: "product", label: "Product" },
  { key: "walletType", label: "Wallet Type" },
  { key: "isActive", label: "Is Active" },
  { key: "createdOn", label: "Created On" },
  { key: "editedOn", label: "Edited On" },
  { key: "createdBy", label: "Created By" },
  { key: "editedBy", label: "Edited By" },
];
