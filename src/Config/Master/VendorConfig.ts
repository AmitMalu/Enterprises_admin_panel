import * as Yup from "yup";
import { textField, websiteValidation } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";

export type VendorFormType = {
  vendorName: string;
  vendorCode: string;
  productId: string | number;
  subProductId: string | number;
  modesSupported: string;
  priority: string | number;
  isActive: boolean;
  bankType: string;
  website?: string;
  logo?: string;
  parameter?: string;
};

export interface VendorTableType extends VendorFormType {
  id: string;
  productCode: string;
  subProductCode: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export const initialValues: VendorFormType = {
  vendorName: "",
  vendorCode: "",
  productId: "",
  subProductId: "",
  modesSupported: "",
  priority: "",
  isActive: false,
  bankType: "",
  website: "",
  logo: "",
  parameter: "",
};

export const validationSchema: Record<keyof VendorFormType, Yup.AnySchema> = {
  vendorName: textField("Vendor Name", 50, true),
  vendorCode: textField("Vendor Code", 50, true),
  productId: textField("Product Id", 20, true),
  subProductId: textField("Sub Product Id", 20, true),
  modesSupported: textField("Mode Supported", 50, true),
  priority: textField("Priority", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
  bankType: textField("BankType", 50, true),
  website: websiteValidation,
  logo: websiteValidation,
  parameter: textField("Parameter", 50, false),
};

export const headers: GenericTableHeader<VendorTableType>[] = [
  { key: "id", label: "Id", filterType: "text" },
  { key: "vendorName", label: "Vendor Name", filterType: "text" },
  { key: "vendorCode", label: "Vendor Code", filterType: "text" },
  { key: "productId", label: "Product Id", filterType: "text" },
  { key: "subProductId", label: "Sub Product Id", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "modesSupported", label: "Modes Supported", filterType: "text" },
  { key: "priority", label: "Priority", filterType: "text" },
  { key: "isActive", label: "Active", filterType: "boolean" },
  { key: "bankType", label: "Blanks", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];

// export const data: VendorType[] = [
//   {
//     id: "201",
//     productId: "PID-001",
//     productName: "TravelCard",
//     vendorName: "Vendor One",
//     vendorCode: "V001",
//     subProductId: "SPID-01",
//     subProductCode: "CARD-T001",
//     modesSupported: "Online, NFC",
//     priority: "High",
//     isActive: true,
//     blanks: "abc",
//     createdOn: moment().format("2024-09-23"),
//     createdBy: "Admin",
//     editedOn: moment().format("2025-01-22"),
//     editedBy: "Editor1",
//   },
//   {
//     id: "202",
//     productId: "PID-002",
//     productName: "GiftCard",
//     vendorName: "Vendor Two",
//     vendorCode: "V002",
//     subProductId: "SPID-02",
//     subProductCode: "CARD-G002",
//     modesSupported: "Online",
//     priority: "Medium",
//     isActive: false,
//     blanks: "",
//     createdOn: moment().format("2024-02-15"),
//     createdBy: "System",
//     editedOn: moment().format("2024-04-20"),
//     editedBy: "Editor2",
//   },
// ];
