import { toast } from "react-toastify";
import {
  initialValues,
  ProductFormType,
  ProductTableType,
  ProductType,
} from "../../../../Config/Master/ProductConfig";
import { CreateProductPayload, UpdateProductPayload } from "./types";
import { createProduct, updateProduct } from "./thunks";
import { AppDispatch } from "../../../Store/store";
import { NavigateFunction } from "react-router-dom";

export function transformProductToTableType(
  product: Record<string, any>
): ProductTableType {
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

export function transformProductToFormData(
  product: Record<string, any>
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

export const transformFormToCreateProductPayload = (
  formData: ProductFormType
): CreateProductPayload => {
  const { isInventory, isVirtual, isShow, ...rest } = formData;
  return {
    ...rest, // this brings all remaining fields from formData
    isCommissions: formData.isCommissions,
    selectIsCommission: "Fixed",
    transactionType: "UPI",
    dashboardUrl: "https://google.com/", // Dummy default
    dashboardUrlForApk: "https://google.com/apk", // Dummy default
    dashboardImage: "https://google.com/image.png", // Dummy default
    priority: 1,
    minimumPostpaidBalance: 0.0,
    minimumPrepaidBalance: 0.0,
    minimumGullakBalance: 0.0,
    minimumSingleTransactionAmount: 1.0,
    maximumSingleTransactionAmount: 500100,
    sgst: 0.0,
    tds: 5.0,
    createdBy: localStorage.getItem("username") || "system",
    inventory: {
      isInventory,
      inventoryPrice: 0.0,
      isVirtual,
      isShow,
    },
    cluster: {
      surcharge: false,
      schemeEngine: false,
    },
  };
};

export const transformFormToUpdateProductPayload = (
  formData: ProductFormType
): UpdateProductPayload => {
  const { isInventory, isVirtual, isShow, ...rest } = formData;
  return {
    ...rest, // this brings all remaining fields from formData
    isCommissions: formData.isCommissions,
    selectIsCommission: "Fixed",
    transactionType: "UPI",
    dashboardUrl: "https://google.com/", // Dummy default
    dashboardUrlForApk: "https://google.com/apk", // Dummy default
    dashboardImage: "https://google.com/image.png", // Dummy default
    priority: 1,
    minimumPostpaidBalance: 0.0,
    minimumPrepaidBalance: 0.0,
    minimumGullakBalance: 0.0,
    minimumSingleTransactionAmount: 1.0,
    maximumSingleTransactionAmount: 500100,
    sgst: 0.0,
    tds: 5.0,
    editedBy: localStorage.getItem("username") || "system",
    inventory: {
      isInventory,
      inventoryPrice: 0.0,
      isVirtual,
      isShow,
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
  values: ProductFormType,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  resetFormData: (form: ProductFormType) => void
) => {
  if (mode === "edit" && id) {
    const payload = transformFormToUpdateProductPayload(values);
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
    const payload = transformFormToCreateProductPayload(values);
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
