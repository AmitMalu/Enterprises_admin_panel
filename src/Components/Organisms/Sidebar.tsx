import { Box, Image, ScrollArea } from "@mantine/core";
import React from "react";
import orgLogo from "../../assets/Images/orgLogo.png";
import { sidebarData } from "../../Config/Menus/MenuItems";
import LinksGroup from "./LinksGroup";

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
