import { NavigateFunction } from "react-router-dom";
import { formatDateTime } from "../../../../Utils/utils";
import { AppDispatch } from "../../../Store/store";
import { toast } from "react-toastify";
import {
  initialValues,
  VendorFormType,
  VendorTableType,
} from "../../../../Config/Master/VendorConfig";
import { CreateVendorPayload, UpdateVendorPayload } from "./types";
import { createVendor, updateVendor } from "./thunks";

// Convert raw API response to OperatorTableType (for table display)
export const mapToVendorTableType = (
  raw: Record<string, any>
): VendorTableType => {
  return {
    id: raw.id ?? "",
    vendorName: raw.vendorName ?? "",
    vendorCode: raw.vendorCode ?? "",
    productId: raw.productId ?? "",
    productCode: raw.productCode ?? "",
    subProductId: raw.subProductId ?? "",
    subProductCode: raw.subProductCode ?? "",
    modesSupported: raw.modesSupported ?? "",
    priority: String(raw.priority) ?? "1",
    isActive: !!raw.isActive,
    bankType: raw.bankType ?? "public",
    website: raw.website ?? "",
    logo: raw.logo ?? "",
    parameter: raw.parameter ?? "",
    createdBy: raw.createdBy ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    editedBy: raw.editedBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformVendorToFormData = (
  raw: Record<string, any>
): VendorFormType => ({
  vendorName: raw.vendorName ?? "",
  vendorCode: raw.vendorCode ?? "",
  productId: raw.productId ?? "",
  subProductId: raw.subProductId ?? "",
  modesSupported: raw.modesSupported ?? "",
  priority: String(raw.priority) ?? "1",
  isActive: !!raw.isActive,
  bankType: raw.bankType ?? "public",
  website: raw.website ?? "",
  logo: raw.logo ?? "",
  parameter: raw.parameter ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateVendorPayload = (
  formData: VendorFormType
): CreateVendorPayload => ({
  ...formData,
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  priority: Number(formData.priority) ?? 1,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateVendorPayload = (
  formData: VendorFormType
): UpdateVendorPayload => ({
  ...formData,
  vendorAccount: {
    transactionRateType: "Slab",
    transactionRate: 6.5,
    accVerificationCharges: 17.0,
    apiCharges: 9.0,
    bankCharges: 17.0,
    gst: 19.0,
  },
  priority: Number(formData.priority) ?? 1,
  editedBy: localStorage.getItem("username") || "system",
});

export const handleVendorFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: VendorFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (form: VendorFormType) => void
) => {
  if (mode === "edit" && id) {
    const payload = transformFormToUpdateVendorPayload(values);
    try {
      const res = await dispatch(updateVendor({ id, data: payload })).unwrap();
      toast.success(res.message || "Vendor updated successfully");
      resetFormData(initialValues);
      navigate("/master/Vendor");
    } catch (err: any) {
      toast.error(err || "Failed to update Vendor");
      console.error("Update Vendor failed:", err);
    }
  } else {
    const payload = transformFormToCreateVendorPayload(values);
    try {
      const res = await dispatch(createVendor(payload)).unwrap();
      toast.success(res.message || "Vendor created successfully");
      resetFormData(initialValues);
      navigate("/master/Vendor");
    } catch (err: any) {
      toast.error(err || "Failed to create Vendor");
      console.error("Create Vendor failed:", err);
    }
  }
};
