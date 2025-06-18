import { SubOperatorFormType } from "../../../../Config/Master/SubOperatorConfig";

export interface SubOperatorMasterState {
  subOperators: Record<string, any>[];
  selectedSubOperator: Record<string, any> | null;
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

export interface CreateSubOperatorPayload extends SubOperatorFormType {
  createdBy: string;
}

export interface UpdateSubOperatorPayload extends SubOperatorFormType {
  editedBy: string;
}

export type FetchSubOperatorParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};
