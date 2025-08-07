import { GenericTableHeader } from "../../Utils/utils";

export const SCHEMES_ALLOCATION_KEY = "schemesAllocation";
export const SCHEMES_ALLOCATION_URL = "/api/scheme-allocation";

export interface SubProductWithScheme {
  subProductName: string;
  schemeName: string;
  subProductCode : string;
}

export interface SchemeOption {
  schemeId: string;
  schemeName: string;
  schemeCode: string;
}

export interface SchemesAllocationTableType {
  mobileNumber: string;
  hierarchyId: string;
  hierarchyCode: string;
  createdDate: string;
  lastLoginDate: string | null;
  emailId: string;
}

export const headers: GenericTableHeader<SchemesAllocationTableType>[] = [
  { key: "mobileNumber", label: "Mobile Number", searchable: false },
  { key: "hierarchyId", label: "Retailer Id" },
  { key: "hierarchyCode", label: "Code", searchable: false },
  { key: "emailId", label: "Email", searchable: false },
  { key: "createdDate", label: "Created Date", searchable: false },
  { key: "lastLoginDate", label: "Last Login Date", searchable: false },
];

export const transformSchemeAllocationPayload = ({
  hierarchyId,
  modifiedSchemes,
  schemeOptions,
}: {
  hierarchyId: string | undefined;
  modifiedSchemes: Record<string, string>;
  schemeOptions: Record<string, SchemeOption[]>;
}) => {
  const codes = Object.entries(modifiedSchemes).map(
    ([subProductCode, schemeId]) => {
      if (schemeId === "No scheme assigned") {
        return {
          subProductCode,
          schemeCode: "No scheme assigned",
        };
      }

      const matchedScheme = schemeOptions[subProductCode]?.find(
        (scheme) => String(scheme.schemeId) === schemeId
      );

      return {
        subProductCode,
        schemeCode: matchedScheme?.schemeCode || "",
      };
    }
  );

  return {
    hierarchyId,
    codes: codes.filter((c) => c.schemeCode),
  };
};
