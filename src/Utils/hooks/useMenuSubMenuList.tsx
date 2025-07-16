import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface UseMenuSubMenuListProps {
    selectedMenus?: string[];
}

interface MenuItem {
    id: string;
    name: string;
    submenus: {
        id: string;
        name: string;
        combineId: string;
    }[];
}

export const useMenuSubMenuList = ({
    selectedMenus = [],
}: UseMenuSubMenuListProps) => {
    const dispatch = useAppDispatch();

    const [rawMenus, setRawMenus] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        const fetchMenuSubMenuList = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS.MANAGEMENT.MENU}/dropdown`,
                    })
                ).unwrap();

                setRawMenus(result || []);
            } catch (err: any) {
                console.error("Failed to fetch Menu list", err);
                toast.error("Failed to fetch Menu/Submenu list");
                setError(err);
                setRawMenus([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuSubMenuList();
    }, [dispatch]);

    // Menu List for dropdown: [{ label: "Funding", value: "01" }]
    const menuList = useMemo(
        () =>
            rawMenus.map((menu) => ({
                label: menu.name,
                value: menu.id,
            })),
        [rawMenus]
    );

    const subMenuList = useMemo(() => {
        return rawMenus
            .filter((menu) => selectedMenus?.includes(menu.id))
            .flatMap((menu) =>
                menu.submenus.map((submenu) => ({
                    label: submenu.name,
                    value: submenu.combineId,
                }))
            );

    }, [rawMenus, selectedMenus]);

    console.log(subMenuList);


    return {
        menuList,
        subMenuList,
        loadingMenus : loading,
        error,
    };
};
