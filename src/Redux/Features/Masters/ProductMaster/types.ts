import { ProductFormType } from "../../../../Config/Master/ProductConfig";
export interface ProductMasterState {
  products: Record<string, any>[];
  selectedProduct: Record<string, any> | null;
  pagination: {
    totalPages: number;
    totalElements: number;
    pageSize: number;
    currentPage: number;
  };
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

export type CreateProductPayload = Omit<
  ProductFormType,
  "isInventory" | "isVirtual" | "isShow"
> & {
  selectIsCommission: string;
  transactionType: string;
  dashboardUrl: string;
  dashboardUrlForApk: string;
  dashboardImage: string;
  priority: Number | string;
  minimumPostpaidBalance: Number;
  minimumPrepaidBalance: Number;
  minimumGullakBalance: Number;
  minimumSingleTransactionAmount: Number;
  maximumSingleTransactionAmount: Number;
  sgst: Number;
  tds: Number;
  createdBy: string;
  inventory: {
    isInventory: Boolean; // Omit, because it is nested inside object
    inventoryPrice: number;
    isVirtual: Boolean; // Same
    isShow: Boolean; //Same
  };
  cluster: {
    surcharge: Boolean;
    schemeEngine: Boolean;
  };
};

export type UpdateProductPayload = Omit<
  ProductFormType,
  "isInventory" | "isVirtual" | "isShow"
> & {
  selectIsCommission: string;
  transactionType: string;
  dashboardUrl: string;
  dashboardUrlForApk: string;
  dashboardImage: string;
  priority: Number | string;
  minimumPostpaidBalance: Number;
  minimumPrepaidBalance: Number;
  minimumGullakBalance: Number;
  minimumSingleTransactionAmount: Number;
  maximumSingleTransactionAmount: Number;
  sgst: Number;
  tds: Number;
  editedBy: string;
  inventory: {
    isInventory: Boolean;
    inventoryPrice: number;
    isVirtual: Boolean;
    isShow: Boolean;
  };
  cluster: {
    surcharge: Boolean;
    schemeEngine: Boolean;
  };
};

export type FetchProductParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

