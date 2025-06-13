import { SubProductFormType } from "../../../../Config/Master/SubProductConfig";

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

export interface CreateSubProductPayload extends SubProductFormType {
  createdBy: string;
}
export interface UpdateSubProductPayload extends SubProductFormType {
  editedBy: string;
}
