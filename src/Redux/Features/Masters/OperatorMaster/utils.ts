import { NavigateFunction } from "react-router-dom";
import {
  initialValues,
  OperatorFormType,
  OperatorTableType,
} from "../../../../Config/Master/OperatorConfig";
import { formatDateTime } from "../../../../Utils/utils";
import { AppDispatch } from "../../../Store/store";
import { CreateOperatorPayload, UpdateOperatorPayload } from "./types";
import { createOperator, updateOperator } from "./thunks";
import { toast } from "react-toastify";

// Convert raw API response to OperatorTableType (for table display)
export const  mapToOperatorTableType = (
  raw: Record<string, any>
): OperatorTableType => {
  return {
    id: raw.id ?? "",
    operatorCategory: raw.operatorCategory ?? "",
    operatorCode: raw.operatorCode ?? "",
    operatorName: raw.operatorName ?? "",
    operatorAlias: raw.operatorAlias ?? "",
    alias: raw.alias ?? "",
    productCode: raw.productCode ?? "",
    productId: raw.productId ?? "",
    subProductCode: raw.subProductCode ?? "",
    subProductId: raw.subProductId ?? "",
    cardBinNo: raw.cardBinNo ?? "",
    isActive: !!raw.isActive,
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformOperatorToFormData = (
  raw: Record<string, any>
): OperatorFormType => ({
  operatorCategory: raw.operatorCategory ?? "",
  operatorCode: raw.operatorCode ?? "",
  operatorName: raw.operatorName ?? "",
  operatorAlias: raw.operatorAlias ?? "",
  alias: raw.alias ?? "",
  productId: String(raw.productId),
  subProductId: String(raw.subProductId),
  cardBinNo: raw.cardBinNo ?? "",
  isActive: !!raw.isActive,
});

// Transform form data to Create payload
export const transformFormToCreateOperatorPayload = (
  formData: OperatorFormType
): CreateOperatorPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateOperatorPayload = (
  formData: OperatorFormType
): UpdateOperatorPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

export const handleOperatorFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: OperatorFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (form: OperatorFormType) => void
) => {
  if (mode === "edit" && id) {
    const payload = transformFormToUpdateOperatorPayload(values);
    try {
      const res = await dispatch(
        updateOperator({ id, data: payload })
      ).unwrap();
      toast.success(res.message || "Operator updated successfully");
      resetFormData(initialValues);
      navigate("/master/operator");
    } catch (err: any) {
      toast.error(err || "Failed to update operator");
      console.error("Update Operator failed:", err);
    }
  } else {
    const payload = transformFormToCreateOperatorPayload(values);
    try {
      const res = await dispatch(createOperator(payload)).unwrap();
      toast.success(res.message || "Operator created successfully");
      resetFormData(initialValues);
      navigate("/master/operator");
    } catch (err: any) {
      toast.error(err || "Failed to create operator");
      console.error("Create Operator failed:", err);
    }
  }
};
