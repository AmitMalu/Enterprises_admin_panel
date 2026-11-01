import {
  DashboardSvg,
  fundingSvg,
  LogsIcon,
  managementSvg,
  MastersIcon,
  MyProfileIcon,
  NotificationIcon,
  reportsSvg,
  schemesSvg,
  SupportIcon,
} from "../../assets/Icons/Svgs";

/*
 * Admin portal navigation (Smart Credit Solution naming).
 *
 * Only labels and order are product decisions here: every `link` is a fixed route.
 * IMPORTANT: Admin User / White-label User permissions are stored as codes built from
 * the POSITION of each menu and sub-menu (e.g. "0102" = 1st menu, 2nd sub-menu, counted
 * without the Overview item). Reordering or inserting items changes those codes, so
 * existing Admin Users must have their permissions re-saved afterwards.
 * Some code also matches menus by label (see filterSidebarByPermissions.ts).
 */
export const sidebarData = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false, link: "/" },
  {
    label: "Management",
    icon: managementSvg,
    initiallyOpened: false,
    links: [
      { label: "User Creation", link: "/management/user/create", icon: managementSvg },
      { label: "Pending User", link: "/management/user/pending", icon: managementSvg },
      { label: "Onboarded Users", link: "/management/user/onboarded", icon: managementSvg },
      { label: "Rejected User", link: "/management/user/rejected", icon: managementSvg },
      { label: "View User", link: "/management/view-user", icon: managementSvg },
      { label: "User Mapping", link: "/management/user-mapping", icon: managementSvg },
      { label: "Pending KYC", link: "/management/kyc-pending", icon: managementSvg },
      { label: "KYC Approved Summary", link: "/management/kyc-approved", icon: managementSvg },
      { label: "Block/Unblock User", link: "/management/block-unblock-user", icon: managementSvg },
      { label: "Settlement Bank", link: "/management/settlement-bank", icon: managementSvg },
      { label: "Admin User", link: "/management/admin-user", icon: managementSvg },
      { label: "Whitelabel Branding", link: "/management/whitelabel-branding", icon: managementSvg },
    ],
  },
  {
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      { label: "Prefunding Authorization", link: "/funding/authorization", icon: fundingSvg },
      { label: "Credit/Debit", link: "/funding/credit-debit", icon: fundingSvg },
      { label: "Bulk Credit/Debit", link: "/funding/bulk-credit-debit", icon: fundingSvg },
      { label: "Settlement", link: "/funding/settlement", icon: fundingSvg },
      { label: "Update Transaction", link: "/funding/update-transaction", icon: fundingSvg },
      { label: "Low Balance", link: "/funding/low-balance", icon: fundingSvg },
      { label: "Wallet Preview", link: "/funding/wallet-preview", icon: fundingSvg },
    ],
  },
  {
    label: "Schemes",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      { label: "Schemes List", link: "/schemes/schemeslist", icon: schemesSvg },
      { label: "Schemes Hierarchy", link: "/schemes/hierarchy", icon: schemesSvg },
      { label: "Schemes Allocation", link: "/schemes/allocation", icon: schemesSvg },
      { label: "Transaction Limit Settings", link: "/schemes/transaction-limit", icon: schemesSvg },
    ],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [
      { label: "Transaction Report", link: "/report/transaction", icon: reportsSvg },
      { label: "Search Transaction Report", link: "/report/search-transaction", icon: reportsSvg },
      { label: "Pending Transaction", link: "/report/pending-transaction", icon: reportsSvg },
      { label: "Wallet Report", link: "/report/wallet", icon: reportsSvg },
      { label: "Ledger Report", link: "/report/ledger-transaction", icon: reportsSvg },
      { label: "Settlement Report", link: "/report/settlement", icon: reportsSvg },
      { label: "Unsettled Transaction Report", link: "/report/unsettled-transaction", icon: reportsSvg },
      { label: "GST/TDS Report", link: "/report/gst-tds", icon: reportsSvg },
      { label: "Download Report", link: "/report/download-report", icon: reportsSvg },
    ],
  },
  {
    label: "Masters",
    icon: MastersIcon,
    initiallyOpened: false,
    links: [
      { label: "Product Master", link: "/master/product", icon: MastersIcon },
      { label: "Sub-Product Master", link: "/master/sub-product", icon: MastersIcon },
      { label: "Operator Master", link: "/master/operator", icon: MastersIcon },
      { label: "Sub-Operator Master", link: "/master/sub-operator", icon: MastersIcon },
      { label: "Vendor Master", link: "/master/vendor", icon: MastersIcon },
      { label: "Vendor Credential Master", link: "/master/vendor-credential", icon: MastersIcon },
      { label: "Vendor Routing Master", link: "/master/vendor-routing", icon: MastersIcon },
      { label: "Bank Master", link: "/master/banks", icon: MastersIcon },
      { label: "Network Bank Master", link: "/master/network-banks", icon: MastersIcon },
      { label: "Main Master", link: "/master/main", icon: MastersIcon },
      { label: "Sub Master", link: "/master/sub-master", icon: MastersIcon },
      {
        label: "Location Master",
        icon: MastersIcon,
        links: [
          { label: "Country Master", link: "/master/country", icon: MastersIcon },
          { label: "State Master", link: "/master/state", icon: MastersIcon },
          { label: "District Master", link: "/master/district", icon: MastersIcon },
          { label: "City Master", link: "/master/city", icon: MastersIcon },
          { label: "Pincode Master", link: "/master/pincode", icon: MastersIcon },
        ],
      },
    ],
  },
  {
    label: "Notification",
    icon: NotificationIcon,
    initiallyOpened: false,
    links: [
      { label: "Alert Notification", link: "/notification/alert-type", icon: NotificationIcon },
      { label: "SMS", link: "/notification/sms-credentials", icon: NotificationIcon },
      { label: "Mail", link: "/notification/email-credentials", icon: NotificationIcon },
    ],
  },
  {
    label: "Support Centre",
    icon: SupportIcon,
    initiallyOpened: false,
    links: [
      { label: "Ticket Management", link: "/support/ticket-management", icon: SupportIcon },
    ],
  },
  {
    label: "My Account",
    icon: MyProfileIcon,
    initiallyOpened: false,
    links: [
      { label: "Profile", link: "/account/profile", icon: MyProfileIcon },
    ],
  },
  { label: "Logs", icon: LogsIcon, initiallyOpened: false, link: "/logs" },
];
