import { GenericTableHeader } from "../../Utils/utils";
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

export const headers: GenericTableHeader<OperatorTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "operatorAlias", label: "Operator Alias", filterType: "text" },
  {
    key: "operatorCategory",
    label: "Operator Category",
    filterType: "text",
  },
  { key: "operatorCode", label: "Operator Code", filterType: "text" },
  { key: "operatorName", label: "Operator Name", filterType: "text" },
  { key: "productCode", label: "Product Code", filterType: "text" },
  { key: "productId", label: "Product ID", filterType: "text" },
  { key: "subProductCode", label: "Sub Product Code", filterType: "text" },
  { key: "subProductId", label: "Sub Product ID", filterType: "text" },
  { key: "alias", label: "Alias", filterType: "text" },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "cardBinNo", label: "Card BIN No", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];
