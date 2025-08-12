import { Box, Image, ScrollArea } from "@mantine/core";
import React, { useMemo, useState } from "react";
import orgLogo from "../../assets/Images/orgLogo.png";
import LinksGroup from "../Organisms/LinksGroup";
import { filterSidebarByPermissions } from "../../Utils/filterSidebarByPermissions";

const Sidebar: React.FC = () => {
  const [openMap, setOpenMap] = useState<Record<string, { level: number }>>({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const role = userInfo?.role || "";
  const permissions = (userInfo?.permissions || "")
    .split(",")
    .map((p: string) => p.trim()) // ["0101", "0203", "0103"]
    .filter(Boolean);

  const filteredSidebar = useMemo(
    () => filterSidebarByPermissions(role, permissions),
    [role, permissions]
  );

  const links = filteredSidebar.map((item) =>
    item ? (
      <LinksGroup
        key={item.label}
        icon={item.icon}
        label={item.label}
        link={item.link}
        links={item.links}
        openMap={openMap}
        setOpenMap={setOpenMap}
      />
    ) : null
  );

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
