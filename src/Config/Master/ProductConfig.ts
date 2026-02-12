import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "products";
export const MASTER_URL = API_ENDPOINTS.MASTER.PRODUCTS; // Replace with actual URL or API_ENDPOINTS.MASTER.PRODUCTS

export interface ProductFormType {
  name: string;
  // productCode: string;
  // productCodeForScheme: string;
  isShow: boolean;
  hasCharges: boolean;
  isCommissions: boolean;
  transactionType?: "CREDIT" | "DEBIT" | "";
  isInventory: boolean;
  isSettlement: boolean;
  isVirtual: boolean;
  isVisible: boolean;
  reverseTx: boolean;
  // walletType: "",
  // subProducts: "",
  productGroup: string;
  clusterMode: boolean;
  blocked: boolean;
  active: boolean;
}

export interface ProductTableType extends ProductFormType {
  id: string;
  productCode: string;
  productCodeForScheme: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export type CreateProductPayload = Omit<
  ProductFormType,
  "isInventory" | "isVirtual" | "isShow"
> & {
  selectIsCommission: string;
  transactionType?: "CREDIT" | "DEBIT" | "";
  dashboardUrl: string;
  dashboardUrlForApk: string;
  dashboardImage: string;
  priority: number | string;
  minimumPostpaidBalance: number;
  minimumPrepaidBalance: number;
  minimumGullakBalance: number;
  minimumSingleTransactionAmount: number;
  maximumSingleTransactionAmount: number;
  sgst: number;
  tds: number;
  createdBy: string;
  inventory: {
    isInventory: boolean; // Omit, because it is nested inside object
    inventoryPrice: number;
    isVirtual: boolean; // Same
    isShow: boolean; //Same
  };
  cluster: {
    surcharge: boolean;
    schemeEngine: boolean;
  };
};

export type UpdateProductPayload = Omit<
  ProductFormType,
  "isInventory" | "isVirtual" | "isShow"
> & {
  selectIsCommission: string;
  transactionType?: "CREDIT" | "DEBIT" | "";
  dashboardUrl: string;
  dashboardUrlForApk: string;
  dashboardImage: string;
  priority: number | string;
  minimumPostpaidBalance: number;
  minimumPrepaidBalance: number;
  minimumGullakBalance: number;
  minimumSingleTransactionAmount: number;
  maximumSingleTransactionAmount: number;
  sgst: number;
  tds: number;
  editedBy: string;
  inventory: {
    isInventory: boolean;
    inventoryPrice: number;
    isVirtual: boolean;
    isShow: boolean;
  };
  cluster: {
    surcharge: boolean;
    schemeEngine: boolean;
  };
};

export type FetchProductParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: ProductFormType = {
  name: "",
  // productCode: "",
  // productCodeForScheme: "",
  isShow: true,
  hasCharges: false,
  isCommissions: false,
  transactionType: "",
  isInventory: false,
  isSettlement: false,
  isVirtual: false,
  isVisible: true,
  reverseTx: false,
  // walletType: "",
  // subProducts: "",
  productGroup: "",
  clusterMode: false,
  blocked: false,
  active: true,
};

export const validationSchema: Record<keyof ProductFormType, Yup.AnySchema> = {
  name: textField("Name", 50, true),
  // productCode: textField("Product Code", 30, true),
  // productCodeForScheme: textField("Product Code For Scheme", 30, true),
  isShow: Yup.boolean().required("Is Show is required"),
  hasCharges: Yup.boolean().required("Has Charges is required"),
  isCommissions: Yup.boolean().required("Is Commissions is required"),
  transactionType: Yup.string()
    .oneOf(["CREDIT", "DEBIT"], "Invalid Transaction Type")
    .required("Transaction Type is required"),
  isInventory: Yup.boolean().required("Is Inventory is required"),
  isSettlement: Yup.boolean().required("Is Settlement is required"),
  isVirtual: Yup.boolean().required("Is Virtual is required"),
  isVisible: Yup.boolean().required("Is Visible is required"),
  reverseTx: Yup.boolean().required("ReverseTx is required"),
  // walletType: textField("Wallet Type", 30, false),
  // subProducts: textField("Sub Products", 50, false),
  productGroup: textField("Product Group", 50, true),
  clusterMode: Yup.boolean().required("ClusterMode is required"),
  blocked: Yup.boolean().required("Blocked is required").default(false),
  active: Yup.boolean().required("Active is required").default(false),
};

export const headers: GenericTableHeader<ProductTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "name", label: "Name", filterType: "text" },
  { key: "productCode", label: "Product Code", filterType: "text" },
  {
    key: "productCodeForScheme",
    label: "Product Code For Scheme",
    filterType: "text",
  },
  { key: "isShow", label: "Is Show", filterType: "boolean" },
  { key: "hasCharges", label: "Has Charges", filterType: "boolean" },
  { key: "isCommissions", label: "Is Commissions", filterType: "boolean" },
  {
    key: "transactionType",
    label: "Transaction Type",
    filterType: "boolean",
    filterOptions: [
      { label: "CREDIT", value: "CREDIT" },
      { label: "DEBIT", value: "DEBIT" },
    ],
  },
  { key: "isInventory", label: "Is Inventory", filterType: "boolean" },
  { key: "isSettlement", label: "Is Settlement", filterType: "boolean" },
  { key: "isVirtual", label: "Is Virtual", filterType: "boolean" },
  { key: "isVisible", label: "Is Visible", filterType: "boolean" },
  { key: "reverseTx", label: "Reverse Tx", filterType: "boolean" },
  // { key: "walletType", label: "Wallet Type" },
  // { key: "subProducts", label: "Sub Products" },
  { key: "productGroup", label: "Product Group", filterType: "text" },
  { key: "clusterMode", label: "Cluster Mode", filterType: "boolean" },
  { key: "blocked", label: "Blocked", filterType: "boolean" },
  { key: "active", label: "Active", filterType: "boolean" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export function transformProductToTableType(
  product: Record<string, any>,
): ProductTableType {
  return {
    id: String(product.id),
    name: product.name ?? "",
    productCode: product.productCode ?? "",
    productCodeForScheme: product.productCodeForScheme ?? "",
    isShow: product.inventory?.isShow ?? false,
    hasCharges: product.hasCharges ?? false,
    isCommissions: product.isCommissions ?? false,
    transactionType: product.transactionType || "",
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
    createdOn: formatDateTime(product.createdOn) ?? "",
    createdBy: product.createdBy ?? "",
    editedOn: formatDateTime(product.editedOn) ?? "",
    editedBy: product.editedBy ?? "",
  };
}

export function transformProductToFormData(
  product: Record<string, any>,
): ProductFormType {
  return {
    name: product.name ?? "",
    // productCode: product.productCode ?? "",
    // productCodeForScheme: product.productCodeForScheme ?? "",
    isShow: product.inventory?.isShow ?? false,
    hasCharges: product.hasCharges ?? false,
    isCommissions: product.isCommissions ?? false,
    transactionType: product.transactionType ?? "",
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
  formData: ProductFormType,
): CreateProductPayload => {
  const { isInventory, isVirtual, isShow, ...rest } = formData;
  return {
    ...rest, // this brings all remaining fields from formData
    isCommissions: formData.isCommissions,
    selectIsCommission: "Fixed",
    transactionType: formData.transactionType || "",
    dashboardUrl: "https://google.com/", // Dummy default
    dashboardUrlForApk: "https://google.com/apk", // Dummy default
    dashboardImage: "https://google.com/image.png", // Dummy default
    priority: 1,
    minimumPostpaidBalance: 0.0,
    minimumPrepaidBalance: 0.0,
    minimumGullakBalance: 0.0,
    minimumSingleTransactionAmount: 1.0,
    maximumSingleTransactionAmount: 500100,
    sgst: 18.0,
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
  formData: ProductFormType,
): UpdateProductPayload => {
  const { isInventory, isVirtual, isShow, ...rest } = formData;
  return {
    ...rest, // this brings all remaining fields from formData
    isCommissions: formData.isCommissions,
    selectIsCommission: "Fixed",
    transactionType: formData.transactionType || "",
    dashboardUrl: "https://google.com/", // Dummy default
    dashboardUrlForApk: "https://google.com/apk", // Dummy default
    dashboardImage: "https://google.com/image.png", // Dummy default
    priority: 1,
    minimumPostpaidBalance: 0.0,
    minimumPrepaidBalance: 0.0,
    minimumGullakBalance: 0.0,
    minimumSingleTransactionAmount: 1.0,
    maximumSingleTransactionAmount: 500100,
    sgst: 18.0,
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

// export const handleProductFormSubmit = async (
//   mode: string,
//   id: string | undefined,
//   values: ProductFormType,
//   dispatch: AppDispatch,
//   navigate: NavigateFunction,
//   resetFormData: (form: ProductFormType) => void
// ) => {
//   if (mode === "edit" && id) {
//     const payload = transformFormToUpdateProductPayload(values);
//     try {
//       const res = await dispatch(
//         updateMasterItem({
//           key: MASTER_KEY,
//           url: MASTER_URL,
//           id,
//           data: payload,
//         })
//       ).unwrap();
//       toast.success(res.message || "Product updated successfully");
//       resetFormData(initialValues);
//       navigate("/master/product");
//     } catch (err: any) {
//       console.error("Update product failed:", err);
//       toast.error(err || "Failed to update product");
//     }
//   } else {
//     const payload = transformFormToCreateProductPayload(values);
//     try {
//       const res = await dispatch(
//         createMasterItem({ key: MASTER_KEY, url: MASTER_URL, data: payload })
//       ).unwrap();
//       toast.success(res.message || "Product created successfully");
//       resetFormData(initialValues);
//       navigate("/master/product");
//     } catch (err: any) {
//       console.error("Create product failed:", err);
//       toast.error(err || "Failed to create product");
//     }
//   }
// };
