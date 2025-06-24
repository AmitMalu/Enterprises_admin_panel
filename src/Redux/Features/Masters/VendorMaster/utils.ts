// import { NavigateFunction } from "react-router-dom";
// import { formatDateTime } from "../../../../Utils/utils";
// import { AppDispatch } from "../../../Store/store";
// import { toast } from "react-toastify";
// import {
//   initialValues,
//   VendorFormType,
//   VendorTableType,
// } from "../../../../Config/Master/VendorConfig";
// import { CreateVendorPayload, UpdateVendorPayload } from "./types";
// import { createVendor, updateVendor } from "./thunks";

// // Convert raw API response to OperatorTableType (for table display)


// export const handleVendorFormSubmit = async (
//   mode: string,
//   id: string | undefined,
//   values: VendorFormType,
//   dispatch: AppDispatch,
//   navigate: NavigateFunction,
//   resetFormData: (form: VendorFormType) => void
// ) => {
//   if (mode === "edit" && id) {
//     const payload = transformFormToUpdateVendorPayload(values);
//     try {
//       const res = await dispatch(updateVendor({ id, data: payload })).unwrap();
//       toast.success(res.message || "Vendor updated successfully");
//       resetFormData(initialValues);
//       navigate("/master/Vendor");
//     } catch (err: any) {
//       toast.error(err || "Failed to update Vendor");
//       console.error("Update Vendor failed:", err);
//     }
//   } else {
//     const payload = transformFormToCreateVendorPayload(values);
//     try {
//       const res = await dispatch(createVendor(payload)).unwrap();
//       toast.success(res.message || "Vendor created successfully");
//       resetFormData(initialValues);
//       navigate("/master/Vendor");
//     } catch (err: any) {
//       toast.error(err || "Failed to create Vendor");
//       console.error("Create Vendor failed:", err);
//     }
//   }
// };
