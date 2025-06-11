import { toast } from "react-toastify";
import {
  initialValues,
  ProductType,
} from "../../../../Config/Master/ProductConfig";
import { ProductStateType } from "./types";
import { createProduct, updateProduct } from "./thunks";
import { AppDispatch } from "../../../Store/store";
import { NavigateFunction } from "react-router-dom";

export function transformProductToFormData(
  product: ProductStateType
): ProductType {
  return {
    id: String(product.id),
    name: product.name ?? "",
    productCode: product.productCode ?? "",
    productCodeForScheme: product.productCodeForScheme ?? "",
    isShow: product.inventory?.isShow ?? false,
    hasCharges: product.hasCharges ?? false,
    isCommissions: product.isCommissions ?? false,
    isInventory: product.inventory?.isInventory ?? false,
    isSettlement: product.isSettlement ?? false,
    isVirtual: product.inventory?.isVirtual ?? false,
    isVisible: product.isVisible ?? false,
    reverseTx: product.reverseTx ?? false,
    // walletType: "", // Fill if applicable
    // subProducts: "", // Fill if applicable
    productGroup: product.productGroup ?? "",
    clusterMode: product.clusterMode ?? false,
    blocked: product.blocked ?? false,
    active: product.active ?? false,
  };
}

export const transformFormDataToApiPayload = (
  formData: ProductType
): ProductStateType => {
  return {
    // id: formData.id || "", // optional
    name: formData.name,
    productCode: formData.productCode,
    productCodeForScheme: formData.productCodeForScheme,
    isVisible: formData.isVisible,
    isCommissions: formData.isCommissions,
    selectIsCommission: "Fixed",
    transactionType: "UPI",
    active: formData.active,
    dashboardUrl: "https://google.com/", // Dummy default
    dashboardUrlForApk: "https://google.com/apk", // Dummy default
    dashboardImage: "https://google.com/image.png", // Dummy default
    priority: 1,
    productGroup: formData.productGroup,
    reverseTx: formData.reverseTx,
    clusterMode: formData.clusterMode,
    isSettlement: formData.isSettlement,
    hasCharges: formData.hasCharges,
    blocked: formData.blocked,
    minimumPostpaidBalance: 0.0,
    minimumPrepaidBalance: 0.0,
    minimumGullakBalance: 0.0,
    minimumSingleTransactionAmount: 1.0,
    maximumSingleTransactionAmount: 500100,
    sgst: 0.0,
    tds: 5.0,
    createdBy: localStorage.getItem("username") || "system",
    // editedBy: null,
    // createdOn: new Date().toISOString(),
    // editedOn: new Date().toISOString(),
    inventory: {
      isInventory: formData.isInventory,
      inventoryPrice: 0.0,
      isVirtual: formData.isVirtual,
      isShow: formData.isShow,
    },
    cluster: {
      surcharge: false,
      schemeEngine: false,
    },
  };
};

export const handleProductFormSubmit = async (
  mode: string,
  id: string | undefined,
  values: ProductType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (data: ProductType) => void
) => {
  const payload = transformFormDataToApiPayload(values);

  if (mode === "edit" && id) {
    try {
      const res = await dispatch(updateProduct({ id, data: payload })).unwrap();
      toast.success(res.message || "Product updated successfully");
      resetFormData(initialValues);
      navigate("/master/product-master");
    } catch (err: any) {
      console.error("Update product failed:", err);
      toast.error(err || "Failed to update product");
    }
  } else {
    try {
      const res = await dispatch(createProduct(payload)).unwrap();
      toast.success(res.message || "Product created successfully");
      resetFormData(initialValues);
      navigate("/master/product-master");
    } catch (err: any) {
      console.error("Create product failed:", err);
      toast.error(err || "Failed to create product");
    }
  }
};
