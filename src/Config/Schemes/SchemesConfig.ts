import moment from "moment";
import * as Yup from "yup";
import { API_ENDPOINTS } from "../Api/EndPoints";
import { GenericTableHeader } from "../../Utils/utils";
import { textField } from "../../Utils/ValidationUtils";

export const SCHEMES_KEY = "schemes";
export const SCHEMES_URL = API_ENDPOINTS.SCHEMES.SCHEME_LIST;

export const SCHEME_RATE_KEY = "schemeRate";
export const SCHEME_RATE_URL = API_ENDPOINTS.SCHEMES.SCHEME_RATE;

export interface SchemesListFormType {
  schemeName: string;
  schemeCode: string;
  productId: string;
  subProductId: string;
  operatorId: string;
  vendorId: string;
  schemeHierarchySelectionId: string;
}

export interface SchemesListTableType {
  id: string | number;
  schemeName: string;
  schemeCode: string;
  productName: string;
  subProductName: string;
  operatorName: string;
  vendorName: string;
  schemeCombinationHashCode: string;
}

export interface SchemeListCreatePayload extends SchemesListFormType {
  createdBy: string;
}

export interface SchemeListUpdatePayload extends SchemesListFormType {
  editedBy: string;
}

export const initialValues: SchemesListFormType = {
  schemeName: "",
  schemeCode: "",
  productId: "",
  subProductId: "",
  operatorId: "",
  vendorId: "",
  schemeHierarchySelectionId: "",
};

export const validationSchema: Record<
  keyof SchemesListFormType,
  Yup.AnySchema
> = {
  schemeName: textField("Scheme Name", 150, true, true),
  schemeCode: textField("Scheme Code", 150, true, true),
  productId: textField("Product", 150, true, true),
  subProductId: textField("sub Product", 150, true, true),
  operatorId: textField("Operator", 150, false, true),
  vendorId: textField("Vendor", 150, false, true),
  schemeHierarchySelectionId: textField("Scheme Hierarchy", 150, false, true),
};

export const headers: GenericTableHeader<SchemesListTableType>[] = [
  { key: "id", label: "Scheme ID" },
  { key: "schemeName", label: "Scheme Name" },
  { key: "schemeCode", label: "Scheme Code" },
  { key: "productName", label: "Product" },
  { key: "subProductName", label: "Sub Product" },
  { key: "operatorName", label: "Operator Name" },
  { key: "vendorName", label: "Vendor Name" },
  { key: "schemeCombinationHashCode", label: "Scheme HashCode" },
];

// Transform form data to Create payload
export const transformFormToCreateSchemesPayload = (
  formData: SchemesListFormType
): SchemeListCreatePayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSchemesPayload = (
  formData: SchemesListFormType
): SchemeListUpdatePayload => ({
  schemeName: formData.schemeName,
  schemeCode: formData.schemeCode,
  productId: formData.operatorId,
  subProductId: formData.subProductId,
  operatorId: formData.productId,
  vendorId: formData.operatorId,
  schemeHierarchySelectionId: formData.schemeHierarchySelectionId,
  editedBy: localStorage.getItem("username") || "system",
});

export type SlabStructureTableType = {
  id?: string | number;
  slabStart: string;
  slabEnd: string;
  rateType: string;
  gross: string;
  im: string;
  enterprise?: string;
  whitelabel?: string;
  superDistributor?: string;
  partner?: string;
  distributor?: string;
  retailer?: string;
  [key: string]: any;
};

export const slabStructureData: any[] = [
  {
    slabStart: moment().format("YYYY-MM-DD"),
    slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
    rateType: "12.2",
    gross: "NA",
    im: "NA",
    r: "NA",
    new: "NA",
  },
  {
    slabStart: moment().format("YYYY-MM-DD"),
    slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
    rateType: "12.2",
    gross: "NA",
    im: "NA",
    r: "NA",
    new: "NA",
  },
  {
    slabStart: moment().format("YYYY-MM-DD"),
    slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
    rateType: "12.2",
    gross: "NA",
    im: "NA",
    r: "NA",
    new: "NA",
  },
  {
    slabStart: moment().format("YYYY-MM-DD"),
    slabEnd: moment().add(1, "year").format("YYYY-MM-DD"),
    rateType: "12.2",
    gross: "NA",
    im: "NA",
    r: "NA",
    new: "NA",
  },
];

export const AMAXdata: SlabStructureTableType[] = [];

export const AMAX2data: SlabStructureTableType[] = [];

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
    { key: "im", label: "IM" },
    { key: "enterprise", label: "Enterprise" },
    { key: "whitelabel", label: "WL" },
    { key: "superDistributor", label: "SD" },
    { key: "partner", label: "PT" },
    { key: "distributor", label: "DT" },
    { key: "retailer", label: "RT" },
  ];

export const getFilteredSlabHeaders = (slabs: any[]) => {
  return slabStructureHeaders.filter(
    ({ key }) =>
      // Always include these base fields
      ["slabStart", "slabEnd", "rateType", "gross", "im"].includes(
        key as string
      ) ||
      // Include only if any slab has a non-null, non-undefined value
      slabs.some((slab) => slab[key] !== null && slab[key] !== undefined)
  );
};
