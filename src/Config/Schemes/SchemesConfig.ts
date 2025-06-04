import moment from "moment";

export type SchemesListType = {
  schemeId: string;
  schemeName: string;
  schemeCode: string;
  walletType: string;
  schemeType: string;
  product: string;
  subProduct: string;
};

export const columnStyles: {
  [key in keyof SchemesListType]?: React.CSSProperties;
} = {
  schemeId: {
    fontFamily: '"Segoe UI", sans-serif',
    fontWeight: "normal",
    color: "#1D1F2C",
  },
  schemeName: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "normal",
    color: "#000000",
  },
  schemeCode: {
    fontFamily: "Inter, sans-serif",
    fontWeight: "normal",
    color: "#000000",
  },
  walletType: {
    fontFamily: "Segoe UI, serif",
    fontWeight: "normal",
    color: "#667085",
  },
  schemeType: {
    fontFamily: "Segoe UI, serif",
    fontWeight: "normal",
    color: "#667085",
  },
  product: {
    fontFamily: "Segoe UI, serif",
    fontWeight: "normal",
    color: "#667085",
  },
  subProduct: {
    fontFamily: "Segoe UI, serif",
    fontWeight: "normal",
    color: "#667085",
  },
};

export const data: SchemesListType[] = [
  {
    schemeId: "101",
    schemeName: "Airtel DTH",
    schemeCode: "DTH101",
    walletType: "Airtel Digital TV",
    schemeType: "BIN1234",
    product: "PRD1001",
    subProduct: "CARD-AX123",
  },
  {
    schemeId: "102",
    schemeName: "Jio Fiber",
    schemeCode: "BRD102",
    walletType: "Jio Broadband",
    schemeType: "BIN5678",
    product: "PRD1002",
    subProduct: "CARD-JF456",
  },
  {
    schemeId: "103",
    schemeName: "Vodafone Postpaid",
    schemeCode: "POST103",
    walletType: "Vodafone Postpaid",
    schemeType: "BIN9101",
    product: "PRD1003",
    subProduct: "CARD-VF789",
  },
  {
    schemeId: "104",
    schemeName: "BSNL Broadband",
    schemeCode: "BRD104",
    walletType: "BSNL Broadband",
    schemeType: "BIN1121",
    product: "PRD1004",
    subProduct: "CARD-BS123",
  },
  {
    schemeId: "101",
    schemeName: "Airtel DTH",
    schemeCode: "DTH101",
    walletType: "Airtel Digital TV",
    schemeType: "BIN1234",
    product: "PRD1001",
    subProduct: "CARD-AX123",
  },
  {
    schemeId: "102",
    schemeName: "Jio Fiber",
    schemeCode: "BRD102",
    walletType: "Jio Broadband",
    schemeType: "BIN5678",
    product: "PRD1002",
    subProduct: "CARD-JF456",
  },
  {
    schemeId: "103",
    schemeName: "Vodafone Postpaid",
    schemeCode: "POST103",
    walletType: "Vodafone Postpaid",
    schemeType: "BIN9101",
    product: "PRD1003",
    subProduct: "CARD-VF789",
  },
  {
    schemeId: "104",
    schemeName: "BSNL Broadband",
    schemeCode: "BRD104",
    walletType: "BSNL Broadband",
    schemeType: "BIN1121",
    product: "PRD1004",
    subProduct: "CARD-BS123",
  },
  {
    schemeId: "101",
    schemeName: "Airtel DTH",
    schemeCode: "DTH101",
    walletType: "Airtel Digital TV",
    schemeType: "BIN1234",
    product: "PRD1001",
    subProduct: "CARD-AX123",
  },
  {
    schemeId: "102",
    schemeName: "Jio Fiber",
    schemeCode: "BRD102",
    walletType: "Jio Broadband",
    schemeType: "BIN5678",
    product: "PRD1002",
    subProduct: "CARD-JF456",
  },
  {
    schemeId: "103",
    schemeName: "Vodafone Postpaid",
    schemeCode: "POST103",
    walletType: "Vodafone Postpaid",
    schemeType: "BIN9101",
    product: "PRD1003",
    subProduct: "CARD-VF789",
  },
  {
    schemeId: "104",
    schemeName: "BSNL Broadband",
    schemeCode: "BRD104",
    walletType: "BSNL Broadband",
    schemeType: "BIN1121",
    product: "PRD1004",
    subProduct: "CARD-BS123",
  },
  {
    schemeId: "101",
    schemeName: "Airtel DTH",
    schemeCode: "DTH101",
    walletType: "Airtel Digital TV",
    schemeType: "BIN1234",
    product: "PRD1001",
    subProduct: "CARD-AX123",
  },
  {
    schemeId: "102",
    schemeName: "Jio Fiber",
    schemeCode: "BRD102",
    walletType: "Jio Broadband",
    schemeType: "BIN5678",
    product: "PRD1002",
    subProduct: "CARD-JF456",
  },
  {
    schemeId: "103",
    schemeName: "Vodafone Postpaid",
    schemeCode: "POST103",
    walletType: "Vodafone Postpaid",
    schemeType: "BIN9101",
    product: "PRD1003",
    subProduct: "CARD-VF789",
  },
  {
    schemeId: "104",
    schemeName: "BSNL Broadband",
    schemeCode: "BRD104",
    walletType: "BSNL Broadband",
    schemeType: "BIN1121",
    product: "PRD1004",
    subProduct: "CARD-BS123",
  },
];

export const headers: { key: keyof SchemesListType; label: string }[] = [
  { key: "schemeId", label: "Scheme ID" },
  { key: "schemeName", label: "Scheme Name" },
  { key: "schemeCode", label: "Scheme Code" },
  { key: "walletType", label: "Wallet Type" },
  { key: "schemeType", label: "Scheme Type" },
  { key: "product", label: "Product" },
  { key: "subProduct", label: "Sub Product" },
];

export type slabStructureType = {
  slabStart: string;
  slabEnd: string;
  rateType: string;
  gross: string;
  im: string;
  r: string;
  new: string;
};

export const slabStructureData: slabStructureType[] = [
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

export const AMAXdata: slabStructureType[] = [];

export const AMAX2data: slabStructureType[] = [];

export const slabStructureHeaders: { key: keyof slabStructureType; label: string }[] = [
  { key: "slabStart", label: "Slab Start" },
  { key: "slabEnd", label: "Slab End" },
  { key: "rateType", label: "Rate Type" },
  { key: "gross", label: "Gross" },
  { key: "im", label: "IM" },
  { key: "r", label: "R" },
  { key: "new", label: "New" },
];
