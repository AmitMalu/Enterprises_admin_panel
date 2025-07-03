import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";

export interface SubOperatorFormType {
  subOperatorName: string;
  operatorCode: string | number;
  category: string;
  isBlocked: boolean;
}

export interface SubOperatorTableType extends SubOperatorFormType {
  id: string;
  operatorAlias: string;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export const initialValues: SubOperatorFormType = {
  subOperatorName: "",
  operatorCode: "",
  category: "",
  isBlocked: false,
};

export const validationSchema: Record<
  keyof SubOperatorFormType,
  Yup.AnySchema
> = {
  subOperatorName: textField("Sub Operator Name", 50, true, true),
  operatorCode: textField("Operator Code", 50, true, true),
  category: textField("Operator Category", 100, true, true),
  isBlocked: Yup.boolean().required("IsBlocked is required"),
};

export const headers: GenericTableHeader<SubOperatorTableType>[] = [
  { key: "id", label: "ID", filterType: "text" },
  { key: "subOperatorName", label: "Sub Operator Name", filterType: "text" },
  {
    key: "operatorCode",
    label: "Operator Code",
    filterType: "text",
  },
  { key: "operatorAlias", label: "Operator Alias", filterType: "text" },
  { key: "category", label: "Operator Name", filterType: "text" },
  { key: "isBlocked", label: "isBlocked", filterType: "boolean" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
];
