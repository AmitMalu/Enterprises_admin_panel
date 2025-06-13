import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { ProductStateType } from "../../Redux/Features/Masters/ProductMaster/types";

export type ProductType = Pick<
  ProductStateType,
  | "id"
  | "name"
  | "productCode"
  | "productCodeForScheme"
  | "isShow"
  | "hasCharges"
  | "isCommissions"
  | "isInventory"
  | "isSettlement"
  | "isVirtual"
  | "isVisible"
  | "reverseTx"
  // | "walletType"
  // | "subProducts"
  | "productGroup"
  | "clusterMode"
  | "blocked"
  | "active"
>;

export interface ProductFormType {
  name: "";
  productCode: "";
  productCodeForScheme: "";
  isShow: false;
  hasCharges: false;
  isCommissions: false;
  isInventory: false;
  isSettlement: false;
  isVirtual: false;
  isVisible: false;
  reverseTx: false;
  // walletType: "",
  // subProducts: "",
  productGroup: "";
  clusterMode: false;
  blocked: false;
  active: false;
}

export interface ProductTableType extends ProductFormType {
  id: string;
  // createdBy: string;
  // createdOn?: string;
  // editedBy?: string;
  // editedOn?: string;
}

export const initialValues: ProductFormType = {
  name: "",
  productCode: "",
  productCodeForScheme: "",
  isShow: false,
  hasCharges: false,
  isCommissions: false,
  isInventory: false,
  isSettlement: false,
  isVirtual: false,
  isVisible: false,
  reverseTx: false,
  // walletType: "",
  // subProducts: "",
  productGroup: "",
  clusterMode: false,
  blocked: false,
  active: false,
};

export const validationSchema: Record<keyof ProductFormType, Yup.AnySchema> = {
  name: textField("Name", 50, true),
  productCode: textField("Product Code", 30, true),
  productCodeForScheme: textField("Product Code For Scheme", 30, true),
  isShow: Yup.boolean().required("Is Show is required"),
  hasCharges: Yup.boolean().required("Has Charges is required"),
  isCommissions: Yup.boolean().required("Is Commissions is required"),
  isInventory: Yup.boolean().required("Is Inventory is required"),
  isSettlement: Yup.boolean().required("Is Settlement is required"),
  isVirtual: Yup.boolean().required("Is Virtual is required"),
  isVisible: Yup.boolean().required("Is Visible is required"),
  reverseTx: Yup.boolean().required("ReverseTx is required"),
  // walletType: textField("Wallet Type", 30, false),
  // subProducts: textField("Sub Products", 50, false),
  productGroup: textField("Product Group", 50, true),
  clusterMode: Yup.boolean().required("ClusterMode is required"),
  blocked: Yup.boolean().required("Blocked is required"),
  active: Yup.boolean().required("Active is required"),
};

export const headers: { key: keyof ProductTableType; label: string }[] = [
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
  // { key: "walletType", label: "Wallet Type" },
  // { key: "subProducts", label: "Sub Products" },
  { key: "productGroup", label: "Product Group" },
  { key: "clusterMode", label: "Cluster Mode" },
  { key: "blocked", label: "Blocked" },
  { key: "active", label: "Active" },
];
