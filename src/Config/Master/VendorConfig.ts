import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import moment from "moment";

export type VendorType = {
  id: string;
  productId: string;
  productName: string;
  vendorName: string;
  vendorCode: string;
  subProductId: string;
  subProductCode: string;
  modesSupported: string;
  priority: string;
  isActive: boolean;
  blanks: string;
  createdOn: string;
  createdBy: string;
  editedOn: string;
  editedBy: string;
};

export type VendorFormType = Pick<
  VendorType,
  | "id"
  | "productId"
  | "productName"
  | "vendorCode"
  | "subProductId"
  | "subProductCode"
  | "modesSupported"
  | "priority"
  | "isActive"
  | "blanks"
>;

export const initialValues: VendorFormType = {
  id: "",
  productId: "",
  productName: "",
  vendorCode: "",
  subProductId: "",
  subProductCode: "",
  modesSupported: "",
  priority: "",
  isActive: false,
  blanks: "",
};

export const validationSchema: Record<keyof VendorFormType, Yup.AnySchema> = {
  id: textField("Id", 20, true),
  productId: textField("Id", 20, true),
  productName: textField("Product Name", 50, true),
  vendorCode: textField("Vendor Code", 50, true),
  subProductId: textField("Sub Product Id", 20, true),
  subProductCode: textField("Sub Product Code", 50, true),
  modesSupported: textField("Mode Supported", 50, true),
  priority: textField("Priority", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
  blanks: textField("Blanks", 50, true),
};

export const headers: { key: keyof VendorType; label: string }[] = [
  { key: "id", label: "Id" },
  { key: "productId", label: "Product Id" },
  { key: "productName", label: "Product Name" },
  { key: "vendorName", label: "Vendor Name" },
  { key: "vendorCode", label: "Vendor Code" },
  { key: "subProductId", label: "Sub Product Id" },
  { key: "subProductCode", label: "Sub Product Code" },
  { key: "modesSupported", label: "Modes Supported" },
  { key: "priority", label: "Priority" },
  { key: "isActive", label: "Active" },
  { key: "blanks", label: "Blanks" },
  { key: "createdOn", label: "Created On" },
  { key: "createdBy", label: "Created By" },
  { key: "editedOn", label: "Edited On" },
  { key: "editedBy", label: "Edited By" },
];

export const data: VendorType[] = [
  {
    id: "201",
    productId: "PID-001",
    productName: "TravelCard",
    vendorName: "Vendor One",
    vendorCode: "V001",
    subProductId: "SPID-01",
    subProductCode: "CARD-T001",
    modesSupported: "Online, NFC",
    priority: "High",
    isActive: true,
    blanks: "abc",
    createdOn: moment().format("2024-09-23"),
    createdBy: "Admin",
    editedOn: moment().format("2025-01-22"),
    editedBy: "Editor1",
  },
  {
    id: "202",
    productId: "PID-002",
    productName: "GiftCard",
    vendorName: "Vendor Two",
    vendorCode: "V002",
    subProductId: "SPID-02",
    subProductCode: "CARD-G002",
    modesSupported: "Online",
    priority: "Medium",
    isActive: false,
    blanks: "",
    createdOn: moment().format("2024-02-15"),
    createdBy: "System",
    editedOn: moment().format("2024-04-20"),
    editedBy: "Editor2",
  },
];
