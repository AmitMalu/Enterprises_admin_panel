import { NavigateFunction } from "react-router-dom";
import { formatDateTime } from "../../../../Utils/utils";
import { AppDispatch } from "../../../Store/store";
import { toast } from "react-toastify";
import {
  initialValues,
  SubOperatorFormType,
  SubOperatorTableType,
} from "../../../../Config/Master/SubOperatorConfig";
import { CreateSubOperatorPayload, UpdateSubOperatorPayload } from "./types";
import { createSubOperator, updateSubOperator } from "./thunks";

// Convert raw API response to OperatorTableType (for table display)
export const mapToSubOperatorTableType = (
  raw: Record<string, any>
): SubOperatorTableType => {
  return {
    id: raw.id ?? "",
    subOperatorName: raw.subOperatorName ?? "",
    operatorCode: raw.operatorCode ?? "",
    operatorAlias: raw.operatorAlias ?? "",
    category: raw.category ?? "",
    isBlocked: !!raw.isBlocked,
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformSubOperatorToFormData = (
  raw: Record<string, any>
): SubOperatorFormType => ({
  subOperatorName: raw.subOperatorName ?? "",
  operatorCode: raw.operatorCode ?? "",
  category: raw.category ?? "",
  isBlocked: raw.isBlocked ?? false,
});

// Transform form data to Create payload
export const transformFormToCreateSubOperatorPayload = (
  formData: SubOperatorFormType
): CreateSubOperatorPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSubOperatorPayload = (
  formData: SubOperatorFormType
): UpdateSubOperatorPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

export const handleSubOperatorFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: SubOperatorFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (form: SubOperatorFormType) => void
) => {
  if (mode === "edit" && id) {
    try {
      const payload = transformFormToUpdateSubOperatorPayload(values);
      const res = await dispatch(
        updateSubOperator({ id, data: payload })
      ).unwrap();
      toast.success(res.message || "Sub Operator updated successfully");
      resetFormData(initialValues);
      navigate("/master/sub-operator-master");
    } catch (err: any) {
      toast.error(err || "Failed to update Sub Operator");
      console.error("Update Sub Operator failed:", err);
    }
  } else {
    try {
      const payload = transformFormToCreateSubOperatorPayload(values);
      const res = await dispatch(createSubOperator(payload)).unwrap();
      toast.success(res.message || "Sub Operator created successfully");
      resetFormData(initialValues);
      navigate("/master/sub-operator-master");
    } catch (err: any) {
      toast.error(err || "Failed to create Sub Operator");
      console.error("Create Sub Operator failed:", err);
    }
  }
};
