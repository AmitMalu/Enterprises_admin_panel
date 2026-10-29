import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { GenericTableHeader, GenericVerticalHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";

export const SCHEMES_KEY = "schemes";
export const SCHEMES_URL = API_ENDPOINTS.SCHEMES.SCHEME_LIST;

export const SCHEME_RATE_KEY = "schemeRate";
export const SCHEME_RATE_URL = API_ENDPOINTS.SCHEMES.SCHEME_RATE;

export interface SchemesListFormType {
  schemeName: string;
  productId: string;
  subProductId: string;
  vendorId: string;
  schemeHierarchySelectionId: string;
  isActive: boolean;
}

export interface SchemesListTableType {
  id: string | number;
  schemeName: string;
  schemeCode: string;
  productId: string | number;
  productName: string;
  subProductId: string | number;
  subProductName: string;
  vendorId: string | number;
  vendorName: string;
  schemeHierarchySelectionId: string | number;
  schemeCombinationHashCode: string;
  isActive: boolean;
  createdBy: string;
  createdOn?: string;
  editedBy?: string;
  editedOn?: string;
}

export interface SchemeListCreatePayload extends SchemesListFormType {
  createdBy: string;
}

export interface SchemeListUpdatePayload extends SchemesListFormType {
  editedBy: string;
}

export const initialValues: SchemesListFormType = {
  schemeName: "",
  productId: "",
  subProductId: "",
  vendorId: "",
  schemeHierarchySelectionId: "",
  isActive: true,
};

export const validationSchema: Record<
  keyof SchemesListFormType,
  Yup.AnySchema
> = {
  schemeName: textField("Scheme Name", 150, true, true),
  productId: textField("Product", 150, true, true),
  subProductId: textField("sub Product", 150, true, true),
  vendorId: textField("Vendor", 150, false, true),
  schemeHierarchySelectionId: textField("Scheme Hierarchy", 150, false, true),
  isActive: Yup.boolean().required("Active status is required"),
};

export const headers: GenericTableHeader<SchemesListTableType>[] = [
  { key: "id", label: "Scheme ID", filterType: "number" },
  { key: "schemeName", label: "Scheme Name" },
  { key: "schemeCode", label: "Scheme Code" },
  { key: "productId", label: "Product ID", filterType: "text" },
  { key: "productName", label: "Product Name" },
  { key: "subProductId", label: "Sub Product ID", filterType: "text" },
  { key: "subProductName", label: "Sub Product Name" },
  { key: "vendorId", label: "vendor ID", filterType: "text" },
  { key: "vendorName", label: "Vendor Name" },
  {
    key: "schemeHierarchySelectionId",
    label: "scheme Hierarchy Selection ID",
    filterType: "text",
  },
  { key: "isActive", label: "Is Active", filterType: "boolean" },
  { key: "schemeCombinationHashCode", label: "Scheme HashCode" },
  { key: "createdBy", label: "Created By", filterType: "text" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "editedBy", label: "Edited By", filterType: "text" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
];

// Transform form data to Create payload
export const transformFormToCreateSchemesPayload = (
  formData: SchemesListFormType,
): SchemeListCreatePayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSchemesPayload = (
  formData: SchemesListFormType,
): SchemeListUpdatePayload => ({
  schemeName: formData.schemeName,
  productId: formData.productId,
  subProductId: formData.subProductId,
  vendorId: formData.vendorId,
  schemeHierarchySelectionId: formData.schemeHierarchySelectionId,
  editedBy: localStorage.getItem("username") || "system",
  isActive: !!formData.isActive,
});

export const transformSchemeListToFormData = (
  raw: Record<string, any>,
): SchemesListFormType => ({
  schemeName: raw.schemeName ?? "",
  productId: raw.productId ?? "",
  subProductId: raw.subProductId ?? "",
  vendorId: raw.vendorId ?? "",
  schemeHierarchySelectionId: raw.schemeHierarchySelectionId ?? "",
  isActive: !!raw.isActive,
});

export type SlabStructureTableType = {
  id?: string | number;
  slabStart: string;
  slabEnd: string;
  rateType: string;
  gross: string;
  scs: string;
  enterprise?: string;
  whitelabel?: string;
  superDistributor?: string;
  partner?: string;
  distributor?: string;
  retailer?: string;
  [key: string]: any;
};
export interface SchemeDetails {
  isActive: boolean;
  tdsRate: number | string;
  schemeName: string;
  schemeCode: string;
  productName: string;
  operators: OperatorSlabData[];
}
export interface SlabPayload {
  schemeCode: string;
  schemeName: string;
  operators: {
    operatorCode: string;
    operatorName: string;
    slabs: (SlabStructureTableType & { editedBy: string })[];
  }[];
}

export interface OperatorSlabData {
  operatorCode: string;
  operatorName: string;
  slabs: SlabStructureTableType[];
}

export const buildSlabPayload = (
  schemeCode: string,
  schemeName: string,
  operators: OperatorSlabData[],
) => {
  const editedBy = localStorage.getItem("username") || "system";

  return {
    schemeCode,
    schemeName,
    operators: operators.map((op) => ({
      operatorCode: op.operatorCode,
      operatorName: op.operatorName,
      slabs: op.slabs.map((slab: any) => {
        // const isTempId =
        //   (typeof slab.id === "string" && slab.id.startsWith("new-")) ||
        //   /^\d{13,}$/.test(slab.id); // Detects Date.now()-based or new- prefixed IDs
        const isNewSlab =
          slab.id === null || // Dummy slab from backend
          (typeof slab.id === "string" && slab.id.startsWith("new-")); // Newly created in frontend
        const updatedSlab = {
          ...slab,
          id: isNewSlab ? null : slab.id, // Convert frontend id to null for backend
        };
        // return {
        //   ...slab,
        //   id: isTempId ? null : slab.id,
        //   editedBy,
        //   ...(isTempId && { createdBy: editedBy }),
        // };
        if (isNewSlab) {
          updatedSlab.createdBy = editedBy;
        } else {
          updatedSlab.editedBy = editedBy;
          if (slab.createdBy) {
            updatedSlab.createdBy = slab.createdBy; // Preserve existing createdBy
          }
        }

        return updatedSlab;
      }),
    })),
  };
};

export const slabStructureHeaders: GenericTableHeader<SlabStructureTableType>[] =
  [
    { key: "slabStart", label: "Slab Start" },
    { key: "slabEnd", label: "Slab End" },
    {
      key: "rateType",
      label: "Rate Type",
      filterType: "boolean",
      filterOptions: [
        { label: "PERCENTAGE", value: "PERCENTAGE" },
        { label: "FLAT", value: "FLAT" },
      ],
    },
    { key: "gross", label: "Gross" },
    { key: "scs", label: "Admin", showCalculatedBelow: true },
    { key: "enterprise", label: "Enterprise", showCalculatedBelow: true },
    { key: "whitelabel", label: "WL", showCalculatedBelow: true },
    { key: "superDistributor", label: "SD", showCalculatedBelow: true },
    { key: "partner", label: "PT", showCalculatedBelow: true },
    { key: "distributor", label: "DT", showCalculatedBelow: true },
    { key: "retailer", label: "RT", showCalculatedBelow: true },
  ];

export const getFilteredSlabHeaders = (slabs: any[]) => {
  return slabStructureHeaders.filter(
    ({ key }) =>
      // Always include these base fields
      ["slabStart", "slabEnd", "rateType", "gross", "scs"].includes(
        key as string,
      ) ||
      // Include only if any slab has a non-null, non-undefined value
      slabs.some((slab) => slab[key] !== null && slab[key] !== undefined),
  );
};

export const makeBlankSlab = (
  headers: GenericTableHeader<SlabStructureTableType>[],
  slabStart: number,
  slabEnd: number,
): SlabStructureTableType => {
  const blankRow: SlabStructureTableType = {
    id: `new-${Date.now()}`, // Easier to recognize in the payload
    slabStart: slabStart.toString(),
    slabEnd: slabEnd.toString(),
    rateType: "FLAT", // default
    gross: "0",
    scs: "0",
  };

  headers.forEach(({ key }) => {
    const keyStr = key as string;

    if (keyStr in blankRow) {
      return; // already set above
    }

    blankRow[keyStr] = "0"; // default for dynamic fields
  });

  return blankRow;
};

export const productHeaders: GenericVerticalHeader<Record<string, any>>[] = [
  { key: "productName", label: "Product Name" },
  { key: "productCode", label: "Product Code" },
  { key: "productCodeForScheme", label: "Scheme Product Code" },
  { key: "transactionType", label: "Transaction Type" },
  { key: "isSettlement", label: "Is Settlement" },
  { key: "sgst", label: "SGST (%)" },
  { key: "tds", label: "TDS (%)" },
  { key: "createdAt", label: "Created At" },
  { key: "createdBy", label: "Created By" },
  { key: "editedAt", label: "Edited At" },
  { key: "editedBy", label: "Edited By" },
];

export const calculateCommission = (val: any, tds: number | string): string => {
  const input = parseFloat(val);
  const tdsNum = typeof tds === "number" ? tds : parseFloat(tds as string);
  if (isNaN(input) || isNaN(tdsNum)) return "";

  const finalValue = input - (input * tdsNum) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(finalValue);
};
