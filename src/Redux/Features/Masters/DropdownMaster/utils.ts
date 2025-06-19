import { NavigateFunction } from "react-router-dom";
import { formatDateTime } from "../../../../Utils/utils";
import { AppDispatch } from "../../../Store/store";
import { toast } from "react-toastify";
import {
  DropdownFormType,
  DropdownTableType,
  initialValues,
} from "../../../../Config/Master/DropdownConfig";
import { CreateDropdownPayload } from "./types";
import { createDropdownMaster } from "./thunks";

// Convert raw API response to OperatorTableType (for table display)
export const mapToDropdownTableType = (
  raw: Record<string, any>
): DropdownTableType => {
  return {
    masterId: raw?.imMasterId ?? "",
    subMasterId: raw?.imSubMasterId ?? "",
    masterName: raw?.imMasterName ?? "",
    subMasterName: raw?.imSubMasterName ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformDropdownListToFormData = (
  raw: Record<string, any>
): DropdownFormType => ({
  masterName: raw?.imMasterName ?? "",
  subMasterName: raw?.imSubMasterName ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateDropdownPayload = (
  formData: DropdownFormType
): CreateDropdownPayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
// export const transformFormToUpdateOperatorPayload = (
//   formData: OperatorFormType
// ): UpdateOperatorPayload => ({
//   ...formData,
//   editedBy: localStorage.getItem("username") || "system",
// });

export const handleDropdownFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: DropdownFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (form: DropdownFormType) => void
) => {
  if (mode === "edit" && id) {
    // const payload = transformFormToUpdateOperatorPayload(values);
    // try {
    //   const res = await dispatch(
    //     updateOperator({ id, data: payload })
    //   ).unwrap();
    //   toast.success(res.message || "Operator updated successfully");
    //   resetFormData(initialValues);
    //   navigate("/master/operator-master");
    // } catch (err: any) {
    //   toast.error(err || "Failed to update operator");
    //   console.error("Update Operator failed:", err);
    // }
  } else {
    const payload = transformFormToCreateDropdownPayload(values);
    try {
      const res = await dispatch(createDropdownMaster(payload)).unwrap();
      toast.success(res.message || "Dropdown created successfully");
      resetFormData(initialValues);
      navigate("/master/dropdown-master");
    } catch (err: any) {
      toast.error(err || "Failed to create Dropdown");
      console.error("Create Dropdown failed:", err);
    }
  }
};
