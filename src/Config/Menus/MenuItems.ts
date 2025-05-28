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
        link: "/master/product-master",
        icon: userCreationSvg,
      },
      {
        label: "Sub-Product Master",
        link: "/master/sub-product-master",
        icon: userCreationSvg,
      },
      {
        label: "Operator Master",
        link: "/master/operator-master",
        icon: userCreationSvg,
      },
      {
        label: "Vendor Master",
        link: "/master/vendor-master",
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
    Links: [{ label: "Scheme 1", link: "/schemes/sh1", icon: userCreationSvg }],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [{ label: "CRM", link: "/report/crm", icon: userCreationSvg }],
  },
];
