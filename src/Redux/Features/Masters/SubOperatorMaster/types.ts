import { OperatorFormType } from "../../../../Config/Master/OperatorConfig";

export interface OperatorMasterState {
  operators: Record<string, any>[];
  selectedOperator: Record<string, any> | null;
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

export interface CreateOperatorPayload extends OperatorFormType {
  createdBy: string;
}

export interface UpdateOperatorPayload extends OperatorFormType {
  editedBy: string;
}
