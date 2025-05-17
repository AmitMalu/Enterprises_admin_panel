import { DashboardSvg, fundingSvg, managementSvg, reportsSvg, schemesSvg, userCreationSvg } from "../../assets/Icons/Svgs";

export const sidebarData = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false, link: "/" },
  {
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
      { label: "Overview1", link: "/funding/overview1", icon: userCreationSvg },
      { label: "Overview2", link: "/funding/overview2", icon: userCreationSvg },
      { label: "Overview3", link: "/funding/overview3", icon: userCreationSvg },
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
