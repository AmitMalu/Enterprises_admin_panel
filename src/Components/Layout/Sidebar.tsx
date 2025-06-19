import { Box, Image, ScrollArea } from "@mantine/core";
import React from "react";
import orgLogo from "../../assets/Images/orgLogo.png";
import { sidebarData } from "../../Config/Menus/MenuItems";
import LinksGroup from "../Organisms/LinksGroup";

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
    <Box w="100%" className="h-[98vh] flex flex-col">
      <Box mb="sm">
        <Image src={orgLogo} alt="logo" w={180} mx="auto" />
      </Box>

      <div className="flex-1 overflow-hidden">
        <ScrollArea h="100%" scrollbarSize={0}>
          <div className="flex flex-col gap-1">{links}</div>
        </ScrollArea>
      </div>
    </Box>
  );
};

export default Sidebar;
