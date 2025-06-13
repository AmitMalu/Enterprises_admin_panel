import { toast } from "react-toastify";
import {
  initialValues,
  SubProductFormType,
  SubProductTableType,
} from "../../../../Config/Master/SubProductConfig";
import { formatDateTime } from "../../../../Utils/utils";
import { createSubProduct, updateSubProduct } from "./thunks";
import { CreateSubProductPayload, UpdateSubProductPayload } from "./types";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../../Store/store";

// Util to safely transform raw API data into SubProductTableType
export const mapToSubProductTableType = (
  raw: Record<string, any>
): SubProductTableType => {
  return {
    id: raw?.id ?? "",
    subProductTitle: raw.subProductTitle ?? "",
    subProductCode: raw.subProductCode ?? "",
    productCode: raw.productCode ?? "",
    productId: raw.productId ?? "",
    productName: raw.productName ?? "",
    walletType: raw.walletType ?? "",
    isSettlement: !!raw.isSettlement,
    isActive: !!raw.isActive,
    enabled: !!raw.enabled,
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
    editedBy: raw.editedBy ?? "",
  };
};

export const transformSubProductToFormData = (
  raw: Record<string, any>
): SubProductFormType => {
  return {
    subProductTitle: raw.subProductTitle,
    subProductCode: raw.subProductCode,
    productId: String(raw.productId), // assuming it's productId (you may need to adjust this)
    walletType: raw.walletType,
    isSettlement: raw.isSettlement,
    isActive: raw.isActive,
    enabled: raw.enabled,
  };
};

export const transformFormToCreatePayload = (
  formData: SubProductFormType
): CreateSubProductPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

export const transformFormToUpdatePayload = (
  formData: SubProductFormType
): UpdateSubProductPayload => ({
  ...formData,
  editedBy: localStorage.getItem("username") || "system",
});

export const handleSubProductFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: SubProductFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (data: SubProductFormType) => void
) => {
  if (mode === "edit" && id) {
    const payload = transformFormToUpdatePayload(values);
    try {
      const res = await dispatch(
        updateSubProduct({ id, data: payload })
      ).unwrap();
      toast.success(res.message || "SubProduct updated successfully");
      resetFormData(initialValues);
      navigate("/master/sub-product-master");
    } catch (err: any) {
      console.error("Update SubProduct failed:", err);
      toast.error(err || "Failed to update SubProduct");
    }
  } else {
    const payload = transformFormToCreatePayload(values);
    try {
      const res = await dispatch(createSubProduct(payload)).unwrap();
      toast.success(res.message || "SubProduct created successfully");
      resetFormData(initialValues);
      navigate("/master/sub-product-master");
    } catch (err: any) {
      console.error("Create SubProduct failed:", err);
      toast.error(err || "Failed to create SubProduct");
    }
  }
};
