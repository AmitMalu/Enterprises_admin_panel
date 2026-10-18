import { Box, Image, ScrollArea, Tooltip } from "@mantine/core";
import React, { useMemo, useState } from "react";
import LinksGroup from "../Organisms/LinksGroup";
import { filterSidebarByPermissions } from "../../Utils/filterSidebarByPermissions";
import { BUILD_INFO } from "../../buildInfo";
import BrandLogo from "../Brand/BrandLogo";

const Sidebar: React.FC = () => {
  const [openMap, setOpenMap] = useState<Record<string, { level: number }>>({});
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // Extract role: if not in userInfo, parse from hierarchyId (e.g., "ENT-AD-001" → "AD")
  const role = userInfo?.role || userInfo?.hierarchyId?.split("-")[1] || "";
  const logoPath = userInfo?.logoPath || "";
  const isWhiteLabel = role === "WLAD" || role === "WLAU" || role === "WL";
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
      <Tooltip label={`${BUILD_INFO.version} (${BUILD_INFO.builtAt})`} position="bottom" openDelay={1000}>
        <Box className="flex items-center px-2 pt-3 pb-5 mb-2 border-b border-[var(--color-sidebar-border)]">
          {isWhiteLabel && logoPath ? (
            <div className="w-full h-14 rounded-xl bg-white flex items-center justify-center p-2">
              <Image src={logoPath} alt="logo" maw="100%" mah="100%" fit="contain" />
            </div>
          ) : (
            <BrandLogo tone="light" subtitle="Admin Console" />
          )}
        </Box>
      </Tooltip>

      <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-sidebar-text-muted)]">
        Menu
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea h="100%" scrollbarSize={0}>
          <div className="flex flex-col gap-0.5">{links}</div>
        </ScrollArea>
      </div>
    </Box>
  );
};

export default Sidebar;
