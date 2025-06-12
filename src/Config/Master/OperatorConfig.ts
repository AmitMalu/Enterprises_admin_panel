import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";

export interface OperatorFormType {
  operatorCategory: string;
  operatorCode: string;
  operatorName: string;
  operatorAlias: string;
  alias: string;
  productId: string | number;
  subProductId: string | number;
  cardBinNo: string | number;
  isActive: boolean;
}

export interface OperatorTableType extends OperatorFormType {
  id: string;
  productCode: string;
  subProductCode: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export const initialValues: OperatorFormType = {
  operatorCategory: "",
  operatorCode: "",
  operatorName: "",
  operatorAlias: "",
  alias: "",
  productId: "",
  subProductId: "",
  cardBinNo: "",
  isActive: false,
};

export const validationSchema: Record<keyof OperatorFormType, Yup.AnySchema> = {
  operatorCategory: textField("Operator Category", 100, true, true),
  operatorCode: textField("Operator Code", 50, true, true),
  operatorName: textField("Operator Name", 50, true, true),
  operatorAlias: textField("Operator Alias", 50, true, true),
  alias: textField("Alias", 50, true, true),
  productId: textField("Product Id", 50, true),
  subProductId: textField("Sub Product Id", 50, true),
  cardBinNo: textField("Card Bin No", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
};

export const headers: { key: keyof OperatorTableType; label: string }[] = [
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
