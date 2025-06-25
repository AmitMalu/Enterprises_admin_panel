import {
  DashboardSvg,
  fundingSvg,
  managementSvg,
  reportsSvg,
  schemesSvg,
  userCreationSvg,
} from "../../assets/Icons/Svgs";

export const sidebarData = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false, link: "/" },
  {
    label: "Masters",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Product Master",
        link: "/master/product",
        icon: userCreationSvg,
      },
      {
        label: "Sub-Product Master",
        link: "/master/sub-product",
        icon: userCreationSvg,
      },
      {
        label: "Operator Master",
        link: "/master/operator",
        icon: userCreationSvg,
      },
      {
        label: "Sub-Operator Master",
        link: "/master/sub-operator",
        icon: userCreationSvg,
      },
      {
        label: "Vendor Master",
        link: "/master/vendor",
        icon: userCreationSvg,
      },
      {
        label: "Bank Master",
        link: "/master/banks",
        icon: userCreationSvg,
      },
      {
        label: "Dropdown Master",
        link: "/master/dropdown",
        icon: userCreationSvg,
      },
      {
        label: "User Configuration",
        link: "/master/user-configuration",
        icon: userCreationSvg,
      },
      {
        label: "Wallet Master",
        link: "/master/wallet",
        icon: userCreationSvg,
      },
      {
        label: "Pincode Master",
        link: "/master/pincode",
        icon: userCreationSvg,
      },
      {
        label: "Ticket Master",
        link: "/master/ticket",
        icon: userCreationSvg,
      },
      {
        label: "Profile Master",
        link: "/master/profile",
        icon: userCreationSvg,
      },
      {
        label: "KYC Master",
        link: "/master/kyc",
        icon: userCreationSvg,
      },
      {
        label: "Business Master",
        link: "/master/business",
        icon: userCreationSvg,
      },
      {
        label: "Registration Master",
        link: "/master/registration",
        icon: userCreationSvg,
      },
      {
        label: "Payment Master",
        link: "/master/payment",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Schemes",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Schemes List",
        link: "/schemes/schemeslist",
        icon: userCreationSvg,
      },
      {
        label: "Fee Distribution Setting",
        link: "/schemes/fee-distribution",
        icon: userCreationSvg,
      },
      {
        label: "Fee Setting",
        link: "/schemes/fee-setting",
        icon: userCreationSvg,
      },
      {
        label: "Transaction Routing",
        link: "/schemes/transaction-routing",
        icon: userCreationSvg,
      },
      {
        label: "Transaction Limit Settings",
        link: "/schemes/transaction-limit",
        icon: userCreationSvg,
      },
      {
        label: "Service Charge Setting",
        link: "/schemes/service-charge",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Prefunding Authorization",
        link: "/funding/pre-funding-authorization",
        icon: userCreationSvg,
      },
      {
        label: "Credit/Debit",
        link: "/funding/credit-debit",
        icon: userCreationSvg,
      },
      {
        label: "Manage Payment",
        link: "/funding/manage-payment",
        icon: userCreationSvg,
      },
      {
        label: "Manage Settlement",
        link: "/funding/manage-settlement",
        icon: userCreationSvg,
      },
      {
        label: "Settlement",
        link: "/funding/settlement",
        icon: userCreationSvg,
      },
      {
        label: "Low Balance",
        link: "/funding/low-balance",
        icon: userCreationSvg,
      },
      {
        label: "Bulk Credit/Debit",
        link: "/funding/bulk-credit-debit",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Management",
    icon: managementSvg,
    initiallyOpened: false,
    links: [
      {
        label: "User Creation",
        link: "/management/user-creation",
        icon: userCreationSvg,
      },
      {
        label: "Pending User",
        link: "/management/user/pending",
        icon: userCreationSvg,
      },
      {
        label: "Activation User",
        link: "/management/user/activation",
        icon: userCreationSvg,
      },
      {
        label: "User Management",
        link: "/management/user-management",
        icon: userCreationSvg,
      },
      {
        label: "Add/Manage User",
        link: "/management/add-manage-user",
        icon: userCreationSvg,
      },
      {
        label: "Search User",
        link: "/management/search-user",
        icon: userCreationSvg,
      },
      {
        label: "Bulk Users",
        link: "/management/bulk-users",
        icon: userCreationSvg,
      },
      {
        label: "KYC Approved Summary",
        link: "/management/kyc-approved",
        icon: userCreationSvg,
      },
      {
        label: "Pending KYC",
        link: "/management/kyc-pending",
        icon: userCreationSvg,
      },
      {
        label: "View User",
        link: "/management/view-user",
        icon: userCreationSvg,
      },
      {
        label: "Block User",
        link: "/management/block-user",
        icon: userCreationSvg,
      },
      {
        label: "Settlement Bank",
        link: "/management/settlement-bank",
        icon: userCreationSvg,
      },
      {
        label: "User Mapping",
        link: "/management/user-mapping",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Live transaction Report",
        link: "/report/live-transaction",
        icon: userCreationSvg,
      },
      {
        label: "Transaction report",
        link: "/report/transaction",
        icon: userCreationSvg,
      },
      {
        label: "Unsettled Transaction report",
        link: "/report/unsettled-transaction",
        icon: userCreationSvg,
      },
      {
        label: "Ledger Report",
        link: "/report/ledger-transaction",
        icon: userCreationSvg,
      },
      {
        label: "Pending Transaction",
        link: "/report/pending-transaction",
        icon: userCreationSvg,
      },
      {
        label: "Update Transaction report",
        link: "/report/update-transaction",
        icon: userCreationSvg,
      },
      {
        label: "Search Transaction report",
        link: "/report/search-transaction",
        icon: userCreationSvg,
      },
      {
        label: "API Performance report",
        link: "/report/api-performance",
        icon: userCreationSvg,
      },
      {
        label: "Account summary report",
        link: "/report/account-summary",
        icon: userCreationSvg,
      },
      {
        label: "Create Order Report",
        link: "/report/create-order",
        icon: userCreationSvg,
      },
      {
        label: "Cumilative report",
        link: "/report/cumulative",
        icon: userCreationSvg,
      },
      {
        label: "Download Report",
        link: "/report/download",
        icon: userCreationSvg,
      },
      { label: "Email Report", link: "/report/email", icon: userCreationSvg },
      {
        label: "GST/TDS Report",
        link: "/report/gst-tds",
        icon: userCreationSvg,
      },
      { label: "Refund Report", link: "/report/refund", icon: userCreationSvg },
      {
        label: "Reconcillation report",
        link: "/report/reconciliation",
        icon: userCreationSvg,
      },
      { label: "SMS Report", link: "/report/sms", icon: userCreationSvg },
      {
        label: "Invoice report",
        link: "/report/invoice",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Notification",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Alert Type",
        link: "/notification/alert-type",
        icon: userCreationSvg,
      },
      {
        label: "SMS Template",
        link: "/notification/sms-template",
        icon: userCreationSvg,
      },
      {
        label: "Email Report",
        link: "/notification/email-report",
        icon: userCreationSvg,
      },
      {
        label: "Send SMS",
        link: "/notification/send-sms",
        icon: userCreationSvg,
      },
      {
        label: "Send Mail",
        link: "/notification/send-mail",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "My Account",
    icon: managementSvg,
    initiallyOpened: false,
    links: [
      { label: "Profile", link: "/account/profile", icon: userCreationSvg },
      {
        label: "Design Receipts",
        link: "/account/design-receipts",
        icon: userCreationSvg,
      },
      {
        label: "Design Documents",
        link: "/account/design-documents",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Support Centre",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Ticket Management",
        link: "/support/ticket-management",
        icon: userCreationSvg,
      },
      {
        label: "Contact Us",
        link: "/support/contact-us",
        icon: userCreationSvg,
      },
    ],
  },
  {
    label: "Website Settings",
    icon: schemesSvg,
    initiallyOpened: false,
    links: [
      { label: "Brandings", link: "/website/brandings", icon: userCreationSvg },
      {
        label: "Website Settings",
        link: "/website/settings",
        icon: userCreationSvg,
      },
      {
        label: "News Update",
        link: "/website/news-update",
        icon: userCreationSvg,
      },
    ],
  },
  { label: "Logs", icon: DashboardSvg, initiallyOpened: false, link: "/logs" },
];
