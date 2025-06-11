import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
export interface SubProductFormType {
  subProductTitle: string;
  subProductCode: string;
  productId: string; // or productId: string | number if you use ID
  walletType: string;
  isSettlement: boolean;
  isActive: boolean;
  enabled: boolean;
}
export interface SubProductTableType extends SubProductFormType {
  id?: string;
  productName: string;
  productCode: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export const initialValues: SubProductFormType = {
  subProductTitle: "",
  subProductCode: "",
  productId: "",
  walletType: "",
  isSettlement: false,
  isActive: true,
  enabled: true,
};

export const validationSchema: Record<keyof SubProductFormType, Yup.AnySchema> =
  {
    subProductTitle: textField("Sub Product Title", 100, true),
    subProductCode: textField("Sub Product Code", 50, true),
    productId: textField("Product", 50, true),
    walletType: textField("Wallet Type", 50, true),
    isSettlement: Yup.boolean().required("Is Settlement is Required"),
    isActive: Yup.boolean().required("Is Active is required"),
    enabled: Yup.boolean().required("Enabled is required"),
  };

export const headers: { key: keyof SubProductTableType; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "subProductTitle", label: "Sub Product Title" },
  { key: "subProductCode", label: "Sub Product Code" },
  { key: "productName", label: "Product" },
  { key: "walletType", label: "Wallet Type" },
  { key: "isSettlement", label: "Is Settlement" },
  { key: "isActive", label: "Is Active" },
  { key: "enabled", label: "Enabled" },
  { key: "createdOn", label: "Created On" },
  { key: "editedOn", label: "Edited On" },
  { key: "createdBy", label: "Created By" },
  { key: "editedBy", label: "Edited By" },
];
