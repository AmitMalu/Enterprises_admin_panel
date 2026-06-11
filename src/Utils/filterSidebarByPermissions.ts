// utils/filterSidebarByPermissions.ts

import { sidebarData } from "../Config/Menus/MenuItems";

export const filterSidebarByPermissions = (
  role: string,
  permissions: string[]
) => {
  return sidebarData
    .map((menu) => {
      const isDashboard = menu.label.toLowerCase() === "dashboard";

      // Always keep Dashboard
      if (isDashboard) return menu;

      // Exclude Masters menu for WLAD and WLAU roles
      if ((role === "WLAD" || role === "WLAU") && menu.label === "Masters") {
        return null;
      }

      // Adjust index so first menu after dashboard = "01"
      const nonDashboardIndex = sidebarData
        .filter((m) => m.label.toLowerCase() !== "dashboard")
        .indexOf(menu);
      const menuCode = String(nonDashboardIndex + 1).padStart(2, "0");

      // Non-AU and non-WLAU roles get everything
      if (role !== "AU" && role !== "WLAU") return menu;

      // AU/WLAU with no permissions → only Dashboard
      if (permissions.length === 0) return null;

      // No submenu → allow if permission starts with menuCode
      if (!menu.links) {
        const hasMenuAccess = permissions.some((perm) =>
          perm.startsWith(menuCode)
        );
        return hasMenuAccess ? menu : null;
      }

      // With submenu → filter allowed submenus
      const allowedLinks = menu.links.filter((_, subIndex) =>
        permissions.includes(menuCode + String(subIndex + 1).padStart(2, "0"))
      );

      return allowedLinks.length > 0 ? { ...menu, links: allowedLinks } : null;
    })
    .filter(Boolean);
};
