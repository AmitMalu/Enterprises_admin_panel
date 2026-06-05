import { useEffect, useState } from "react";
import { sidebarData } from "../../Config/Menus/MenuItems";

interface UseMenuListFromSidebarProps {
    selectedMenus?: string[];
}

interface MenuOption {
    label: string;
    value: string;
}

export const useMenuListFromSidebar = ({
    selectedMenus = [],
}: UseMenuListFromSidebarProps) => {
    const [menuList, setMenuList] = useState<MenuOption[]>([]);
    const [subMenuList, setSubMenuList] = useState<MenuOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        setLoading(true);
        try {
            // Assign menu IDs as 2-digit codes (01, 02, etc.)
            const filteredMenus = sidebarData.filter(
                (menu) => menu.label.toLowerCase() !== "dashboard"
            );

            // Assign menu IDs as 2-digit codes (01, 02, etc.)
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
    }, []);

    useEffect(() => {
        if (!selectedMenus.length) {
            setSubMenuList([]);
            return;
        }

        // Remove Dashboard here too, so index mapping matches menuList
        const filteredMenus = sidebarData.filter(
            (menu) => menu.label.toLowerCase() !== "dashboard"
        );

        const subMenus: MenuOption[] = [];

        selectedMenus.forEach((menuCode) => {
            const menuIndex = parseInt(menuCode, 10) - 1;
            const menu = filteredMenus[menuIndex];

            if (menu?.links?.length) {
                menu.links.forEach((submenu, subIndex) => {
                    const submenuCode = menuCode + String(subIndex + 1).padStart(2, "0");
                    subMenus.push({ label: submenu.label, value: submenuCode });
                });
            }
        });

        setSubMenuList(subMenus);
    }, [selectedMenus]);

    return {
        menuList,
        subMenuList,
        loadingMenus: loading,
        MenuError: error,
    };
};
