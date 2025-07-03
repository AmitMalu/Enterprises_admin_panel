import { DropdownFormType } from "../../../../Config/Master/DropdownConfig";
import { OperatorFormType } from "../../../../Config/Master/OperatorConfig";

export interface DropdownMasterState {
  dropdownMasterList: Record<string, any>[];
  selectedDropdownMaster: Record<string, any> | null;
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

export interface CreateDropdownPayload extends DropdownFormType {
  createdBy: string;
}

// export interface UpdateOperatorPayload extends OperatorFormType {
//   editedBy: string;
// }

export type FetchDropdownMasterListParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};
