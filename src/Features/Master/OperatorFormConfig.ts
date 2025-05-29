import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";

// Full type for backend and table display
export type OperatorType = {
  id: string;
  operatorAlias: string;
  operatorCategory: string;
  operatorCode: string;
  operatorName: string;
  productCode: string;
  productId: string;
  subProductCode: string;
  subProductId: string;
  alias: string;
  isActive: Boolean;
  cardBinNo: string;
  createdOn: string;
  editedOn: string;
  createdBy: string;
  editedBy: string;
};

// Separate type for Formik
export type OperatorFormType = Pick<
  OperatorType,
  | "id"
  | "operatorAlias"
  | "operatorCategory"
  | "operatorCode"
  | "operatorName"
  | "productCode"
  | "productId"
  | "subProductCode"
  | "subProductId"
  | "alias"
  | "isActive"
  | "cardBinNo"
>;

export const validationSchema: Record<keyof OperatorFormType, Yup.AnySchema> = {
  id: textField("Id", 20, true),
  operatorAlias: textField("Operator Alias", 50, true),
  operatorCategory: textField("Operator Category", 50, true),
  operatorCode: textField("Operator Code", 30, true),
  operatorName: textField("Operator Name", 50, true),
  productCode: textField("Product Code", 30, true),
  productId: textField("Product ID", 30, true),
  subProductCode: textField("Sub Product Code", 30, true),
  subProductId: textField("Sub Product ID", 30, true),
  alias: textField("Alias", 50, true),
  isActive: Yup.boolean().required("Is Active is required"),
  cardBinNo: textField("Card BIN Number", 20, false),
};

export const initialValues: OperatorFormType = {
  id: "",
  operatorAlias: "",
  operatorCategory: "",
  operatorCode: "",
  operatorName: "",
  productCode: "",
  productId: "",
  subProductCode: "",
  subProductId: "",
  alias: "",
  isActive: false,
  cardBinNo: "",
};
