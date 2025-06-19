import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";
import * as Yup from "yup";

export interface DropdownFormType {
  masterName: string;
  subMasterName: string;
}

export interface DropdownTableType extends DropdownFormType {
  masterId: string | number;
  subMasterId: string | number;
}

export const initialValues: DropdownFormType = {
  masterName: "",
  subMasterName: "",
};

export const validationSchema: Record<keyof DropdownFormType, Yup.AnySchema> = {
  masterName: textField("Master Name", 50, true),
  subMasterName: textField("Sub Master Name", 50, true),
};

export const headers: GenericTableHeader<DropdownTableType>[] = [
  { key: "masterId", label: "Master Id", filterType: "text" },
  { key: "subMasterId", label: "Sub Master Id", filterType: "text" },
  { key: "masterName", label: "Master Name", filterType: "text" },
  { key: "subMasterName", label: "Sub Master Name", filterType: "text" },
];
