import {
  DashboardSvg,
  fundingSvg,
  LogsIcon,
  managementSvg,
  MastersIcon,
  MenuSettingIcon,
  MyProfileIcon,
  NotificationIcon,
  reportsSvg,
  schemesSvg,
  SupportIcon,
} from "../../assets/Icons/Svgs";

export const sidebarData = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false, link: "/" },
  {
    label: "Masters",
    icon: MastersIcon,
    initiallyOpened: false,
    links: [
      {
        label: "Product Master",
        link: "/master/product",
        icon: MastersIcon,
      },
      {
        label: "Sub-Product Master",
        link: "/master/sub-product",
        icon: MastersIcon,
      },
      {
        label: "Operator Master",
        link: "/master/operator",
        icon: MastersIcon,
      },
      {
        label: "Sub-Operator Master",
        link: "/master/sub-operator",
        icon: MastersIcon,
      },
      {
        label: "Vendor Master",
        link: "/master/vendor",
        icon: MastersIcon,
      },
      {
        label: "Vendor Credential Master",
        link: "/master/vendor-credential",
        icon: MastersIcon,
      },
      {
        label: "Vendor Routing Master",
        link: "/master/vendor-routing",
        icon: MastersIcon,
      },
      {
        label: "Bank Master",
        link: "/master/banks",
        icon: MastersIcon,
      },
      {
        label: "Network Bank Master",
        link: "/master/network-banks",
        icon: MastersIcon,
      },
      {
        label: "Main Master",
        link: "/master/main",
        icon: MastersIcon,
      },
      {
        label: "Sub Master",
        link: "/master/sub-master",
        icon: MastersIcon,
      },
      {
        label: "Location Master",
        icon: MastersIcon,
        links: [
          {
            label: "Country Master",
            link: "/master/country",
            icon: MastersIcon,
          },
          {
            label: "State Master",
            link: "/master/state",
            icon: MastersIcon,
          },
          {
            label: "District Master",
            link: "/master/district",
            icon: MastersIcon,
          },
          {
            label: "City Master",
            link: "/master/city",
            icon: MastersIcon,
          },
          {
            label: "Pincode Master",
            link: "/master/pincode",
            icon: MastersIcon,
          },
        ],
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
        icon: schemesSvg,
      },
      {
        label: "Schemes Hierarchy",
        link: "/schemes/hierarchy",
        icon: schemesSvg,
      },
      {
        label: "Schemes Allocation",
        link: "/schemes/allocation",
        icon: schemesSvg,
      },
      // {
      //   label: "Transaction Routing",
      //   link: "/schemes/transaction-routing",
      //   icon: schemesSvg,
      // },
      {
        label: "Transaction Limit Settings",
        link: "/schemes/transaction-limit",
        icon: schemesSvg,
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
        link: "/funding/authorization",
        icon: fundingSvg,
      },
      {
        label: "Credit/Debit",
        link: "/funding/credit-debit",
        icon: fundingSvg,
      },
      // {
      //   label: "Manage Payment",
      //   link: "/funding/manage-payment",
      //   icon: fundingSvg,
      // },
      // {
      //   label: "Manage Settlement",
      //   link: "/funding/manage-settlement",
      //   icon: fundingSvg,
      // },
      {
        label: "Settlement",
        link: "/funding/settlement",
        icon: fundingSvg,
      },
      {
        label: "Update Transaction",
        link: "/funding/update-transaction",
        icon: fundingSvg,
      },
      {
        label: "Low Balance",
        link: "/funding/low-balance",
        icon: fundingSvg,
      },
      {
        label: "Bulk Credit/Debit",
        link: "/funding/bulk-credit-debit",
        icon: fundingSvg,
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
        link: "/management/user/create",
        icon: managementSvg,
      },
      {
        label: "Pending User",
        link: "/management/user/pending",
        icon: managementSvg,
      },
      {
        label: "Onboarded Users",
        link: "/management/user/onboarded",
        icon: managementSvg,
      },
      {
        label: "Rejected User",
        link: "/management/user/rejected",
        icon: managementSvg,
      },
      // {
      //   label: "User Configuration",
      //   link: "/management/user-configuration",
      //   icon: managementSvg,
      // },
      {
        label: "Admin User",
        link: "/management/admin-user",
        icon: managementSvg,
      },
      // {
      //   label: "Search User",
      //   link: "/management/search-user",
      //   icon: managementSvg,
      // },
      {
        label: "KYC Approved Summary",
        link: "/management/kyc-approved",
        icon: managementSvg,
      },
      {
        label: "Pending KYC",
        link: "/management/kyc-pending",
        icon: managementSvg,
      },
      {
        label: "View User",
        link: "/management/view-user",
        icon: managementSvg,
      },
      {
        label: "Block/Unblock User",
        link: "/management/block-unblock-user",
        icon: managementSvg,
      },
      {
        label: "Settlement Bank",
        link: "/management/settlement-bank",
        icon: managementSvg,
      },
      {
        label: "User Mapping",
        link: "/management/user-mapping",
        icon: managementSvg,
      },
    ],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [
      // {
      //   label: "Live transaction Report",
      //   link: "/report/live-transaction",
      //   icon: reportsSvg,
      // },
      {
        label: "Transaction report",
        link: "/report/transaction",
        icon: reportsSvg,
      },
      {
        label: "Settlement report",
        link: "/report/settlement",
        icon: reportsSvg,
      },
      {
        label: "Unsettled Transaction report",
        link: "/report/unsettled-transaction",
        icon: reportsSvg,
      },
      {
        label: "Pending Transaction",
        link: "/report/pending-transaction",
        icon: reportsSvg,
      },
      // {
      //   label: "Update Transaction report",
      //   link: "/report/update-transaction",
      //   icon: reportsSvg,
      // },
      {
        label: "Search Transaction report",
        link: "/report/search-transaction",
        icon: reportsSvg,
      },
      {
        label: "GST/TDS Report",
        link: "/report/gst-tds",
        icon: reportsSvg,
      },
      {
        label: "Ledger Report",
        link: "/report/ledger-transaction",
        icon: reportsSvg,
      },
      // {
      //   label: "API Performance report",
      //   link: "/report/api-performance",
      //   icon: reportsSvg,
      // },
      // {
      //   label: "Account summary report",
      //   link: "/report/account-summary",
      //   icon: reportsSvg,
      // },
      // {
      //   label: "Create Order Report",
      //   link: "/report/create-order",
      //   icon: reportsSvg,
      // },
      // {
      //   label: "Cumilative report",
      //   link: "/report/cumulative",
      //   icon: reportsSvg,
      // },
      // {
      //   label: "Download Report",
      //   link: "/report/download",
      //   icon: reportsSvg,
      // },
      // { label: "Email Report", link: "/report/email", icon: reportsSvg },
      // { label: "Refund Report", link: "/report/refund", icon: reportsSvg },
      // {
      //   label: "Reconcillation report",
      //   link: "/report/reconciliation",
      //   icon: reportsSvg,
      // },
      // { label: "SMS Report", link: "/report/sms", icon: reportsSvg },
      // {
      //   label: "Invoice report",
      //   link: "/report/invoice",
      //   icon: reportsSvg,
      // },
    ],
  },
  {
    label: "Notification",
    icon: NotificationIcon,
    initiallyOpened: false,
    links: [
      {
        label: "Alert Type",
        link: "/notification/alert-type",
        icon: NotificationIcon,
      },
      {
        label: "SMS Template",
        link: "/notification/sms-template",
        icon: NotificationIcon,
      },
      // {
      //   label: "Email Report",
      //   link: "/notification/email-report",
      //   icon: NotificationIcon,
      // },
      {
        label: "Send SMS",
        link: "/notification/send-sms",
        icon: NotificationIcon,
      },
      {
        label: "Send Mail",
        link: "/notification/send-mail",
        icon: NotificationIcon,
      },
    ],
  },
  {
    label: "My Account",
    icon: MyProfileIcon,
    initiallyOpened: false,
    links: [
      { label: "Profile", link: "/account/profile", icon: MyProfileIcon },
      // {
      //   label: "Design Receipts",
      //   link: "/account/design-receipts",
      //   icon: MyProfileIcon,
      // },
      // {
      //   label: "Design Documents",
      //   link: "/account/design-documents",
      //   icon: MyProfileIcon,
      // },
    ],
  },
  {
    label: "Support Centre",
    icon: SupportIcon,
    initiallyOpened: false,
    links: [
      {
        label: "Ticket Management",
        link: "/support/ticket-management",
        icon: SupportIcon,
      },
      // {
      //   label: "Contact Us",
      //   link: "/support/contact-us",
      //   icon: SupportIcon,
      // },
    ],
  },
  // {
  //   label: "Website Settings",
  //   icon: MenuSettingIcon,
  //   initiallyOpened: false,
  //   links: [
  //     { label: "Brandings", link: "/website/brandings", icon: MenuSettingIcon },
  //     {
  //       label: "Website Settings",
  //       link: "/website/settings",
  //       icon: MenuSettingIcon,
  //     },
  //     {
  //       label: "News Update",
  //       link: "/website/news-update",
  //       icon: MenuSettingIcon,
  //     },
  //   ],
  // },
  { label: "Logs", icon: LogsIcon, initiallyOpened: false, link: "/logs" },
];
