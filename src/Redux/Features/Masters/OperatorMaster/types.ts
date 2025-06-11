export interface OperatorMasterState {
  operators: Record<string, any>[];
  selectedOperator: Record<string, any> | null;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

export interface CreateOperatorPayload {
  operatorCategory: string;
  operatorCode: string;
  operatorName: string;
  operatorAlias: string;
  alias: string;
  productId: string | number;
  subProductId: string | number;
  cardBinNo: string | number;
  isActive: boolean;
  createdBy: string;
}

export interface UpdateOperatorPayload {
  operatorCategory: string;
  operatorCode: string;
  operatorName: string;
  operatorAlias: string;
  alias: string;
  productId: string | number;
  subProductId: string | number;
  cardBinNo: string | number;
  isActive: boolean;
  editedBy: string;
}
