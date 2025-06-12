import { VendorFormType } from "../../../../Config/Master/VendorConfig";

export interface VendorMasterState {
  vendors: Record<string, any>[];
  selectedVendor: Record<string, any> | null;
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

export interface CreateVendorPayload extends VendorFormType {
  vendorAccount: {
    transactionRateType: "Slab";
    transactionRate: 6.5;
    accVerificationCharges: 17.0;
    apiCharges: 9.0;
    bankCharges: 17.0;
    gst: 19.0;
  };
  createdBy: string;
}

export interface UpdateVendorPayload extends VendorFormType {
  vendorAccount: {
    transactionRateType: "Slab";
    transactionRate: 6.5;
    accVerificationCharges: 17.0;
    apiCharges: 9.0;
    bankCharges: 17.0;
    gst: 19.0;
  };
  editedBy: string;
}
