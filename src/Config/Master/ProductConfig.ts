import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
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

export const headers: GenericTableHeader<ProductTableType>[] = [
  { key: "id", label: "Id", filterType: "text", searchable : true },
  { key: "name", label: "Name", filterType: "text" },
  { key: "productCode", label: "Product Code", filterType: "text" },
  {
    key: "productCodeForScheme",
    label: "Product Code For Scheme",
    filterType: "text",
  },
  { key: "isShow", label: "Is Show", filterType: "boolean" },
  { key: "hasCharges", label: "Has Charges", filterType: "boolean" },
  { key: "isCommissions", label: "Is Commissions", filterType: "boolean" },
  { key: "isInventory", label: "Is Inventory", filterType: "boolean" },
  { key: "isSettlement", label: "Is Settlement", filterType: "boolean" },
  { key: "isVirtual", label: "Is Virtual", filterType: "boolean" },
  { key: "isVisible", label: "Is Visible", filterType: "boolean" },
  { key: "reverseTx", label: "Reverse Tx", filterType: "boolean" },
  // { key: "walletType", label: "Wallet Type" },
  // { key: "subProducts", label: "Sub Products" },
  { key: "productGroup", label: "Product Group", filterType: "text" },
  { key: "clusterMode", label: "Cluster Mode", filterType: "boolean" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "active", label: "Active", filterType: "boolean" },
];
