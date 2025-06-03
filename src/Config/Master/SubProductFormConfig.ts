import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

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

export const validationSchema: Record<keyof SubProductFormType, Yup.AnySchema> = {
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
