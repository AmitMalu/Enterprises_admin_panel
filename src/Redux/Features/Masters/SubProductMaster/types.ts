export interface SubProductMasterState {
  subProducts: Record<string, any>[];
  selectedSubProduct: Record<string, any> | null;
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

export interface CreateSubProductPayload {
  subProductTitle: string;
  subProductCode: string;
  productId: string | number;
  walletType: string;
  isSettlement: boolean;
  isActive: boolean;
  enabled: boolean;
  createdBy: string;
}

export interface UpdateSubProductPayload {
  subProductTitle: string;
  subProductCode: string;
  productId: string | number;
  walletType: string;
  isSettlement: boolean;
  isActive: boolean;
  enabled: boolean;
  editedBy: string;
}
