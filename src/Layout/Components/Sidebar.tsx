import { Box, Image, ScrollArea } from "@mantine/core";
import React from "react";
import orgLogo from "../../assets/Images/orgLogo.png";
import {
  DashboardSvg,
  fundingSvg,
  managementSvg,
  reportsSvg,
  schemesSvg,
  userCreationSvg,
} from "../../assets/Icons/Svgs";
import LinksGroup from "./LinksGroup";

const sidebarData = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false, link : "/" },
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
    links: [{ label: "Upcoming releases", link: "/management/upcoming", icon: userCreationSvg }],
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

const Sidebar: React.FC = () => {

  const links = sidebarData.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      initiallyOpened={item.initiallyOpened}
      link={item?.link}
    />
  ));

  return (
    <Box w="100%">
      <Box mb="sm">
        <Image src={orgLogo} alt="logo" w={180} mx="auto" />
      </Box>

      <ScrollArea className="flex-1 p-2 overflow-y-auto">
        <div className="flex flex-col gap-1">{links}</div>
      </ScrollArea>
    </Box>
  );
};

export default Sidebar;
