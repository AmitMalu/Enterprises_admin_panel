import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";
import { API_ENDPOINTS } from "../Api/EndPoints";

export const MASTER_KEY = "vendor-routing";
export const MASTER_URL = API_ENDPOINTS.MASTER.VENDOR_ROUTING;

export type VendorRoutingFormType = {
  subProductId: string | number;
  routingPriority1?: string | number;
  routingPriority2?: string | number;
  routingPriority3?: string | number;

  //   volume1?: string | null;
  //   volume2?: string | null;
  //   volume3?: string | null;
  //   volumeNumberOfTxn?: string | null;
  //   value1?: string | null;
  //   value2?: string | null;
  //   value3?: string | null;
  //   volumeValueOfTxn?: string | null;
  //   valueValueNumberOfTxn?: string | null;
  //   valueValueOfTxn?: string | null;
};

export interface VendorRoutingTableType extends VendorRoutingFormType {
  id?: string;
  routingPriority1Name: string;
  routingPriority2Name: string;
  routingPriority3Name: string;
  createdOn?: string;
  createdBy?: string;
  editedOn?: string;
  editedBy?: string;
}

export interface CreateVendorRoutingPayload
  extends Omit<
    VendorRoutingFormType,
    "routingPriority1" | "routingPriority2" | "routingPriority3"
  > {
  routingPriority1: {
    id: string;
  };
  routingPriority2: {
    id: string;
  };
  routingPriority3: {
    id: string;
  };
  createdBy: string;
}

export interface UpdateVendorRoutingPayload
  extends Omit<
    VendorRoutingFormType,
    "routingPriority1" | "routingPriority2" | "routingPriority3"
  > {
  routingPriority1: {
    id: string;
  };
  routingPriority2: {
    id: string;
  };
  routingPriority3: {
    id: string;
  };
  editedBy: string;
}

export type FetchVendorRoutingParams = {
  page: number;
  size: number;
  filter?: { key: string; value: string | boolean } | null;
};

export const initialValues: VendorRoutingFormType = {
  subProductId: "",
  routingPriority1: "",
  routingPriority2: "",
  routingPriority3: "",

  //   volume1: "",
  //   volume2: "",
  //   volume3: "",
  //   volumeNumberOfTxn: "",
  //   value1: "",
  //   value2: "",
  //   value3: "",
  //   volumeValueOfTxn: "",
  //   valueValueNumberOfTxn: "",
  //   valueValueOfTxn: "",
};

export const validationSchema: Record<
  keyof VendorRoutingFormType,
  Yup.AnySchema
> = {
  subProductId: textField("Sub Product", 50, true),
  routingPriority1: textField("Routing Priority 1", 150, true, true),
  routingPriority2: textField("Routing Priority 2", 150, false, true),
  routingPriority3: textField("Routing Priority 3", 150, false, true),
};

export const headers: GenericTableHeader<VendorRoutingTableType>[] = [
  { key: "id", label: "Id", filterType: "number", searchable: true },
  { key: "subProductId", label: "Sub Product ID", filterType: "text" },
  {
    key: "routingPriority1Name",
    label: "Routing Priority 1",
    filterType: "text",
  },
  {
    key: "routingPriority2Name",
    label: "Routing Priority 2",
    filterType: "text",
  },
  {
    key: "routingPriority3Name",
    label: "Routing Priority 3",
    filterType: "text",
  },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

export const mapToVendorRoutingTableType = (
  raw: Record<string, any>
): VendorRoutingTableType => {
  return {
    id: raw.id ?? "",
    subProductId: raw.subProductId ?? "",
    routingPriority1Name: raw.routingPriority1Name ?? "",
    routingPriority2Name: raw.routingPriority2Name ?? "",
    routingPriority3Name: raw.routingPriority3Name ?? "",
    createdOn: formatDateTime(raw.createdOn) ?? "",
    createdBy: raw.createdBy ?? "",
    editedOn: formatDateTime(raw.editedOn) ?? "",
    editedBy: raw.editedBy ?? "",
  };
};

// Convert API response to Formik-compatible form data
export const transformVendorRoutingToFormData = (
  raw: Record<string, any>
): VendorRoutingFormType => ({
  subProductId: String(raw.subProductId) ?? "",
  routingPriority1: String(raw.routingPriority1) ?? "",
  routingPriority2: String(raw.routingPriority2) ?? "",
  routingPriority3: String(raw.routingPriority3) ?? "",
});

// Transform form data to Create payload
export const transformFormToCreateVendorRoutingPayload = (
  formData: VendorRoutingFormType
): CreateVendorRoutingPayload => ({
  ...formData,
  routingPriority1: {
    id:
      formData.routingPriority1 !== undefined
        ? String(formData.routingPriority1)
        : "",
  },
  routingPriority2: {
    id:
      formData.routingPriority2 !== undefined
        ? String(formData.routingPriority2)
        : "",
  },
  routingPriority3: {
    id:
      formData.routingPriority3 !== undefined
        ? String(formData.routingPriority3)
        : "",
  },
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateVendorRoutingPayload = (
  formData: VendorRoutingFormType
): UpdateVendorRoutingPayload => ({
  ...formData,
  routingPriority1: {
    id:
      formData.routingPriority1 !== undefined
        ? String(formData.routingPriority1)
        : "",
  },
  routingPriority2: {
    id:
      formData.routingPriority2 !== undefined
        ? String(formData.routingPriority2)
        : "",
  },
  routingPriority3: {
    id:
      formData.routingPriority3 !== undefined
        ? String(formData.routingPriority3)
        : "",
  },
  editedBy: localStorage.getItem("username") || "system",
});
