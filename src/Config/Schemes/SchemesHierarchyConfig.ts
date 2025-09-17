import * as Yup from "yup";
import { textField } from "../../Utils/ValidationUtils";
import { formatDateTime, GenericTableHeader } from "../../Utils/utils";

export const SCHEMES_HIERARCHY_KEY = "schemesHierarchy";
export const SCHEMES_HIERARCHY_URL = "/api/hierarchy";

export interface SchemesHierarchyFormType {
  schemeHierarchySelectionName: string;
  schemeHierarchyCombination: string;
}

export interface SchemesHierarchyTableType {
  id: string | number;
  schemeHierarchySelectionName: string;
  schemeHierarchyCombination: string;
  combinationHashCode: string;
  createdOn: string;
  createdBy: string;
  editedOn: string;
  editedBy: string;
}

export interface SchemeHierarchyCreatePayload extends SchemesHierarchyFormType {
  createdBy: string;
}

export interface SchemeHierarchyUpdatePayload extends SchemesHierarchyFormType {
  editedBy: string;
}

export const initialValues: SchemesHierarchyFormType = {
  schemeHierarchySelectionName: "",
  schemeHierarchyCombination: "",
};

export const validationSchema: Record<
  keyof SchemesHierarchyFormType,
  Yup.AnySchema
> = {
  schemeHierarchySelectionName: textField("Heirarchy Name", 150, true, true),
  schemeHierarchyCombination: Yup.array()
    .of(Yup.string())
    .min(1, "Hierarchy Combination is required")
    .required("Hierarchy Combination is required"),
};

export const headers: GenericTableHeader<SchemesHierarchyTableType>[] = [
  { key: "id", label: "Id", filterType: "number" },
  { key: "schemeHierarchySelectionName", label: "Scheme Hierarchy Name" },
  { key: "schemeHierarchyCombination", label: "Scheme Hierarchy Combination" },
  { key: "combinationHashCode", label: "Combination Hashcode" },
  { key: "createdOn", label: "Created On", filterType: "date" },
  { key: "createdBy", label: "Created By" },
  { key: "editedOn", label: "Edited On", filterType: "date" },
  { key: "editedBy", label: "Edited By" },
];

// Transform form data to Create payload
export const transformFormToCreateSchemesHierarchyPayload = (
  formData: SchemesHierarchyFormType
): SchemeHierarchyCreatePayload => ({
  ...formData,
  createdBy: localStorage.getItem("username") || "system",
});

// Transform form data to Update payload
export const transformFormToUpdateSchemesHierarchyPayload = (
  formData: SchemesHierarchyFormType
): SchemeHierarchyUpdatePayload => ({
  schemeHierarchySelectionName: formData.schemeHierarchySelectionName,
  schemeHierarchyCombination: formData.schemeHierarchyCombination,
  editedBy: localStorage.getItem("username") || "system",
});

export const mapToSchemeHierarchyTableType = (
  raw: Record<string, any>
): SchemesHierarchyTableType => ({
  id: raw.id,
  schemeHierarchySelectionName: raw.schemeHierarchySelectionName ?? "",
  schemeHierarchyCombination: Array.isArray(raw.schemeHierarchyCombination)
    ? raw.schemeHierarchyCombination.join("-")
    : raw.schemeHierarchyCombination ?? "",
  combinationHashCode: raw.combinationHashCode ?? "",
  createdOn: formatDateTime(raw.createdOn) ?? "",
  createdBy: raw.createdBy ?? "",
  editedOn: formatDateTime(raw.editedOn) ?? "",
  editedBy: raw.editedBy ?? "",
});
