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
    label: "Network",
    icon: managementSvg,
    initiallyOpened: false,
    links: [
      { label: "Network Creation", link: "/management/user/create", icon: managementSvg },
      { label: "Pending Approvals", link: "/management/user/pending", icon: managementSvg },
      { label: "Onboarded Network", link: "/management/user/onboarded", icon: managementSvg },
      { label: "Rejected Applications", link: "/management/user/rejected", icon: managementSvg },
      { label: "View Network", link: "/management/view-user", icon: managementSvg },
      { label: "Network Mapping", link: "/management/user-mapping", icon: managementSvg },
      { label: "KYC Pending", link: "/management/kyc-pending", icon: managementSvg },
      { label: "KYC Approved", link: "/management/kyc-approved", icon: managementSvg },
      { label: "Block / Unblock Access", link: "/management/block-unblock-user", icon: managementSvg },
      { label: "Settlement Accounts", link: "/management/settlement-bank", icon: managementSvg },
      { label: "Admin Team", link: "/management/admin-user", icon: managementSvg },
      { label: "White Label Branding", link: "/management/whitelabel-branding", icon: managementSvg },
    ],
  },
  {
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      { label: "Prefund Approvals", link: "/funding/authorization", icon: fundingSvg },
      { label: "Wallet Credit / Debit", link: "/funding/credit-debit", icon: fundingSvg },
      { label: "Bulk Credit / Debit", link: "/funding/bulk-credit-debit", icon: fundingSvg },
      { label: "Settlements", link: "/funding/settlement", icon: fundingSvg },
      { label: "Transaction Update", link: "/funding/update-transaction", icon: fundingSvg },
      { label: "Low Balance Alerts", link: "/funding/low-balance", icon: fundingSvg },
      { label: "Wallet Summary", link: "/funding/wallet-preview", icon: fundingSvg },
    ],
  },
  {
    label: "Schemes",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      { label: "Scheme List", link: "/schemes/schemeslist", icon: schemesSvg },
      { label: "Scheme Hierarchy", link: "/schemes/hierarchy", icon: schemesSvg },
      { label: "Scheme Allocation", link: "/schemes/allocation", icon: schemesSvg },
      { label: "Transaction Limits", link: "/schemes/transaction-limit", icon: schemesSvg },
    ],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [
      { label: "Transaction History", link: "/report/transaction", icon: reportsSvg },
      { label: "Transaction Search", link: "/report/search-transaction", icon: reportsSvg },
      { label: "Pending Transactions", link: "/report/pending-transaction", icon: reportsSvg },
      { label: "Wallet Statement", link: "/report/wallet", icon: reportsSvg },
      { label: "Ledger Statement", link: "/report/ledger-transaction", icon: reportsSvg },
      { label: "Settlement Summary", link: "/report/settlement", icon: reportsSvg },
      { label: "Unsettled Transactions", link: "/report/unsettled-transaction", icon: reportsSvg },
      { label: "GST & TDS Report", link: "/report/gst-tds", icon: reportsSvg },
      { label: "Report Downloads", link: "/report/download-report", icon: reportsSvg },
    ],
  },
  {
    label: "Masters",
    icon: MastersIcon,
    initiallyOpened: false,
    links: [
      { label: "Product Setup", link: "/master/product", icon: MastersIcon },
      { label: "Sub-Product Setup", link: "/master/sub-product", icon: MastersIcon },
      { label: "Operator Setup", link: "/master/operator", icon: MastersIcon },
      { label: "Sub-Operator Setup", link: "/master/sub-operator", icon: MastersIcon },
      { label: "Vendor Setup", link: "/master/vendor", icon: MastersIcon },
      { label: "Vendor Credentials", link: "/master/vendor-credential", icon: MastersIcon },
      { label: "Vendor Routing", link: "/master/vendor-routing", icon: MastersIcon },
      { label: "Bank Setup", link: "/master/banks", icon: MastersIcon },
      { label: "Network Banks", link: "/master/network-banks", icon: MastersIcon },
      { label: "Main Categories", link: "/master/main", icon: MastersIcon },
      { label: "Sub Categories", link: "/master/sub-master", icon: MastersIcon },
      {
        label: "Location Setup",
        icon: MastersIcon,
        links: [
          { label: "Country Setup", link: "/master/country", icon: MastersIcon },
          { label: "State Setup", link: "/master/state", icon: MastersIcon },
          { label: "District Setup", link: "/master/district", icon: MastersIcon },
          { label: "City Setup", link: "/master/city", icon: MastersIcon },
          { label: "Pincode Setup", link: "/master/pincode", icon: MastersIcon },
        ],
      },
    ],
  },
  {
    label: "Notifications",
    icon: NotificationIcon,
    initiallyOpened: false,
    links: [
      { label: "Alert Settings", link: "/notification/alert-type", icon: NotificationIcon },
      { label: "SMS Settings", link: "/notification/sms-credentials", icon: NotificationIcon },
      { label: "Email Settings", link: "/notification/email-credentials", icon: NotificationIcon },
    ],
  },
  {
    label: "Support",
    icon: SupportIcon,
    initiallyOpened: false,
    links: [
      { label: "Support Tickets", link: "/support/ticket-management", icon: SupportIcon },
    ],
  },
  {
    label: "My Account",
    icon: MyProfileIcon,
    initiallyOpened: false,
    links: [
      { label: "My Profile", link: "/account/profile", icon: MyProfileIcon },
    ],
  },
  { label: "Activity Logs", icon: LogsIcon, initiallyOpened: false, link: "/logs" },
];
