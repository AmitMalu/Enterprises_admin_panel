import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";

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
