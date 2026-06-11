import { useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/hooks";
import { toast } from "react-toastify";
import { fetchMasterDropdown } from "../../Redux/Features/Masters/MastersThunk";
import { API_ENDPOINTS } from "../../Config/Api/EndPoints";

export const useHeirarchyCombinationList = () => {
    const dispatch = useAppDispatch();
    const [hierarchyList, setHierarchyList] = useState([]);
    const [loadingHierarchyList, setLoadingHierarchyList] = useState(false);
    const [hierarchyListError, setHierarchyListError] = useState(null)

    // Fetch Vendor list (always)
    useEffect(() => {
        const fetchHierarchyList = async () => {
            setLoadingHierarchyList(true);
            setHierarchyListError(null)
            try {
                const result = await dispatch(
                    fetchMasterDropdown({
                        url: `${API_ENDPOINTS?.SCHEMES.SCHEME_LIST}/hierarchy-list`,
                    })
                ).unwrap();

                const filteredData = (result || [])?.map((item: any) => ({
                    label: item.combinationHash,
                    value: String(item.id),     // dropdown binds to operatorId
                }));

                setHierarchyList(filteredData);
            } catch (err: any) {
                console.error("Failed to fetch HierarchyList", err);
                toast.error(err);
                setHierarchyListError(err)
                setHierarchyList([]);
            } finally {
                setLoadingHierarchyList(false);
            }
        };

        fetchHierarchyList();
    }, [dispatch]);

    return {
        hierarchyList,
        loadingHierarchyList,
        hierarchyListError
    };
};
