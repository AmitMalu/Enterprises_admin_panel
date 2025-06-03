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
