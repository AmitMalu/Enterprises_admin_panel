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
        link: "/master/bank",
        icon: userCreationSvg,
      },
      {
        label: "Dropdown Master",
        link: "/master/dropdown",
        icon: userCreationSvg,
      },
      {
        label: "Country Master",
        link: "/master/country",
        icon: userCreationSvg,
      },
      {
        label: "User Configuration",
        link: "/master/user-configuration",
        icon: userCreationSvg,
      },
      {
        label: "System Configuration",
        link: "/master/system-configuration",
        icon: userCreationSvg,
      },
      {
        label: "Wallet Master",
        link: "/master/wallet",
        icon: userCreationSvg,
      },
      {
        label: "Tax Master",
        link: "/master/tax",
        icon: userCreationSvg,
      },
      {
        label: "API Master",
        link: "/master/api",
        icon: userCreationSvg,
      },
      {
        label: "Service Configuration",
        link: "/master/service",
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
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      {
        label: "Prefunding Authorization",
        link: "/funding/pre-funding-authorization",
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
];
