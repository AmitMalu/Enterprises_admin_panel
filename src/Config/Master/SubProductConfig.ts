import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { GenericTableHeader } from "../../Utils/utils";
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

export const headers: GenericTableHeader<SubProductTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "subProductTitle", label: "Sub Product Title", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "productName", label: "Product", filterType: "text" },
  { key: "walletType", label: "Wallet Type", filterType: "text" },
  { key: "isSettlement", label: "Is Settlement", filterType: "boolean" },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "enabled", label: "Enabled", filterType: "boolean" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];
