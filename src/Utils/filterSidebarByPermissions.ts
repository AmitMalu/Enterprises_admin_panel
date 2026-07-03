// utils/filterSidebarByPermissions.ts

import { sidebarData } from "../Config/Menus/MenuItems";

// ─── WL Exclusion Config ─────────────────────────────────────────────────────
// Menus never shown to WL-hierarchy roles (WLAD / WLAU).
export const WL_EXCLUDED_MENUS = ["Masters", "Logs", "Notification"];

// Submenus never shown to WL-hierarchy roles, keyed by parent menu label.
// Add new entries here whenever a submenu needs to be hidden for all WL roles.
export const WL_EXCLUDED_SUBMENUS: Record<string, string[]> = {
  Reports: ["Download Report"],
};
// ─────────────────────────────────────────────────────────────────────────────

export const filterSidebarByPermissions = (
  role: string,
  permissions: string[]
) => {
  const isWL = role === "WLAD" || role === "WLAU";
  const isPermissionBased = role === "AU" || role === "WLAU"; // only these roles use permissions

  // Strip WL-excluded submenus from each menu's links for WL roles.
  const getVisibleLinks = (menuLabel: string, links: typeof sidebarData[number]["links"]) => {
    if (!links) return links;
    if (!isWL) return links;
    const excluded = WL_EXCLUDED_SUBMENUS[menuLabel] ?? [];
    return excluded.length ? links.filter((l) => !excluded.includes(l.label)) : links;
  };

  // The list of menus actually visible to this role (excluding dashboard).
  // This must match exactly what the permission-assignment UI shows,
  // so that permission codes (e.g. "01", "04") resolve to the right menus.
  const visibleMenus = sidebarData
    .filter((m) => {
      if (m.label.toLowerCase() === "dashboard") return false;
      if (isWL && WL_EXCLUDED_MENUS.includes(m.label)) return false;
      return true;
    })
    .map((m) => ({
      ...m,
      links: getVisibleLinks(m.label, m.links),
    }));

  return sidebarData
    .map((menu) => {
      // Always show Dashboard
      if (menu.label.toLowerCase() === "dashboard") return menu;

      // WL roles never see these menus
      if (isWL && WL_EXCLUDED_MENUS.includes(menu.label)) return null;

      // Strip WL-excluded submenus for this menu
      const visibleLinks = getVisibleLinks(menu.label, menu.links);
      const menuWithFilteredLinks = visibleLinks !== menu.links
        ? { ...menu, links: visibleLinks }
        : menu;

      // WLAD and AD see all remaining menus/submenus without permission filtering
      if (!isPermissionBased) return menuWithFilteredLinks;

      // --- AU / WLAU: permission-based filtering below ---

      // No permissions assigned → only Dashboard
      if (permissions.length === 0) return null;

      // menuCode is the 1-based index within the role's visible menu list,
      // matching the code used when permissions were assigned.
      const menuIndex = visibleMenus.findIndex((m) => m.label === menu.label);
      const menuCode = String(menuIndex + 1).padStart(2, "0");

      // Menu with no sublinks → allow if any permission starts with this menuCode
      if (!visibleLinks) {
        return permissions.some((p) => p.startsWith(menuCode)) ? menuWithFilteredLinks : null;
      }

      // Menu with sublinks → keep only permitted submenus
      const allowedLinks = visibleLinks.filter((_, subIndex) =>
        permissions.includes(menuCode + String(subIndex + 1).padStart(2, "0"))
      );

      return allowedLinks.length > 0 ? { ...menu, links: allowedLinks } : null;
    })
    .filter(Boolean);
};
