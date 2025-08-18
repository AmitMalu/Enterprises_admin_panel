import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

interface UseHierarchySubHierarchyProps {
    selectedHierarchyCode?: string | null;
    onSubHierarchyReset?: () => void;
}

export const useHierarchySubHierarchy = ({
    selectedHierarchyCode,
    onSubHierarchyReset,
}: UseHierarchySubHierarchyProps) => {
    const dispatch = useAppDispatch();
    const [hierarchyList, setHierarchyList] = useState([]);
    const [loadingHierarchyList, setLoadingHierarchyList] = useState(false);
    const [hierarchyError, setHierarchyError] = useState<string | null>(null);

    const [subHierarchyList, setSubHierarchyList] = useState([]);
    const [loadingSubHierarchyList, setLoadingSubHierarchyList] = useState(false);
    const [subHierarchyError, setSubHierarchyError] = useState<string | null>(null);
    const [subHierarchyKey, setSubHierarchyKey] = useState(Date.now());

    // Fetch Heirarchy list (always)
    useEffect(() => {
        const fetchHierarchyList = async () => {
            setLoadingHierarchyList(true);
            setHierarchyError(null)
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.COMMON.HIERARCHY}/name-code`,
                    })
                ).unwrap();

                const filteredData = (result || [])?.map((item: any) => ({
                    label: item.name,
                    value: String(item.code),     // dropdown binds to operatorId
                }));

                setHierarchyList(filteredData);
            } catch (err: any) {
                console.error("Failed to fetch Hierarchy list", err);
                toast.error(err);
                setHierarchyError(err)
                setHierarchyList([]);
            } finally {
                setLoadingHierarchyList(false);
            }
        };

        fetchHierarchyList();
    }, [dispatch]);

    // Fetch Sub Hierarchy list (only if HierarchyCode is given)
    useEffect(() => {
        if (!selectedHierarchyCode) return;

        // ✅ Reset sub-hierarchy state immediately on parent change
        if (onSubHierarchyReset) onSubHierarchyReset();

        const fetchSubHierarchyList = async () => {
            setLoadingSubHierarchyList(true);
            setSubHierarchyError(null)
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.COMMON.HIERARCHY}/hierarchy-details/${selectedHierarchyCode}`,
                    })
                ).unwrap();

                setSubHierarchyList(result);
                setSubHierarchyKey(Date.now());
            } catch (err: any) {
                console.error("Failed to fetch sub-Hierarchy list", err);
                toast.error(err);
                setSubHierarchyError(err)
                setSubHierarchyList([]);
                if (onSubHierarchyReset) onSubHierarchyReset?.();
            } finally {
                setLoadingSubHierarchyList(false);
            }
        };

        fetchSubHierarchyList();
    }, [selectedHierarchyCode, dispatch]);

    return {
        hierarchyList,
        loadingHierarchyList,
        subHierarchyList,
        loadingSubHierarchyList,
        hierarchySubHierarchyError: hierarchyError || subHierarchyError,
        subHierarchyKey,
    };
};
