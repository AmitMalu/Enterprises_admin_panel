import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

export type ProductType = {
  id: string;
  name: string;
  productCode: string;
  productCodeForScheme: string;
  isShow: boolean;
  hasCharges: string;
  isCommissions: boolean;
  isInventory: boolean;
  isSettlement: boolean;
  isVirtual: boolean;
  isVisible: boolean;
  reverseTx: string;
  walletType: string;
  subProducts: string;
  productGroup: string;
  clusterMode: string;
  blocked: boolean;
  active: boolean;
};

export const initialValues: ProductType = {
  id: "",
  name: "",
  productCode: "",
  productCodeForScheme: "",
  isShow: false,
  hasCharges: "",
  isCommissions: false,
  isInventory: false,
  isSettlement: false,
  isVirtual: false,
  isVisible: false,
  reverseTx: "",
  walletType: "",
  subProducts: "",
  productGroup: "",
  clusterMode: "",
  blocked: false,
  active: false,
};

export const validationSchema: Record<keyof ProductType, Yup.AnySchema> = {
  id: textField("ID", 50, true),
  name: textField("Name", 50, true),
  productCode: textField("Product Code", 30, true),
  productCodeForScheme: textField("Product Code For Scheme", 30, true),
  isShow: Yup.boolean().required("Is Show is required"),
  hasCharges: textField("Has Charges", 20, true),
  isCommissions: Yup.boolean().required("Is Commissions is required"),
  isInventory: Yup.boolean().required("Is Inventory is required"),
  isSettlement: Yup.boolean().required("Is Settlement is required"),
  isVirtual: Yup.boolean().required("Is Virtual is required"),
  isVisible: Yup.boolean().required("Is Visible is required"),
  reverseTx: textField("Reverse Tx", 20, true),
  walletType: textField("Wallet Type", 30, true),
  subProducts: textField("Sub Products", 50, true),
  productGroup: textField("Product Group", 50, true),
  clusterMode: textField("Cluster Mode", 30, true),
  blocked: Yup.boolean().required("Blocked is required"),
  active: Yup.boolean().required("Active is required"),
};

export const data: ProductType[] = [
  {
    id: "101",
    name: "Card A",
    productCode: "V001",
    productCodeForScheme: "Vendor X",
    isShow: true,
    hasCharges: "BIN987",
    isCommissions: false,
    isInventory: true,
    isSettlement: true,
    isVirtual: false,
    isVisible: true,
    reverseTx: "P001",
    walletType: "C001",
    subProducts: "S001",
    productGroup: "2024-05-10",
    clusterMode: "UserX",
    blocked: false,
    active: true,
  },
  {
    id: "102",
    name: "Card A",
    productCode: "V001",
    productCodeForScheme: "Vendor X",
    isShow: false,
    hasCharges: "BIN987",
    isCommissions: true,
    isInventory: true,
    isSettlement: true,
    isVirtual: false,
    isVisible: true,
    reverseTx: "P001",
    walletType: "C001",
    subProducts: "S001",
    productGroup: "2024-05-10",
    clusterMode: "UserX",
    blocked: false,
    active: true,
  },
];

export const headers: { key: keyof ProductType; label: string }[] = [
  { key: "id", label: "Id" },
  { key: "name", label: "Name" },
  { key: "productCode", label: "Product Code" },
  { key: "productCodeForScheme", label: "Product Code For Scheme" },
  { key: "isShow", label: "Is Show" },
  { key: "hasCharges", label: "Has Charges" },
  { key: "isCommissions", label: "Is Commissions" },
  { key: "isInventory", label: "Is Inventory" },
  { key: "isSettlement", label: "Is Settlement" },
  { key: "isVirtual", label: "Is Virtual" },
  { key: "isVisible", label: "Is Visible" },
  { key: "reverseTx", label: "Reverse Tx" },
  { key: "walletType", label: "Wallet Type" },
  { key: "subProducts", label: "Sub Products" },
  { key: "productGroup", label: "Product Group" },
  { key: "clusterMode", label: "Cluster Mode" },
  { key: "blocked", label: "Blocked" },
  { key: "active", label: "Active" },
];
