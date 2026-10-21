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
  { label: "Overview", icon: DashboardSvg, initiallyOpened: false, link: "/" },
  {
    label: "Network",
    icon: managementSvg,
    initiallyOpened: false,
    links: [
      { label: "Onboard Partner", link: "/management/user/create", icon: managementSvg },
      { label: "Approval Queue", link: "/management/user/pending", icon: managementSvg },
      { label: "Active Partners", link: "/management/user/onboarded", icon: managementSvg },
      { label: "Declined Applications", link: "/management/user/rejected", icon: managementSvg },
      { label: "Partner Directory", link: "/management/view-user", icon: managementSvg },
      { label: "Network Mapping", link: "/management/user-mapping", icon: managementSvg },
      { label: "KYC Review", link: "/management/kyc-pending", icon: managementSvg },
      { label: "KYC Verified", link: "/management/kyc-approved", icon: managementSvg },
      { label: "Access Control", link: "/management/block-unblock-user", icon: managementSvg },
      { label: "Payout Accounts", link: "/management/settlement-bank", icon: managementSvg },
      { label: "Staff Accounts", link: "/management/admin-user", icon: managementSvg },
      { label: "Brand Studio", link: "/management/whitelabel-branding", icon: managementSvg },
    ],
  },
  {
    label: "Treasury",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      { label: "Top-up Approvals", link: "/funding/authorization", icon: fundingSvg },
      { label: "Wallet Adjustments", link: "/funding/credit-debit", icon: fundingSvg },
      { label: "Bulk Adjustments", link: "/funding/bulk-credit-debit", icon: fundingSvg },
      { label: "Settlements", link: "/funding/settlement", icon: fundingSvg },
      { label: "Transaction Corrections", link: "/funding/update-transaction", icon: fundingSvg },
      { label: "Low Balance Alerts", link: "/funding/low-balance", icon: fundingSvg },
      { label: "Wallet Overview", link: "/funding/wallet-preview", icon: fundingSvg },
    ],
  },
  {
    label: "Commission Plans",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      { label: "Plan Library", link: "/schemes/schemeslist", icon: schemesSvg },
      { label: "Plan Levels", link: "/schemes/hierarchy", icon: schemesSvg },
      { label: "Assign Plans", link: "/schemes/allocation", icon: schemesSvg },
      { label: "Transaction Limits", link: "/schemes/transaction-limit", icon: schemesSvg },
    ],
  },
  {
    label: "Analytics",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [
      { label: "Transactions", link: "/report/transaction", icon: reportsSvg },
      { label: "Find a Transaction", link: "/report/search-transaction", icon: reportsSvg },
      { label: "In-Process Transactions", link: "/report/pending-transaction", icon: reportsSvg },
      { label: "Wallet Statement", link: "/report/wallet", icon: reportsSvg },
      { label: "Account Ledger", link: "/report/ledger-transaction", icon: reportsSvg },
      { label: "Settlement Summary", link: "/report/settlement", icon: reportsSvg },
      { label: "Unsettled Payments", link: "/report/unsettled-transaction", icon: reportsSvg },
      { label: "Tax Summary (GST/TDS)", link: "/report/gst-tds", icon: reportsSvg },
      { label: "Export Center", link: "/report/download-report", icon: reportsSvg },
    ],
  },
  {
    label: "Platform Setup",
    icon: MastersIcon,
    initiallyOpened: false,
    links: [
      { label: "Products", link: "/master/product", icon: MastersIcon },
      { label: "Services", link: "/master/sub-product", icon: MastersIcon },
      { label: "Billers & Operators", link: "/master/operator", icon: MastersIcon },
      { label: "Operator Circles", link: "/master/sub-operator", icon: MastersIcon },
      { label: "Service Providers", link: "/master/vendor", icon: MastersIcon },
      { label: "Provider Keys", link: "/master/vendor-credential", icon: MastersIcon },
      { label: "Smart Routing", link: "/master/vendor-routing", icon: MastersIcon },
      { label: "Company Accounts", link: "/master/banks", icon: MastersIcon },
      { label: "Partner Banks", link: "/master/network-banks", icon: MastersIcon },
      { label: "Dropdown Lists", link: "/master/main", icon: MastersIcon },
      { label: "Dropdown Values", link: "/master/sub-master", icon: MastersIcon },
      {
        label: "Geography",
        icon: MastersIcon,
        links: [
          { label: "Countries", link: "/master/country", icon: MastersIcon },
          { label: "States", link: "/master/state", icon: MastersIcon },
          { label: "Districts", link: "/master/district", icon: MastersIcon },
          { label: "Cities", link: "/master/city", icon: MastersIcon },
          { label: "PIN Codes", link: "/master/pincode", icon: MastersIcon },
        ],
      },
    ],
  },
  {
    label: "Messaging",
    icon: NotificationIcon,
    initiallyOpened: false,
    links: [
      { label: "Alert Rules", link: "/notification/alert-type", icon: NotificationIcon },
      { label: "SMS Gateway", link: "/notification/sms-credentials", icon: NotificationIcon },
      { label: "Email Gateway", link: "/notification/email-credentials", icon: NotificationIcon },
    ],
  },
  {
    label: "Help Desk",
    icon: SupportIcon,
    initiallyOpened: false,
    links: [
      { label: "Support Tickets", link: "/support/ticket-management", icon: SupportIcon },
    ],
  },
  {
    label: "Profile",
    icon: MyProfileIcon,
    initiallyOpened: false,
    links: [
      { label: "My Profile", link: "/account/profile", icon: MyProfileIcon },
    ],
  },
  { label: "Audit Trail", icon: LogsIcon, initiallyOpened: false, link: "/logs" },
];
