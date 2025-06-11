export interface Inventory {
  isInventory: boolean;
  inventoryPrice: number;
  isVirtual: boolean;
  isShow: boolean;
}

export interface Cluster {
  surcharge: boolean;
  schemeEngine: boolean;
}

export interface ProductStateType {
  id?: string;
  name: string;
  productCode: string;
  productCodeForScheme: string;
  isVisible: boolean;
  transactionType?: string | null;
  isCommissions: boolean;
  selectIsCommission: string;
  active: boolean;
  dashboardUrl: string;
  dashboardUrlForApk: string;
  dashboardImage: string;
  priority: number;
  productGroup: string;
  reverseTx: boolean;
  clusterMode: boolean;
  isSettlement: boolean;
  hasCharges: boolean;
  blocked: boolean;
  inventory: Inventory;
  cluster: Cluster;
  minimumPostpaidBalance: number;
  minimumPrepaidBalance: number;
  minimumGullakBalance: number;
  minimumSingleTransactionAmount: number;
  maximumSingleTransactionAmount: number;
  sgst: number;
  tds: number;
  createdOn?: string;
  createdBy: string;
  editedOn?: string;
  editedBy?: string | null;

  // For any unknown/extra fields
  [key: string]: any;
}

export interface ProductMasterState {
  products: ProductStateType[];
  selectedProduct: ProductStateType | null;
  loading: boolean;
  error: string | null;
  loaded : boolean;
}
