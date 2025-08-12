// utils/getAllowedBaseLinks.ts
import { filterSidebarByPermissions } from "./filterSidebarByPermissions";

export const getAllowedBaseLinks = (role: string, permissions: string[]) => {
  // Reuse your existing filter function so we only deal with filtered menus
  const filteredMenus = filterSidebarByPermissions(role, permissions);

  const allowedLinks: string[] = [];

  const collectLinks = (menuItems: any[]) => {
    menuItems.forEach((menu) => {
      if (menu.link && menu.link !== "/") {
        allowedLinks.push(menu.link);
      }
      if (menu.links) {
        collectLinks(menu.links);
      }
    });
  };

  collectLinks(filteredMenus);
  return Array.from(new Set(allowedLinks));
};
