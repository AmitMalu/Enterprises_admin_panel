import { useEffect, useState } from "react";
import { sidebarData } from "../../Config/Menus/MenuItems";
import { WL_EXCLUDED_MENUS, WL_EXCLUDED_SUBMENUS } from "../filterSidebarByPermissions";

interface UseMenuListFromSidebarProps {
    selectedMenus?: string[];
    currentUserRole?: string;
}

interface MenuOption {
    label: string;
    value: string;
}

export const useMenuListFromSidebar = ({
    selectedMenus = [],
    currentUserRole = "",
}: UseMenuListFromSidebarProps) => {
    const [menuList, setMenuList] = useState<MenuOption[]>([]);
    const [subMenuList, setSubMenuList] = useState<MenuOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const isWL = currentUserRole === "WLAD" || currentUserRole === "WLAU";

    useEffect(() => {
        setLoading(true);
        try {
            // Start with all non-dashboard menus
            let filteredMenus = sidebarData.filter(
                (menu) => menu.label.toLowerCase() !== "dashboard"
            );

            // For WL roles, exclude certain top-level menus
            if (isWL) {
                filteredMenus = filteredMenus.filter(
                    (menu) => !WL_EXCLUDED_MENUS.includes(menu.label)
                );
            }

            // Build menu list with codes (01, 02, etc.)
            const menus: MenuOption[] = filteredMenus.map((menu, menuIndex) => ({
                label: menu.label,
                value: String(menuIndex + 1).padStart(2, "0"),
            }));

            setMenuList(menus);
            setError(null);
        } catch (err) {
            console.error("Failed to load menus from sidebarData", err);
            setError(err);
            setMenuList([]);
            setSubMenuList([]);
        } finally {
            setLoading(false);
        }
    }, [currentUserRole, isWL]);

    useEffect(() => {
        if (!selectedMenus.length) {
            setSubMenuList([]);
            return;
        }

        // Build the same filtered menu list as above
        let filteredMenus = sidebarData.filter(
            (menu) => menu.label.toLowerCase() !== "dashboard"
        );

        if (isWL) {
            filteredMenus = filteredMenus.filter(
                (menu) => !WL_EXCLUDED_MENUS.includes(menu.label)
            );
        }

        const subMenus: MenuOption[] = [];

        selectedMenus.forEach((menuCode) => {
            const menuIndex = parseInt(menuCode, 10) - 1;
            const menu = filteredMenus[menuIndex];

            if (menu?.links?.length) {
                // Get WL-excluded submenu labels for this parent menu
                const excludedSubmenus = isWL ? (WL_EXCLUDED_SUBMENUS[menu.label] ?? []) : [];

                menu.links.forEach((submenu, subIndex) => {
                    // Skip submenus that are excluded for WL roles
                    if (excludedSubmenus.includes(submenu.label)) return;

                    const submenuCode = menuCode + String(subIndex + 1).padStart(2, "0");
                    subMenus.push({ label: submenu.label, value: submenuCode });
                });
            }
        });

        setSubMenuList(subMenus);
    }, [selectedMenus, currentUserRole, isWL]);

    return {
        menuList,
        subMenuList,
        loadingMenus: loading,
        MenuError: error,
    };
};
