import { Box, Image, ScrollArea } from "@mantine/core";
import React from "react";
import orgLogo from "../../assets/Images/orgLogo.png";
import {
  DashboardSvg,
  fundingSvg,
  managementSvg,
  reportsSvg,
  schemesSvg,
} from "../../assets/Icons/Svgs";
import LinksGroup from "./LinksGroup";

const sidebardata = [
  { label: "Dashboard", icon: DashboardSvg, initiallyOpened: false },
  {
    label: "Funding",
    icon: fundingSvg,
    initiallyOpened: false,
    links: [
        { label: "Overview", link: "/" },
        { label: "Overview", link: "/" },
        { label: "Overview", link: "/" },
        { label: "Overview", link: "/" },
        { label: "Overview", link: "/" },
        { label: "Overview", link: "/" },
    ],
  },
  {
    label: "Management",
    icon: managementSvg,
    initiallyOpened: false,
    links: [{ label: "Upcoming releases", link: "/" }],
  },
  {
    label: "Schemes",
    icon: schemesSvg,
    initiallyOpened: false,
    Links: [{ label: "Upcoming releases", link: "/" }],
  },
  {
    label: "Reports",
    icon: reportsSvg,
    initiallyOpened: false,
    links: [{ label: "Upcoming releases", link: "/" }],
  },
];

const Navbar: React.FC = () => {
  const links = sidebardata.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      initiallyOpened={item.initiallyOpened}
    />
  ));

  return (
    <Box w="100%">
      <Box mb="sm">
        <Image src={orgLogo} alt="logo" w={180} mx="auto" />
      </Box>

      <ScrollArea className="flex-1 p-2 overflow-y-auto">
        <div className="flex flex-col gap-2">{links}</div>
      </ScrollArea>
    </Box>
  );
};

export default Navbar;
