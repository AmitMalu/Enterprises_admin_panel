// import { toast } from "react-toastify";
// import {
//   initialValues,
//   SubProductFormType,
//   SubProductTableType,
// } from "../../../../Config/Master/SubProductConfig";
// import { formatDateTime } from "../../../../Utils/utils";
// import { createSubProduct, updateSubProduct } from "./thunks";
// import { CreateSubProductPayload, UpdateSubProductPayload } from "./types";
// import { NavigateFunction } from "react-router-dom";
// import { AppDispatch } from "../../../Store/store";


// export const handleSubProductFormSubmit = async (
//   mode: string,
//   id: string | undefined,
//   values: SubProductFormType,
//   dispatch: AppDispatch,
//   navigate: NavigateFunction,
//   resetFormData: (data: SubProductFormType) => void
// ) => {
//   if (mode === "edit" && id) {
//     const payload = transformFormToUpdatePayload(values);
//     try {
//       const res = await dispatch(
//         updateSubProduct({ id, data: payload })
//       ).unwrap();
//       toast.success(res.message || "SubProduct updated successfully");
//       resetFormData(initialValues);
//       navigate("/master/sub-product");
//     } catch (err: any) {
//       console.error("Update SubProduct failed:", err);
//       toast.error(err || "Failed to update SubProduct");
//     }
//   } else {
//     const payload = transformFormToCreatePayload(values);
//     try {
//       const res = await dispatch(createSubProduct(payload)).unwrap();
//       toast.success(res.message || "SubProduct created successfully");
//       resetFormData(initialValues);
//       navigate("/master/sub-product");
//     } catch (err: any) {
//       console.error("Create SubProduct failed:", err);
//       toast.error(err || "Failed to create SubProduct");
//     }
//   }
// };
