import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";

// Full type for backend and table display
export type OperatorType = {
  id: string;
  operatorAlias: string;
  operatorCategory: string;
  operatorCode: string;
  operatorName: string;
  productCode: string;
  productId: string;
  subProductCode: string;
  subProductId: string;
  alias: string;
  isActive: Boolean;
  cardBinNo: string;
  createdOn: string;
  editedOn: string;
  createdBy: string;
  editedBy: string;
};

// Separate type for Formik
export type OperatorFormType = Pick<
  OperatorType,
  | "id"
  | "operatorAlias"
  | "operatorCategory"
  | "operatorCode"
  | "operatorName"
  | "productCode"
  | "productId"
  | "subProductCode"
  | "subProductId"
  | "alias"
  | "isActive"
  | "cardBinNo"
>;

export const validationSchema: Record<keyof OperatorFormType, Yup.AnySchema> = {
  id: textField("Id", 20, true),
  operatorAlias: textField("Operator Alias", 50, true),
  operatorCategory: textField("Operator Category", 50, true),
  operatorCode: textField("Operator Code", 30, true),
  operatorName: textField("Operator Name", 50, true),
  productCode: textField("Product Code", 30, true),
  productId: textField("Product ID", 30, true),
  subProductCode: textField("Sub Product Code", 30, true),
  subProductId: textField("Sub Product ID", 30, true),
  alias: textField("Alias", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
  cardBinNo: textField("Card BIN Number", 20, false),
};

export const initialValues: OperatorFormType = {
  id: "",
  operatorAlias: "",
  operatorCategory: "",
  operatorCode: "",
  operatorName: "",
  productCode: "",
  productId: "",
  subProductCode: "",
  subProductId: "",
  alias: "",
  isActive: false,
  cardBinNo: "",
};

export const data: OperatorType[] = [
  {
    id: "101",
    operatorAlias: "Airtel DTH",
    operatorCategory: "DTH",
    operatorCode: "DTH101",
    operatorName: "Airtel Digital TV",
    productCode: "BIN1234",
    productId: "PRD1001",
    subProductCode: "CARD-AX123",
    subProductId: "SUBPRD-AX123",
    alias: "Airtel TV Card",
    isActive: true,
    cardBinNo: "987654",
    createdOn: "2024-01-15",
    editedOn: "2024-04-12",
    createdBy: "Alice",
    editedBy: "Bob",
  },
  {
    id: "102",
    operatorAlias: "Jio Fiber",
    operatorCategory: "Broadband",
    operatorCode: "BRD102",
    operatorName: "Jio Broadband",
    productCode: "BIN5678",
    productId: "PRD1002",
    subProductCode: "CARD-JF456",
    subProductId: "SUBPRD-JF456",
    alias: "Jio Fiber Card",
    isActive: false,
    cardBinNo: "876543",
    createdOn: "2023-11-10",
    editedOn: "2024-02-18",
    createdBy: "Charlie",
    editedBy: "Diana",
  },
  {
    id: "103",
    operatorAlias: "BSNL Landline",
    operatorCategory: "Landline",
    operatorCode: "LL103",
    operatorName: "BSNL",
    productCode: "BIN9012",
    productId: "PRD1003",
    subProductCode: "CARD-BS789",
    subProductId: "SUBPRD-BS789",
    alias: "BSNL Card",
    isActive: true,
    cardBinNo: "765432",
    createdOn: "2024-03-22",
    editedOn: "2024-05-01",
    createdBy: "Eve",
    editedBy: "Frank",
  },
  {
    id: "104",
    operatorAlias: "Tata Sky",
    operatorCategory: "DTH",
    operatorCode: "DTH104",
    operatorName: "Tata Play",
    productCode: "BIN4321",
    productId: "PRD1004",
    subProductCode: "CARD-TP321",
    subProductId: "SUBPRD-TP321",
    alias: "Tata Sky Card",
    isActive: false,
    cardBinNo: "654321",
    createdOn: "2023-12-01",
    editedOn: "2024-01-05",
    createdBy: "Grace",
    editedBy: "Heidi",
  },
  {
    id: "105",
    operatorAlias: "ACT Fibernet",
    operatorCategory: "Broadband",
    operatorCode: "BRD105",
    operatorName: "ACT Internet",
    productCode: "BIN8765",
    productId: "PRD1005",
    subProductCode: "CARD-ACT654",
    subProductId: "SUBPRD-ACT654",
    alias: "ACT Card",
    isActive: false,
    cardBinNo: "543210",
    createdOn: "2024-02-14",
    editedOn: "2024-04-10",
    createdBy: "Ivan",
    editedBy: "Judy",
  },
];

export const headers: { key: keyof OperatorType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "operatorAlias", label: "Operator Alias" },
  { key: "operatorCategory", label: "Operator Category" },
  { key: "operatorCode", label: "Operator Code" },
  { key: "operatorName", label: "Operator Name" },
  { key: "productCode", label: "Product Code" },
  { key: "productId", label: "Product ID" },
  { key: "subProductCode", label: "Sub Product Code" },
  { key: "subProductId", label: "Sub Product ID" },
  { key: "alias", label: "Alias" },
  { key: "isActive", label: "Is Active" },
  { key: "cardBinNo", label: "Card BIN No" },
  { key: "createdOn", label: "Created On" },
  { key: "editedOn", label: "Edited On" },
  { key: "createdBy", label: "Created By" },
  { key: "editedBy", label: "Edited By" },
];
